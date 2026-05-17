/**
 * 数据存储抽象层
 *
 * 根据是否配置 GITHUB_TOKEN 自动切换：
 *   - 有 token   → githubStore：通过 GitHub Contents API 提交，触发 Vercel 重建
 *   - 无 token   → fsStore：直接读写本地 src/data/*.json（仅适合本地开发）
 *
 * 环境变量（线上模式）：
 *   GITHUB_TOKEN       GitHub Personal Access Token（需要 repo 写权限）
 *   GITHUB_REPO        格式 "owner/repo"，例如 "zengzz/lab-website"
 *   GITHUB_BRANCH      目标分支，默认 "main"
 *   GITHUB_DATA_DIR    仓库中 JSON 数据相对路径，默认 "src/data"
 *   DEPLOY_HOOK_URL    Vercel Deploy Hook URL（可选，Git-connected 项目适用）
 *   VERCEL_TOKEN       Vercel API Token（可选，非 Git-connected 项目适用）
 *   VERCEL_PROJECT_ID  Vercel 项目 ID（配合 VERCEL_TOKEN 使用）
 *   VERCEL_TEAM_ID     Vercel 团队 ID（配合 VERCEL_TOKEN 使用）
 *   VERCEL_REPO_ID     GitHub 仓库数字 ID（配合 VERCEL_TOKEN 使用）
 */
import fs from 'fs';
import path from 'path';

export interface DataStore {
  read(file: string): Promise<any>;
  write(file: string, data: any, message: string): Promise<void>;
  /** 标识当前是否走远端存储（用于响应中提示用户"已提交，等待重建"） */
  readonly mode: 'fs' | 'github';
}

// ─── 本地文件系统实现 ──────────────────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), 'src/data');

const fsStore: DataStore = {
  mode: 'fs',
  async read(file) {
    const raw = await fs.promises.readFile(path.join(DATA_DIR, file), 'utf-8');
    return JSON.parse(raw);
  },
  async write(file, data) {
    await fs.promises.writeFile(
      path.join(DATA_DIR, file),
      JSON.stringify(data, null, 2) + '\n',
      'utf-8',
    );
  },
};

// ─── GitHub Contents API 实现 ─────────────────────────────────────────
const GITHUB_API = 'https://api.github.com';

function getGithubConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // "owner/repo"
  const branch = process.env.GITHUB_BRANCH || 'main';
  const dataDir = process.env.GITHUB_DATA_DIR || 'src/data';
  if (!token || !repo) return null;
  const [owner, name] = repo.split('/');
  if (!owner || !name) return null;
  return { token, owner, name, branch, dataDir };
}

async function githubRequest(path: string, init: RequestInit & { token: string }) {
  const { token, ...rest } = init;
  const res = await fetch(`${GITHUB_API}${path}`, {
    ...rest,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(rest.headers || {}),
    },
    // Next.js fetch 默认有缓存，写入操作必须禁用
    cache: 'no-store',
  });
  return res;
}

const githubStore: DataStore = {
  mode: 'github',
  async read(file) {
    const cfg = getGithubConfig();
    if (!cfg) throw new Error('GitHub store: missing GITHUB_TOKEN or GITHUB_REPO');
    const url = `/repos/${cfg.owner}/${cfg.name}/contents/${cfg.dataDir}/${file}?ref=${encodeURIComponent(cfg.branch)}`;
    const res = await githubRequest(url, { method: 'GET', token: cfg.token });
    if (!res.ok) {
      throw new Error(`GitHub read failed (${res.status}): ${await res.text()}`);
    }
    const json = await res.json();
    // content 为 base64 编码
    const raw = Buffer.from(json.content, 'base64').toString('utf-8');
    return JSON.parse(raw);
  },
  async write(file, data, message) {
    const cfg = getGithubConfig();
    if (!cfg) throw new Error('GitHub store: missing GITHUB_TOKEN or GITHUB_REPO');

    // 1. 先 GET 拿当前文件 sha（更新已存在文件必需）
    const getUrl = `/repos/${cfg.owner}/${cfg.name}/contents/${cfg.dataDir}/${file}?ref=${encodeURIComponent(cfg.branch)}`;
    const getRes = await githubRequest(getUrl, { method: 'GET', token: cfg.token });
    let sha: string | undefined;
    if (getRes.ok) {
      const json = await getRes.json();
      sha = json.sha;
    } else if (getRes.status !== 404) {
      throw new Error(`GitHub read-before-write failed (${getRes.status}): ${await getRes.text()}`);
    }

    // 2. PUT 新内容
    const putUrl = `/repos/${cfg.owner}/${cfg.name}/contents/${cfg.dataDir}/${file}`;
    const content = Buffer.from(JSON.stringify(data, null, 2) + '\n', 'utf-8').toString('base64');
    const putRes = await githubRequest(putUrl, {
      method: 'PUT',
      token: cfg.token,
      body: JSON.stringify({
        message,
        content,
        branch: cfg.branch,
        ...(sha ? { sha } : {}),
      }),
    });
    if (!putRes.ok) {
      throw new Error(`GitHub write failed (${putRes.status}): ${await putRes.text()}`);
    }

    // 3. 触发 Vercel 重建
    await triggerRedeploy();
  },
};

// ─── 触发 Vercel 重建 ──────────────────────────────────────────────────
async function triggerRedeploy() {
  // 方案 A：Deploy Hook（Git-connected 项目）
  const deployHook = process.env.DEPLOY_HOOK_URL;
  if (deployHook) {
    try {
      await fetch(deployHook, { method: 'POST', cache: 'no-store' });
    } catch {
      // deploy hook 失败不影响数据保存结果
    }
    return;
  }

  // 方案 B：Vercel API 触发部署（非 Git-connected 项目）
  const vercelToken = process.env.VERCEL_TOKEN;
  const vercelProjectId = process.env.VERCEL_PROJECT_ID;
  if (!vercelToken || !vercelProjectId) return;

  const teamId = process.env.VERCEL_TEAM_ID;
  const repoId = process.env.VERCEL_REPO_ID;
  const qs = teamId ? `?teamId=${teamId}` : '';

  try {
    await fetch(`https://api.vercel.com/v13/deployments${qs}`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${vercelToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'earth-system-lab-website',
        target: 'production',
        ...(repoId ? {
          gitSource: {
            type: 'github',
            ref: 'main',
            repoId: parseInt(repoId, 10),
          },
        } : {}),
      }),
    });
  } catch {
    // 重建触发失败不影响数据保存结果
  }
}

// ─── 自动选择 ────────────────────────────────────────────────────────
export function getStore(): DataStore {
  return getGithubConfig() ? githubStore : fsStore;
}
