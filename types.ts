export type Language = 'en' | 'fr' | 'de';
export type Theme = 'light' | 'dark' | 'system';

export interface Project {
  id: number;
  title: string;
  description: Record<Language, string>;
  role: Record<Language, string>;
  tags: string[];
  metrics: Record<Language, string>;
  image: string;
  link: string;
  github: string;
}

export interface Service {
  id: number;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
  steps: Record<Language, string[]>;
}

export interface SkillCategory {
  category: Record<Language, string>;
  skills: { name: string; level: number }[];
}

export interface TimelineItem {
  year: string;
  role: Record<Language, string>;
  company: string;
  description: Record<Language, string>;
}

export interface Profile {
  name: string;
  title: string;
  bio: Record<Language, string>;
  intro: Record<Language, string>;
  hero: Record<Language, {
    line1: string;
    line2: string;
    line3: string;
    availability: string;
  }>;
  stats: {
    experience: string;
    experienceLabel: Record<Language, string>;
    projects: string;
    projectsLabel: Record<Language, string>;
  };
  location: Record<Language, string>;
  email: string;
  cvUrl: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  twitter: string;
}

export interface Translations {
  [key: string]: {
    nav: {
      projects: string;
      about: string;
      stack: string;
      contact: string;
      letsTalk: string;
    };
    hero: {
      viewProjects: string;
      bookCall: string;
      scroll: string;
    };
    projects: {
      selectedWorks: string;
      featuredProjects: string;
      scrollToExplore: string;
      viewLive: string;
      wantToSeeMore: string;
      viewGitHubProfile: string;
    };
    about: {
      aboutMe: string;
      title: string;
      experience: string;
    };
    skills: {
      techStack: string;
      toolsOfTheTrade: string;
    };
    services: {
      services: string;
      howICanHelp: string;
      description: string;
      process: string;
    };
    contact: {
      title: string;
      sendMessage: string;
      name: string;
      email: string;
      message: string;
      send: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      copyright: string;
    };
    footer: {
      copyright: string;
    };
  };
}
