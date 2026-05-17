/**
 * Typed data access layer
 *
 * Re-exports JSON data with proper TypeScript types so consumers
 * never need `as any` to access bilingual fields.
 */
import type {
  TeamData,
  PapersData,
  NewsData,
  ResearchData,
  SiteData,
} from '@/types';

import rawTeam from './team.json';
import rawPapers from './papers.json';
import rawNews from './news.json';
import rawResearch from './research.json';
import rawSite from './site.json';

export const team = rawTeam as TeamData;
export const papers = rawPapers as PapersData;
export const news = rawNews as NewsData;
export const research = rawResearch as ResearchData;
export const site = rawSite as SiteData;
