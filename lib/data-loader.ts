import profileData from '../data/profile.json';
import projectsData from '../data/projects.json';
import skillsData from '../data/skills.json';
import timelineData from '../data/timeline.json';
import servicesData from '../data/services.json';
import socialData from '../data/social.json';
import techStackData from '../data/tech-stack.json';
import translationsData from '../data/translations.json';
import type { Profile, Project, SkillCategory, TimelineItem, Service, SocialLinks, Translations } from '../types';

export const profile: Profile = profileData as Profile;
export const projects: Project[] = projectsData as Project[];
export const skills: SkillCategory[] = skillsData as SkillCategory[];
export const timeline: TimelineItem[] = timelineData as TimelineItem[];
export const services: Service[] = servicesData as Service[];
export const social: SocialLinks = socialData as SocialLinks;
export const techStack: string[] = techStackData as string[];
export const translations: Translations = translationsData as Translations;
