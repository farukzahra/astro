export const siteConfig = {
  title: 'Faruk — Tech Blog',
  description:
    'Artigos sobre Java, Spring Boot, AI Engineering, MCP, LLMs, RAG, arquitetura de software e notas de estudo.',
  author: 'Faruk',
  url: 'https://blog.faruk.dev.br',
  locale: 'pt-BR',
  github: 'https://github.com/farukzahra',
  linkedin: 'https://www.linkedin.com/in/farukzahra',
  newsletter: '#newsletter',
  giscus: {
    repo: 'farukzahra/astro',
    repoId: '1315085702',
    category: 'General',
    categoryId: 'DIC_kwDOTmKdhs4DCKnK',
    mapping: 'pathname',
    lang: 'pt',
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
