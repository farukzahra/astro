import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../config';
import { filterArticlesForListing } from '../lib/i18n';

export async function GET(context: { site: string | undefined }) {
  const articles = filterArticlesForListing(
    (await getCollection('articles')).filter((article) => !article.data.draft),
  )
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    items: articles.map((article) => ({
      title: article.data.title,
      pubDate: article.data.publishDate,
      description: article.data.description,
      link: `/articles/${article.id}/`,
    })),
  });
}
