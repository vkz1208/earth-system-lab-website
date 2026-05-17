import { Leaf, Globe, Thermometer, Shield, Cpu, Satellite, Microscope, BookOpen, Users, Newspaper, LucideIcon } from 'lucide-react';

/** Map from JSON icon string to lucide-react component */
export const directionIconMap: Record<string, { Icon: LucideIcon; size: number; strokeWidth: number }> = {
  Leaf: { Icon: Leaf, size: 20, strokeWidth: 1.5 },
  Globe: { Icon: Globe, size: 20, strokeWidth: 1.5 },
  Thermometer: { Icon: Thermometer, size: 20, strokeWidth: 1.5 },
  Shield: { Icon: Shield, size: 20, strokeWidth: 1.5 },
  Cpu: { Icon: Cpu, size: 20, strokeWidth: 1.5 },
  Satellite: { Icon: Satellite, size: 20, strokeWidth: 1.5 },
};

/** Map for research page (larger icons) */
export const researchIconMap: Record<string, React.ReactNode> = {
  Leaf: <Leaf size={28} strokeWidth={1.5} />,
  Globe: <Globe size={28} strokeWidth={1.5} />,
  Thermometer: <Thermometer size={28} strokeWidth={1.5} />,
  Shield: <Shield size={28} strokeWidth={1.5} />,
  Cpu: <Cpu size={28} strokeWidth={1.5} />,
  Satellite: <Satellite size={28} strokeWidth={1.5} />,
};

/** Map for home page navigation cards */
export const navCardIconMap: Record<string, { Icon: LucideIcon; size: number; strokeWidth: number }> = {
  research: { Icon: Microscope, size: 32, strokeWidth: 1.2 },
  papers: { Icon: BookOpen, size: 32, strokeWidth: 1.2 },
  team: { Icon: Users, size: 32, strokeWidth: 1.2 },
  news: { Icon: Newspaper, size: 32, strokeWidth: 1.2 },
};
