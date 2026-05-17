/** Team role ordering and labels */
export const roleOrder = [
  'Research Assistant Professor',
  'Postdoc',
  'PhD Student',
  'Master Student',
  'Undergraduate',
  'Secretary',
] as const;

export const roleLabels: Record<string, { en: string; zh: string }> = {
  'Research Assistant Professor': { en: 'Research Assistant Professors', zh: '研究助理教授' },
  'Postdoc': { en: 'Postdocs', zh: '博士后' },
  'PhD Student': { en: 'PhD Students', zh: '博士研究生' },
  'Master Student': { en: 'Master Students', zh: '硕士研究生' },
  'Undergraduate': { en: 'Undergraduates', zh: '本科生' },
  'Secretary': { en: 'Secretaries', zh: '科研秘书' },
};

/** Paper categories (legacy field, kept for backward compat) */
export const paperCategories = ['All', 'Nature/Science', 'Environmental Science', 'Energy', 'Earth System Science'] as const;

export const paperCategoriesCn: Record<string, string> = {
  'All': '全部',
  'Nature/Science': 'Nature/Science',
  'Environmental Science': '环境科学',
  'Energy': '能源',
  'Earth System Science': '地球系统科学',
};

/** Journal tier categories */
export const journalCategories = ['All', 'NS-Main', 'NS-Sub', 'Top-Journal', 'Field-Journal'] as const;

export const journalCategoriesCn: Record<string, string> = {
  'All': '全部',
  'NS-Main': 'Nature/Science 正刊',
  'NS-Sub': 'Nature/Science 子刊',
  'Top-Journal': '综合性顶刊',
  'Field-Journal': '领域重要期刊',
};

export const journalCategoriesEn: Record<string, string> = {
  'All': 'All',
  'NS-Main': 'Nature/Science Main',
  'NS-Sub': 'Nature/Science Sub-journals',
  'Top-Journal': 'Top Journals',
  'Field-Journal': 'Field Journals',
};

/** Research directions */
export const researchDirections = ['All', 'earth-system', 'energy-transition', 'ai-climate'] as const;

export const researchDirectionsCn: Record<string, string> = {
  'All': '全部',
  'earth-system': '地球系统',
  'energy-transition': '能源转型',
  'ai-climate': 'AI for Climate',
};

export const researchDirectionsEn: Record<string, string> = {
  'All': 'All',
  'earth-system': 'Earth System',
  'energy-transition': 'Energy Transition',
  'ai-climate': 'AI for Climate',
};

/** Format a date string ("YYYY-MM") for display */
export function formatDate(dateStr: string, lang: 'en' | 'zh'): string {
  const [year, month] = dateStr.split('-');
  const monthNames = lang === 'zh'
    ? ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${year} ${monthNames[parseInt(month) - 1]}`;
}
