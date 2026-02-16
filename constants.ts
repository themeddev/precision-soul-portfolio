import { Project, Service, SkillCategory, TimelineItem } from "./types";

export const NAV_LINKS = [
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Stack", href: "#stack" },
  { name: "Contact", href: "#contact" },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "FinTech Dashboard",
    description:
      "A real-time financial analytics platform processing 50k+ transactions per second.",
    role: "Lead Full-Stack",
    tags: ["Next.js", "PostgreSQL", "Redis", "AWS"],
    metrics: "+45% Data Retrieval Speed",
    image: "https://picsum.photos/id/48/1200/800",
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "E-Commerce Headless",
    description:
      "Composable commerce solution integrated with Shopify Plus and Contentful.",
    role: "Frontend Architect",
    tags: ["React", "GraphQL", "Tailwind", "Vercel"],
    metrics: "+30% Conversion Rate",
    image: "https://picsum.photos/id/201/1200/800",
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "AI Content Engine",
    description:
      "SaaS platform leveraging LLMs to generate marketing copy at scale.",
    role: "Full-Stack Developer",
    tags: ["Python", "FastAPI", "React", "OpenAI"],
    metrics: "10k+ Monthly Users",
    image: "https://picsum.photos/id/3/1200/800",
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "HealthTech App",
    description:
      "HIPAA-compliant telemedicine application for scheduling and video calls.",
    role: "Backend Lead",
    tags: ["Node.js", "WebRTC", "Docker", "K8s"],
    metrics: "99.99% Uptime",
    image: "https://picsum.photos/id/119/1200/800",
    link: "#",
    github: "#",
  },
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "GSAP / Three.js", level: 85 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "Redis", level: 80 },
      { name: "Go", level: 70 },
    ],
  },
  {
    category: "DevOps",
    skills: [
      { name: "Docker", level: 85 },
      { name: "AWS", level: 80 },
      { name: "CI/CD Pipelines", level: 85 },
      { name: "Terraform", level: 75 },
    ],
  },
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: {
      en: "Full-Stack Web Apps",
      fr: "Applications Web Full-Stack",
      de: "Full-Stack Web-Apps",
    },
    description: {
      en: "End-to-end development of scalable, performant web applications using modern architectures.",
      fr: "Développement de bout en bout...",
      de: "End-to-End-Entwicklung...",
    },
    icon: "Layers",
    steps: {
      en: ["Architecture", "Development", "Testing", "Deployment"],
      fr: [],
      de: [],
    },
  },
  {
    id: 2,
    title: {
      en: "API & Systems Design",
      fr: "Conception d'API",
      de: "API-Design",
    },
    description: {
      en: "Robust backend systems designed for high availability, security, and low latency.",
      fr: "Systèmes backend robustes...",
      de: "Robuste Backend-Systeme...",
    },
    icon: "Database",
    steps: {
      en: ["Schema Design", "API Dev", "Optimization", "Documentation"],
      fr: [],
      de: [],
    },
  },
  {
    id: 3,
    title: {
      en: "Performance Tuning",
      fr: "Optimisation des performances",
      de: "Leistungsoptimierung",
    },
    description: {
      en: "Optimizing existing applications for Core Web Vitals, load times, and server efficiency.",
      fr: "Optimisation des applications...",
      de: "Optimierung bestehender Anwendungen...",
    },
    icon: "Zap",
    steps: {
      en: ["Audit", "Refactoring", "Caching", "Monitoring"],
      fr: [],
      de: [],
    },
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "2023 - Present",
    role: "Senior Full-Stack Engineer",
    company: "TechFlow Agency",
    description:
      "Leading a team of 5 developers building enterprise SaaS solutions.",
  },
  {
    year: "2021 - 2023",
    role: "Full-Stack Developer",
    company: "StartUp Inc.",
    description: "Built the MVP and scaled the product to the first 50k users.",
  },
  {
    year: "2019 - 2021",
    role: "Frontend Developer",
    company: "Creative Digital",
    description:
      "Crafted award-winning marketing sites and interactive experiences.",
  },
];
