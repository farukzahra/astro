function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick(list, seed) {
  return list[seed % list.length];
}

/** Sanitize tag label → LinkedIn hashtag (no spaces). */
function toHashtag(label) {
  const cleaned = label.replace(/[^a-zA-Z0-9\s-]/g, '').trim();
  if (!cleaned) return '';
  const parts = cleaned.split(/[\s-]+/);
  if (parts.length === 1) return `#${parts[0]}`;
  return `#${parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join('')}`;
}

const DEFAULT_HASHTAG_POOL = [
  'SoftwareEngineering',
  'TechBlog',
  'Developer',
  'Programming',
  'OpenSource',
  'CloudComputing',
  'DevOps',
  'Backend',
  'Frontend',
  'Architecture',
  'ArtificialIntelligence',
  'MachineLearning',
  'GenerativeAI',
  'LLM',
  'Python',
  'Java',
  'SpringBoot',
  'Azure',
  'Docker',
  'API',
];

const MIN_HASHTAGS = 10;

const HOOKS = [
  'Before a renewal call, sales reps still juggle CRM tabs, ticket queues, and PDF contracts.',
  'Enterprise agents fail when everything is stuffed into one prompt — or when every flow is hard-coded.',
  'Most "AI sales assistants" are either generic chatbots or brittle if-this-then-that scripts.',
];

const TAKEAWAYS = [
  'The pattern scales: add a REST API, expose it as an MCP tool, let the agent decide when to call it.',
  'Worth stealing if you need FACT vs recommendation separation and a provenance panel in the UI.',
  'Local Docker stack first, Azure OpenAI + AI Search when you are ready — same agent code.',
];

/**
 * Build at least MIN_HASHTAGS unique hashtags (article tags first, then pool).
 * @param {string[]} articleTags
 * @param {number} seed
 * @param {string} [title]
 */
export function buildHashtags(articleTags, seed, title = '') {
  const seen = new Set();
  const result = [];

  const add = (tag) => {
    const h = toHashtag(tag);
    const key = h.toLowerCase();
    if (!h || seen.has(key)) return;
    seen.add(key);
    result.push(h);
  };

  for (const tag of articleTags) add(tag);

  if (title) {
    for (const word of title.split(/\s+/)) {
      if (word.length > 3) add(word);
      if (result.length >= MIN_HASHTAGS) break;
    }
  }

  const pool = [...DEFAULT_HASHTAG_POOL];
  for (let i = 0; i < pool.length && result.length < MIN_HASHTAGS; i += 1) {
    add(pool[(seed + i) % pool.length]);
  }

  let i = 0;
  while (result.length < MIN_HASHTAGS) {
    add(`Tech${i}`);
    i += 1;
  }

  return result.slice(0, Math.max(MIN_HASHTAGS, result.length));
}

/**
 * Generate a ~10-line LinkedIn post in English (human tone, URL at the end).
 * Always includes at least 10 hashtags before the URL.
 * @param {{ title: string; description: string; tags?: string[]; url: string; intro?: string }} article
 */
export function generateLinkedInCopy(article) {
  const seed = hashString(article.url);
  const hook = pick(HOOKS, seed);
  const takeaway = pick(TAKEAWAYS, seed >> 2);
  const desc = article.description.replace(/\.$/, '');
  const tags = article.tags ?? [];
  const stack =
    tags.length > 0
      ? tags.slice(0, 5).join(' · ')
      : 'Semantic Kernel · MCP · RAG · FastAPI';

  const hashtags = buildHashtags(tags, seed, article.title).join(' ');

  const lines = [
    hook,
    '',
    `I wrote about how we wired that up: ${desc}.`,
    '',
    `Stack: ${stack}.`,
    'MCP handles transactional data (CRM, sales, tickets). RAG handles policies and contracts.',
    'Semantic Kernel picks the tools per question — no manual routing table in Python.',
    'The MCP server only forwards to REST; business rules stay in the existing APIs.',
    takeaway,
    '',
    hashtags,
    '',
    article.url,
  ];

  return lines.join('\n').trim();
}
