export const siteConfig = {
  title: 'Faruk — Tech Blog',
  description:
    'Articles on Java, Spring Boot, AI Engineering, MCP, LLMs, RAG, software architecture, and study notes.',
  author: 'Faruk',
  url: 'https://blog.faruk.dev.br',
  locale: 'en',
  github: 'https://github.com/farukzahra',
  githubRepo: 'https://github.com/farukzahra/astro',
  githubBranch: 'main',
  linkedin: 'https://www.linkedin.com/in/farukzahra',
  resumeUrl: 'https://www.faruk.dev.br/',
  newsletter: '#newsletter',
  giscus: {
    repo: 'farukzahra/astro',
    repoId: '1315085702',
    category: 'General',
    categoryId: 'DIC_kwDOTmKdhs4DCKnK',
    mapping: 'pathname',
    lang: 'en',
  },
} as const;

export const categories = [
  'Java',
  'Spring Boot',
  'Software Architecture',
  'AI Engineering',
  'Machine Learning',
  'LLMs',
  'Prompt Engineering',
  'MCP',
  'RAG',
  'Agents',
  'Career',
  'Projects',
] as const;

export type Category = (typeof categories)[number];

export const categoryFolders = {
  java: 'Java',
  spring: 'Spring Boot',
  architecture: 'Software Architecture',
  ai: 'AI Engineering',
  ml: 'Machine Learning',
  llm: 'LLMs',
  prompt: 'Prompt Engineering',
  mcp: 'MCP',
  rag: 'RAG',
  agents: 'Agents',
  career: 'Career',
  projects: 'Projects',
} as const;
