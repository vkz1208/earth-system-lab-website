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
  isCorresponding?: boolean;
  isFirstAuthor?: boolean;
}

export interface TeamMember {
  name: string;
  nameCn: string;
  role: string;
  email?: string;
  education?: string;
  started?: string;
  photo?: string;
  links?: { label: string; url: string }[];
}

export interface NewsItem {
  id: number;
  date: string;
  title: string;
  summary: string;
  image?: string;
  link?: string;
}

export interface ResearchDirection {
  title: string;
  description: string;
  icon: string;
}

export interface ResearchProject {
  title: string;
  source: string;
  period: string;
  funding: string;
  role: string;
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
  description: string;
  downloadUrl?: string;
  codesUrl?: string;
}
