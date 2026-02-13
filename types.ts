export interface Project {
  id: number;
  title: string;
  description: string;
  role: string;
  tags: string[];
  metrics: string;
  image: string;
  link: string;
  github: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  steps: string[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number }[];
}

export interface TimelineItem {
  year: string;
  role: string;
  company: string;
  description: string;
}