'use client';

import { useState, useCallback, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import PageHero from '@/components/PageHero';
import AdminModal, { FieldDef } from '@/components/AdminModal';
import { team as teamData, papers as papersData, news as newsData, research as researchData, site as siteData } from '@/data';
import type { TeamData, PapersData, NewsData, ResearchData, SiteData } from '@/types';
import TeamTab from './_components/TeamTab';
import PapersTab from './_components/PapersTab';
import NewsTab from './_components/NewsTab';
import ResearchTab from './_components/ResearchTab';
import SiteTab from './_components/SiteTab';

// ─── Types ───────────────────────────────────────────────────────────
type TabKey = 'team' | 'papers' | 'news' | 'research' | 'site';

const tabs: { key: TabKey; labelCn: string; labelEn: string }[] = [
  { key: 'team', labelCn: '团队成员', labelEn: 'Team' },
  { key: 'papers', labelCn: '发表论文', labelEn: 'Papers' },
  { key: 'news', labelCn: '新闻动态', labelEn: 'News' },
  { key: 'research', labelCn: '研究方向', labelEn: 'Research' },
  { key: 'site', labelCn: '首页文案', labelEn: 'Site Content' },
];

// ─── Main Admin Page ─────────────────────────────────────────────────
export default function AdminPage() {
  const { lang, t } = useLanguage();

  // ── 所有 hooks 必须放在 early return 之前（React Hooks 规则）────────
  // 登录状态
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [tokenChecked, setTokenChecked] = useState(false);

  // 业务 state
  const [activeTab, setActiveTab] = useState<TabKey>('team');
  const [team, setTeam] = useState<TeamData>(() => JSON.parse(JSON.stringify(teamData)));
  const [papers, setPapers] = useState<PapersData>(() => JSON.parse(JSON.stringify(papersData)));
  const [news, setNews] = useState<NewsData>(() => JSON.parse(JSON.stringify(newsData)));
  const [research, setResearch] = useState<ResearchData>(() => JSON.parse(JSON.stringify(researchData)));
  const [site, setSite] = useState<SiteData>(() => JSON.parse(JSON.stringify(siteData)));

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalFields, setModalFields] = useState<FieldDef[]>([]);
  const [modalData, setModalData] = useState<Record<string, any>>({});
  const [modalCollection, setModalCollection] = useState('');
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  // 派生值：当前生效的 token
  const authToken = authed
    ? (typeof window !== 'undefined' ? sessionStorage.getItem('admin_token') || password : password)
    : '';

  // 从 sessionStorage 恢复登录态
  useEffect(() => {
    const t = sessionStorage.getItem('admin_token');
    if (t) setAuthed(true);
    setTokenChecked(true);
  }, []);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin?collection=team.members', {
        headers: { 'Authorization': `Bearer ${password}` },
      });
      if (res.status === 401) {
        setLoginError('密码错误，请重试');
      } else {
        sessionStorage.setItem('admin_token', password);
        setAuthed(true);
      }
    } catch {
      setLoginError('网络错误，请重试');
    }
  }, [password]);

  const openAdd = useCallback((collection: string, fields: FieldDef[], title: string) => {
    const empty: Record<string, any> = {};
    fields.forEach((f) => {
      if (f.type === 'boolean') empty[f.name] = false;
      else empty[f.name] = '';
    });
    setModalData(empty);
    setModalFields(fields);
    setModalTitle(title);
    setModalCollection(collection);
    setModalIndex(null);
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((collection: string, fields: FieldDef[], title: string, data: any, index: number) => {
    setModalData({ ...data });
    setModalFields(fields);
    setModalTitle(title);
    setModalCollection(collection);
    setModalIndex(index);
    setModalOpen(true);
  }, []);

  const handleFieldChange = useCallback((name: string, value: any) => {
    setModalData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // 保存成功后的线上生效提示
  const [deployNotice, setDeployNotice] = useState<string | null>(null);

  const handleSave = useCallback(async () => {
    setSaving(true);
    const action = modalIndex !== null ? 'edit' : 'add';
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
        body: JSON.stringify({ collection: modalCollection, action, data: modalData, index: modalIndex }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed');

      // 生产环境走 GitHub 提交，提示用户等待重建
      if (json.mode === 'github') {
        setDeployNotice('变更已提交到 GitHub，Vercel 正在重新构建，线上页面约 1–3 分钟后生效。当前页面已即时预览最新数据。');
        setTimeout(() => setDeployNotice(null), 8000);
      }

      // Optimistically update local state
      if (modalCollection === 'team.members') {
        const copy = { ...team };
        if (action === 'add') copy.members = [...copy.members, json.data];
        else if (action === 'edit' && modalIndex !== null) copy.members[modalIndex] = json.data;
        setTeam(copy);
      } else if (modalCollection === 'team.pi') {
        setTeam((prev) => ({ ...prev, pi: json.data }));
      } else if (modalCollection === 'team.pi.scholarStats') {
        setTeam((prev) => ({ ...prev, pi: { ...prev.pi, scholarStats: json.data } }));
      } else if (modalCollection.startsWith('team.alumni.')) {
        const subKey = modalCollection.split('.')[2];
        setTeam((prev) => {
          const alumniCopy = { ...prev.alumni };
          const arr = [...(alumniCopy[subKey as keyof typeof alumniCopy] as any[] || [])];
          if (action === 'add') arr.push(json.data);
          else if (action === 'edit' && modalIndex !== null) arr[modalIndex] = json.data;
          alumniCopy[subKey as keyof typeof alumniCopy] = arr as any;
          return { ...prev, alumni: alumniCopy };
        });
      } else if (modalCollection === 'papers') {
        const copy = { ...papers };
        if (action === 'add') copy.papers = [...copy.papers, json.data];
        else if (action === 'edit' && modalIndex !== null) copy.papers[modalIndex] = json.data;
        setPapers(copy);
      } else if (modalCollection === 'news') {
        const copy = { ...news };
        if (action === 'add') copy.news = [...copy.news, json.data];
        else if (action === 'edit' && modalIndex !== null) copy.news[modalIndex] = json.data;
        setNews(copy);
      } else if (modalCollection.startsWith('research.')) {
        const subKey = modalCollection.split('.')[1] as keyof ResearchData;
        const copy = { ...research } as Record<string, unknown>;
        const arr = copy[subKey] as unknown[];
        if (action === 'add') copy[subKey] = [...arr, json.data];
        else if (action === 'edit' && modalIndex !== null) arr[modalIndex] = json.data;
        setResearch(copy as unknown as ResearchData);
      } else if (modalCollection === 'site.hero') {
        setSite((prev) => ({ ...prev, hero: json.data }));
      } else if (modalCollection === 'site.philosophy') {
        setSite((prev) => ({ ...prev, philosophy: json.data }));
      }
      setModalOpen(false);
    } catch (err: any) {
      alert('保存失败: ' + err.message);
    } finally {
      setSaving(false);
    }
  }, [authToken, modalCollection, modalData, modalIndex, team, papers, news, research, site]);

  const handleDelete = useCallback(async (collection: string, index: number) => {
    try {
      const list = collection === 'papers' ? papers.papers
        : collection === 'news' ? news.news
        : collection === 'team.members' ? team.members
        : collection.startsWith('team.alumni.') ? (team.alumni as any)[collection.split('.')[2]] as unknown[]
        : collection.startsWith('research.') ? research[collection.split('.')[1] as keyof ResearchData] as unknown[]
        : [] as unknown[];
      const itemId = (list[index] as Record<string, unknown>)?.id as number | undefined;
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
        body: JSON.stringify({ collection, action: 'delete', data: { id: itemId }, index }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed');

      if (collection === 'team.members') {
        setTeam((prev) => ({ ...prev, members: prev.members.filter((_, i) => i !== index) }));
      } else if (collection.startsWith('team.alumni.')) {
        const subKey = collection.split('.')[2];
        setTeam((prev) => {
          const alumniCopy = { ...prev.alumni };
          const arr = (alumniCopy as any)[subKey] as any[];
          (alumniCopy as any)[subKey] = arr.filter((_: any, i: number) => i !== index);
          return { ...prev, alumni: alumniCopy };
        });
      } else if (collection === 'papers') {
        setPapers((prev) => ({ ...prev, papers: prev.papers.filter((_, i) => i !== index) }));
      } else if (collection === 'news') {
        setNews((prev) => ({ ...prev, news: prev.news.filter((_, i) => i !== index) }));
      } else if (collection.startsWith('research.')) {
        const subKey = collection.split('.')[1] as keyof ResearchData;
        setResearch((prev) => ({
          ...prev,
          [subKey]: (prev[subKey] as unknown[]).filter((_, i: number) => i !== index),
        }));
      }
    } catch (err: any) {
      alert('删除失败: ' + err.message);
    }
  }, [authToken, team, papers, news, research, site]);

  // ── Early returns（必须在所有 hooks 之后）────────────────────────
  if (!tokenChecked) return null;
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-bg">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm p-8 bg-white rounded-2xl border border-neutral-gray shadow-sm"
        >
          <h1 className="text-xl font-light text-earth-green-deep mb-1">后台管理</h1>
          <p className="text-sm text-neutral-text-secondary mb-6">Admin Dashboard</p>
          <label className="block text-sm text-neutral-text mb-1.5">管理密码</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="输入密码..."
            className="w-full px-4 py-2.5 text-sm border border-neutral-gray rounded-card bg-white focus:outline-none focus:border-earth-green mb-4"
            autoFocus
          />
          {loginError && <p className="text-sm text-red-500 mb-3">{loginError}</p>}
          <button
            type="submit"
            className="w-full py-2.5 text-sm text-white bg-earth-green-deep rounded-card hover:bg-earth-green transition-colors"
          >
            登录
          </button>
        </form>
      </div>
    );
  }

  // ── Shared tab props ──────────────────────────────────────────────
  const tabProps = { lang, t, openAdd, openEdit, handleDelete };

  // ═══════════════════════════════════════════════════════════════
  return (
    <>
      {/* Deploy Notice */}
      {deployNotice && (
        <div className="fixed top-0 left-0 right-0 z-[70] bg-amber-500 text-white text-sm text-center py-2.5 px-4 shadow-md">
          {deployNotice}
        </div>
      )}

      <PageHero
        title={lang === 'zh' ? '后台管理' : 'Admin Dashboard'}
        subtitle={lang === 'zh' ? '直接在网页布局中管理内容，就像进入了编辑模式' : 'Manage content directly in the website layout, as if entering edit mode'}
      />

      {/* Tab Navigation */}
      <section className="section-container pb-0">
        <div className="flex gap-1 border-b border-neutral-gray">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 text-sm font-normal transition-colors relative ${
                activeTab === tab.key
                  ? 'text-earth-green-deep'
                  : 'text-neutral-text-secondary hover:text-neutral-text'
              }`}
            >
              {lang === 'zh' ? tab.labelCn : tab.labelEn}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-earth-green-deep" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 'team' && <TeamTab {...tabProps} team={team} />}
      {activeTab === 'papers' && <PapersTab {...tabProps} papers={papers} team={team} />}
      {activeTab === 'news' && <NewsTab {...tabProps} news={news} />}
      {activeTab === 'research' && <ResearchTab {...tabProps} research={research} />}
      {activeTab === 'site' && <SiteTab {...tabProps} site={site} />}

      {/* Modal */}
      <AdminModal
        open={modalOpen}
        title={modalTitle}
        fields={modalFields}
        data={modalData}
        onChange={handleFieldChange}
        onSave={handleSave}
        onCancel={() => setModalOpen(false)}
        saving={saving}
      />
    </>
  );
}
