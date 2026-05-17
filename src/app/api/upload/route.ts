/**
 * Image Upload API
 *
 * 接收 multipart/form-data 上传的图片文件，保存到：
 *   - 本地环境：public/images/<subdir>/<filename>
 *   - GitHub 模式：通过 GitHub Contents API 提交到仓库 public/images/<subdir>/
 *
 * 返回：{ success: true, path: '/images/<subdir>/<filename>' }
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const GITHUB_API = 'https://api.github.com';

function checkAuth(request: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const auth = request.headers.get('Authorization');
  return auth === `Bearer ${secret}`;
}

function getGithubConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  if (!token || !repo) return null;
  const [owner, name] = repo.split('/');
  if (!owner || !name) return null;
  return { token, owner, name, branch };
}

async function githubRequest(apiPath: string, init: RequestInit & { token: string }) {
  const { token, ...rest } = init;
  const res = await fetch(`${GITHUB_API}${apiPath}`, {
    ...rest,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(rest.headers || {}),
    },
    cache: 'no-store',
  });
  return res;
}

/** 生成唯一文件名：时间戳 + 原始文件名的安全版本 */
function generateFilename(originalName: string): string {
  const ext = path.extname(originalName).toLowerCase();
  const safeExt = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext) ? ext : '.png';
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 6);
  return `${timestamp}_${random}${safeExt}`;
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const subdir = (formData.get('subdir') as string) || 'misc';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 限制文件大小 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF, SVG' }, { status: 400 });
    }

    const filename = generateFilename(file.name);
    const relativePath = `/images/${subdir}/${filename}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ghConfig = getGithubConfig();

    if (ghConfig) {
      // ─── GitHub 模式：通过 Contents API 提交图片 ───
      const githubPath = `public${relativePath}`;
      const content = buffer.toString('base64');

      // 检查文件是否已存在（获取 sha）
      const getUrl = `/repos/${ghConfig.owner}/${ghConfig.name}/contents/${githubPath}?ref=${encodeURIComponent(ghConfig.branch)}`;
      const getRes = await githubRequest(getUrl, { method: 'GET', token: ghConfig.token });
      let sha: string | undefined;
      if (getRes.ok) {
        const json = await getRes.json();
        sha = json.sha;
      }

      // 提交文件
      const putUrl = `/repos/${ghConfig.owner}/${ghConfig.name}/contents/${githubPath}`;
      const putRes = await githubRequest(putUrl, {
        method: 'PUT',
        token: ghConfig.token,
        body: JSON.stringify({
          message: `chore(admin): upload image ${relativePath}`,
          content,
          branch: ghConfig.branch,
          ...(sha ? { sha } : {}),
        }),
      });

      if (!putRes.ok) {
        const errText = await putRes.text();
        throw new Error(`GitHub upload failed (${putRes.status}): ${errText}`);
      }
    } else {
      // ─── 本地模式：直接写入 public/images/<subdir>/ ───
      const publicDir = path.join(process.cwd(), 'public', 'images', subdir);
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      const filePath = path.join(publicDir, filename);
      fs.writeFileSync(filePath, buffer);
    }

    return NextResponse.json({
      success: true,
      path: relativePath,
      mode: ghConfig ? 'github' : 'fs',
    });
  } catch (err: any) {
    console.error('Upload API error:', err);
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 });
  }
}
