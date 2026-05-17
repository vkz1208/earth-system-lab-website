export interface Paper {
  id: number;
  title: string;
  authors: string;
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  category: string;
  journalCategory: string;
  researchDirections: string[];
  image?: string;
  isCorresponding?: boolean;
  isFirstAuthor?: boolean;
}

export interface PI {
  name: string;
  nameCn: string;
  role: string;
  title: string;
  titleCn: string;
  email: string;
  phone: string;
  photo: string;
  education: string[];
  educationCn: string[];
  bio: string;
  bioCn: string;
  honors: string[];
  honorsCn: string[];
  links: { label: string; url: string }[];
  scholarStats: {
    citations: string;
    hIndex: string;
    i10Index: string;
    publications: string;
    asOf: string;
  };
}

export interface TeamMember {
  name: string;
  nameCn: string;
  role: string;
  roleCn?: string;
  email?: string;
  education?: string;
  educationCn?: string;
  started?: string;
  photo?: string;
  links?: { label: string; url: string }[];
}

export interface AlumniMember {
  name: string;
  nameCn: string;
  role: string;
  roleCn?: string;
  current?: string;
  currentCn?: string;
  photo?: string;
}

export interface NewsItem {
  id: number;
  date: string;
  title: string;
  titleCn?: string;
  summary: string;
  summaryCn?: string;
  image?: string;
  link?: string;
}

export interface ResearchDirection {
  title: string;
  titleCn: string;
  description: string;
  descriptionCn: string;
  icon: string;
}

export interface ResearchProject {
  title: string;
  titleCn: string;
  source: string;
  sourceCn: string;
  period: string;
  funding: string;
  role: string;
  roleCn: string;
}

export interface Course {
  name: string;
  nameCn: string;
  type: string;
  hours: string;
  language: string;
}

export interface Dataset {
  title: string;
  titleCn: string;
  description: string;
  descriptionCn: string;
  downloadUrl?: string;
  codesUrl?: string;
}

// ─── Top-level JSON data shapes ────────────────────────────

export interface TeamData {
  pi: PI;
  members: TeamMember[];
  alumni: {
    members: AlumniMember[];
    masterStudents: AlumniMember[];
    bachelorStudents: AlumniMember[];
  };
}

export interface PapersData {
  papers: Paper[];
}

export interface NewsData {
  news: NewsItem[];
}

export interface ResearchData {
  directions: ResearchDirection[];
  projects: ResearchProject[];
  courses: Course[];
  datasets: Dataset[];
}

export interface SiteHero {
  tagline: string;
  taglineCn: string;
  title: string;
  titleCn: string;
  subtitle: string;
  subtitleCn: string;
  quote: string;
  quoteCn: string;
}

export interface SitePhilosophy {
  paragraph1: string;
  paragraph1Cn: string;
  paragraph2: string;
  paragraph2Cn: string;
  question: string;
  questionCn: string;
}

export interface SiteData {
  hero: SiteHero;
  philosophy: SitePhilosophy;
}
