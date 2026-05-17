'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type Lang = 'en' | 'zh';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.research': 'Research',
    'nav.papers': 'Papers',
    'nav.team': 'Team',
    'nav.news': 'News',
    'nav.contact': 'Contact',

    // Footer
    'footer.labName': 'Earth System & Global Change Lab',
    'footer.school': 'School of Environmental Science and Engineering',
    'footer.university': 'Southern University of Science and Technology',
    'footer.links': 'Links',
    'footer.contact': 'Contact',
    'footer.address1': 'Engineering Building, SUSTech',
    'footer.address2': 'Nanshan District, Shenzhen, China',
    'footer.funding': 'Funding: Start-up Fund by SUSTech · General Project by NSFC',
    'footer.copyright': 'Earth System & Global Change Lab. All rights reserved.',

    // Home
    'home.heroTitle': 'Earth System & Global Change Lab',
    'home.heroSub1': 'We study the interactions between the biosphere, atmosphere, hydrosphere, and anthroposphere in Earth\'s surface system, advancing understanding of global environmental change.',
    'home.heroSub2': 'School of Environmental Science and Engineering, SUSTech',
    'home.overviewEn': 'Our research includes global environmental change, earth system science, earth system simulation, surface hydrology, ecological hydrology, climate variation and its attribution, the role of vegetation in land-climate interactions, and remote sensing of vegetation and land use change.',
    'home.overviewCn': '我们利用地表观测网络、卫星遥感技术和新一代地球系统模型，研究地球表层系统中生物圈、大气圈、水圈和人类圈之间的协同演化与耦合关系，量化人类社会发展作用下地表过程与气候变化之间的相互作用，为环境保护、资源利用、减缓和应对气候变化提供科学证据和理论支撑。',
    'home.card.research': 'Research',
    'home.card.researchDesc': 'Research directions, projects, and outcomes',
    'home.card.papers': 'Papers',
    'home.card.papersDesc': 'Publications in top-tier journals',
    'home.card.team': 'Team',
    'home.card.teamDesc': 'Our researchers and students',
    'home.card.news': 'News',
    'home.card.newsDesc': 'Latest updates and highlights',
    'home.recentNews': 'Recent News',
    'home.joinUs': 'Join Us',
    'home.joinUsDesc': 'We are looking for passionate new Postdocs, PhD students, Master students, and Undergraduate students to join the team.',
    'home.seeOpenings': 'See Openings',

    // Research
    'research.title': 'Research',
    'research.subtitle': 'We investigate Earth system processes and global change, aiming to provide scientific evidence for climate change mitigation and adaptation.',
    'research.directions': 'Research Directions',
    'research.teaching': 'Teaching',
    'research.projects': 'Major Projects',
    'research.datasets': 'Open Datasets & Resources',
    'research.download': 'Download',
    'research.code': 'Code',

    // Papers
    'papers.title': 'Publications',
    'papers.subtitle': 'Our research has been published in Nature, Science, Nature Sustainability, Nature Climate Change, Nature Geoscience, Nature Water, and other leading journals.',
    'papers.selected': 'Selected Papers',
    'papers.all': 'All Papers',
    'papers.search': 'Search by title, author, or journal...',
    'papers.allYears': 'All Years',
    'papers.count': 'paper(s) found',
    'papers.journalCategory': 'Journal Category',
    'papers.year': 'Year',
    'papers.researchDirection': 'Research Direction',

    // Team
    'team.title': 'Team',
    'team.subtitle': 'Our team of researchers, postdocs, and students working on Earth system science and global change.',
    'team.pi': 'Principal Investigator',
    'team.selectedHonors': 'Selected Honors',
    'team.alumni': 'Alumni',
    'team.formerMembers': 'Former Members',
    'team.formerMaster': 'Former Master Students',
    'team.formerBachelor': 'Former Bachelor Students',
    'team.thisCouldBeYou': 'This Could Be You',
    'team.joinDesc': 'We are looking for passionate new Postdocs, PhD students, Master students, and Undergraduate students to join the team.',
    'team.contactUs': 'Contact Us',
    'team.started': 'Started',
    'team.formerRole': 'Former Role',
    'team.currentPosition': 'Current Position',

    // News
    'news.title': 'News',
    'news.subtitle': 'Latest updates, publications, and highlights from our research group.',
    'news.readMore': 'Read more',
    'news.allYears': 'All',
    'news.newsCount': 'item(s)',

    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with the Earth System and Global Change Lab at Southern University of Science and Technology.',
    'contact.info': 'Contact Information',
    'contact.address': 'Address',
    'contact.addressLine1': 'Engineering Building',
    'contact.addressLine2': 'Southern University of Science and Technology',
    'contact.addressLine3': 'Nanshan District, Shenzhen, China',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.website': 'Website',
    'contact.openPositions': 'Open Positions',
    'contact.recruiting': 'We are actively recruiting:',
    'contact.postdoc': 'Postdoctoral Researchers',
    'contact.phd': 'PhD Students',
    'contact.master': 'Master Students',
    'contact.undergrad': 'Undergraduate Students',
    'contact.applyNow': 'Apply Now',
  },
  zh: {
    // Navbar
    'nav.home': '首页',
    'nav.research': '研究',
    'nav.papers': '论文',
    'nav.team': '团队',
    'nav.news': '新闻',
    'nav.contact': '联系',

    // Footer
    'footer.labName': '地球系统与全球变化实验室',
    'footer.school': '环境科学与工程学院',
    'footer.university': '南方科技大学',
    'footer.links': '链接',
    'footer.contact': '联系方式',
    'footer.address1': '南方科技大学 工学楼',
    'footer.address2': '中国 深圳市 南山区',
    'footer.funding': '资助：南方科技大学启动基金 · 国家自然科学基金面上项目',
    'footer.copyright': '地球系统与全球变化实验室 保留所有权利',

    // Home
    'home.heroTitle': '地球系统与全球变化实验室',
    'home.heroSub1': '我们研究地球表层系统中生物圈、大气圈、水圈和人类圈之间的相互作用，推进对全球环境变化的理解。',
    'home.heroSub2': '南方科技大学 环境科学与工程学院',
    'home.overviewEn': 'Our research includes global environmental change, earth system science, earth system simulation, surface hydrology, ecological hydrology, climate variation and its attribution, the role of vegetation in land-climate interactions, and remote sensing of vegetation and land use change.',
    'home.overviewCn': '我们利用地表观测网络、卫星遥感技术和新一代地球系统模型，研究地球表层系统中生物圈、大气圈、水圈和人类圈之间的协同演化与耦合关系，量化人类社会发展作用下地表过程与气候变化之间的相互作用，为环境保护、资源利用、减缓和应对气候变化提供科学证据和理论支撑。',
    'home.card.research': '研究方向',
    'home.card.researchDesc': '研究方向、项目与成果',
    'home.card.papers': '发表论文',
    'home.card.papersDesc': '发表于顶尖期刊的论文',
    'home.card.team': '团队成员',
    'home.card.teamDesc': '我们的研究人员与学生',
    'home.card.news': '最新动态',
    'home.card.newsDesc': '最新消息与亮点',
    'home.recentNews': '最新动态',
    'home.joinUs': '加入我们',
    'home.joinUsDesc': '我们正在招聘博士后、博士研究生、硕士研究生和本科生加入团队。',
    'home.seeOpenings': '查看招聘信息',

    // Research
    'research.title': '研究',
    'research.subtitle': '我们研究地球系统过程与全球变化，为气候变化减缓和适应提供科学依据。',
    'research.directions': '研究方向',
    'research.teaching': '教学工作',
    'research.projects': '重大项目',
    'research.datasets': '开放数据与资源',
    'research.download': '下载',
    'research.code': '代码',

    // Papers
    'papers.title': '发表论文',
    'papers.subtitle': '我们的研究成果已发表于 Nature、Science、Nature Sustainability、Nature Climate Change、Nature Geoscience、Nature Water 等顶级期刊。',
    'papers.selected': '精选论文',
    'papers.all': '全部论文',
    'papers.search': '按标题、作者或期刊搜索...',
    'papers.allYears': '全部年份',
    'papers.count': '篇论文',
    'papers.journalCategory': '期刊类别',
    'papers.year': '年份',
    'papers.researchDirection': '研究方向',

    // Team
    'team.title': '团队',
    'team.subtitle': '我们团队由从事地球系统科学和全球变化研究的研究人员、博士后和学生组成。',
    'team.pi': '课题组长',
    'team.selectedHonors': '主要荣誉',
    'team.alumni': '校友',
    'team.formerMembers': '前团队成员',
    'team.formerMaster': '前硕士研究生',
    'team.formerBachelor': '前本科生',
    'team.thisCouldBeYou': '期待你的加入',
    'team.joinDesc': '我们正在招聘博士后、博士研究生、硕士研究生和本科生加入团队。',
    'team.contactUs': '联系我们',
    'team.started': '入职时间',
    'team.formerRole': '离开时角色',
    'team.currentPosition': '去向',

    // News
    'news.title': '新闻动态',
    'news.subtitle': '来自我们研究组的最新消息、发表论文和亮点。',
    'news.readMore': '阅读更多',
    'news.allYears': '全部',
    'news.newsCount': '条',

    // Contact
    'contact.title': '联系我们',
    'contact.subtitle': '与南方科技大学地球系统与全球变化实验室取得联系。',
    'contact.info': '联系信息',
    'contact.address': '地址',
    'contact.addressLine1': '工学楼',
    'contact.addressLine2': '南方科技大学',
    'contact.addressLine3': '中国 深圳市 南山区',
    'contact.email': '邮箱',
    'contact.phone': '电话',
    'contact.website': '网站',
    'contact.openPositions': '招聘岗位',
    'contact.recruiting': '我们正在招聘：',
    'contact.postdoc': '博士后研究员',
    'contact.phd': '博士研究生',
    'contact.master': '硕士研究生',
    'contact.undergrad': '本科生',
    'contact.applyNow': '立即申请',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'zh' : 'en'));
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[lang][key] || key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

/** Localize a field from a typed object, falling back to the base field if Cn variant is missing */
export function localizeField<
  T extends Record<string, any>,
  K extends string & keyof T
>(obj: T, field: K, lang: Lang): string {
  if (lang === 'zh') {
    const cnKey = `${field}Cn` as keyof T;
    const cnVal = obj[cnKey];
    if (typeof cnVal === 'string' && cnVal) return cnVal;
    // Fallback: array of strings (e.g. educationCn)
    if (Array.isArray(cnVal) && cnVal.length > 0) return cnVal as unknown as string;
    return String(obj[field] ?? '');
  }
  return String(obj[field] ?? '');
}

/** Localize a simple en/zh string pair */
export function localize(en: string, zh: string, lang: Lang): string {
  return lang === 'zh' ? zh : en;
}

/** Localize an en/zh array pair (e.g. education / educationCn) */
export function localizeArray(en: string[], zh: string[] | undefined, lang: Lang): string[] {
  if (lang === 'zh' && zh && zh.length > 0) return zh;
  return en;
}
