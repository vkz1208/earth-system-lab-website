/**
 * Admin CRUD API
 *
 * 数据写入交由 store 抽象层统一处理：
 *   - 本地环境：直接读写 src/data/*.json
 *   - 生产环境（配 GITHUB_TOKEN）：提交到 GitHub 仓库，触发 Vercel 重建
 *
 * POST body:
 *   { collection: string, action: "add"|"edit"|"delete", data?: any, index?: number }
 */
import { NextRequest, NextResponse } from 'next/server';
import { getStore } from './_store';

/** 验证请求是否携带正确密码 */
function checkAuth(request: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false; // 未配置密码时拒绝所有请求
  const auth = request.headers.get('Authorization');
  return auth === `Bearer ${secret}`;
}

const FILE_MAP: Record<string, string> = {
  'team.members': 'team.json',
  'team.pi': 'team.json',
  'team.pi.scholarStats': 'team.json',
  'team.alumni': 'team.json',
  'team.alumni.members': 'team.json',
  'team.alumni.masterStudents': 'team.json',
  'team.alumni.bachelorStudents': 'team.json',
  'papers': 'papers.json',
  'news': 'news.json',
  'research.directions': 'research.json',
  'research.projects': 'research.json',
  'research.courses': 'research.json',
  'research.datasets': 'research.json',
  'site.hero': 'site.json',
  'site.philosophy': 'site.json',
};

function readJson(file: string): Promise<any> {
  return getStore().read(file);
}

function writeJson(file: string, data: any, message: string): Promise<void> {
  return getStore().write(file, data, message);
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { collection, action, data, index } = await request.json();

    if (!collection || !action) {
      return NextResponse.json({ error: 'Missing collection or action' }, { status: 400 });
    }

    const fileName = FILE_MAP[collection];
    if (!fileName) {
      return NextResponse.json({ error: `Unknown collection: ${collection}` }, { status: 400 });
    }

    const fullData = await readJson(fileName);
    const commitMsg = `chore(admin): ${action} ${collection}`;
    const store = getStore();

    // PI is a single object, not a list
    if (collection === 'team.pi') {
      if (action === 'edit') {
        fullData.pi = { ...fullData.pi, ...data };
        await writeJson(fileName, fullData, commitMsg);
        return NextResponse.json({ success: true, data: fullData.pi, mode: store.mode });
      }
      return NextResponse.json({ error: 'PI only supports edit' }, { status: 400 });
    }

    // PI Scholar Stats is a nested single object
    if (collection === 'team.pi.scholarStats') {
      if (action === 'edit') {
        fullData.pi.scholarStats = { ...fullData.pi.scholarStats, ...data };
        await writeJson(fileName, fullData, commitMsg);
        return NextResponse.json({ success: true, data: fullData.pi.scholarStats, mode: store.mode });
      }
      return NextResponse.json({ error: 'scholarStats only supports edit' }, { status: 400 });
    }

    // Alumni is an object with sub-lists
    if (collection === 'team.alumni') {
      if (action === 'edit') {
        fullData.alumni = { ...fullData.alumni, ...data };
        await writeJson(fileName, fullData, commitMsg);
        return NextResponse.json({ success: true, data: fullData.alumni, mode: store.mode });
      }
      return NextResponse.json({ error: 'Alumni only supports edit' }, { status: 400 });
    }

    // Site single-object edits (hero, philosophy)
    if (collection === 'site.hero' || collection === 'site.philosophy') {
      if (action === 'edit') {
        const key = collection.split('.')[1]; // "hero" or "philosophy"
        fullData[key] = { ...fullData[key], ...data };
        await writeJson(fileName, fullData, commitMsg);
        return NextResponse.json({ success: true, data: fullData[key], mode: store.mode });
      }
      return NextResponse.json({ error: `${collection} only supports edit` }, { status: 400 });
    }

    // All other collections are arrays
    // Handle nested paths like "team.alumni.members" -> fullData.alumni.members
    const keys = collection.split('.');
    let list: any[];
    if (keys.length === 3 && keys[0] === 'team' && keys[1] === 'alumni') {
      // e.g. team.alumni.members -> fullData.alumni.members
      list = fullData.alumni[keys[2]];
    } else if (keys.length === 2 && keys[0] === 'site') {
      // e.g. site.stats -> fullData.stats
      list = fullData[keys[1]];
    } else if (keys.length === 2 && keys[0] === 'team') {
      // e.g. team.members -> fullData.members
      list = fullData[keys[1]];
    } else if (keys.length === 2) {
      // e.g. research.directions -> fullData.directions
      list = fullData[keys[1]];
    } else {
      list = fullData[keys[keys.length - 1]];
    }

    if (!Array.isArray(list)) {
      return NextResponse.json({ error: `Collection ${collection} is not a list` }, { status: 400 });
    }

    switch (action) {
      case 'add': {
        // Auto-increment id if needed
        if (data.id === undefined || data.id === null) {
          const maxId = list.reduce((max: number, item: any) => Math.max(max, item.id || 0), 0);
          data.id = maxId + 1;
        }
        list.push(data);
        await writeJson(fileName, fullData, commitMsg);
        return NextResponse.json({ success: true, data, mode: store.mode });
      }
      case 'edit': {
        const idx = index ?? list.findIndex((item: any) => item.id === data?.id);
        if (idx < 0 || idx >= list.length) {
          return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }
        list[idx] = { ...list[idx], ...data };
        await writeJson(fileName, fullData, commitMsg);
        return NextResponse.json({ success: true, data: list[idx], mode: store.mode });
      }
      case 'delete': {
        const delIdx = index ?? list.findIndex((item: any) => item.id === data?.id);
        if (delIdx < 0 || delIdx >= list.length) {
          return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }
        list.splice(delIdx, 1);
        await writeJson(fileName, fullData, commitMsg);
        return NextResponse.json({ success: true, mode: store.mode });
      }
      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (err: any) {
    console.error('Admin API error:', err);
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}

// GET: return all data for a collection
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const collection = request.nextUrl.searchParams.get('collection');
    if (!collection) {
      // Return all data
      const [team, papers, news, research] = await Promise.all([
        readJson('team.json'),
        readJson('papers.json'),
        readJson('news.json'),
        readJson('research.json'),
      ]);
      return NextResponse.json({ team, papers, news, research });
    }

    const fileName = FILE_MAP[collection];
    if (!fileName) {
      return NextResponse.json({ error: `Unknown collection: ${collection}` }, { status: 400 });
    }

    const fullData = await readJson(fileName);
    const value = fullData[collection.includes('.') ? collection.split('.').pop()! : collection];
    return NextResponse.json({ data: value });
  } catch (err: any) {
    console.error('Admin API error:', err);
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}
