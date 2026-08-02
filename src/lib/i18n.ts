import type { CollectionEntry } from 'astro:content';
import { isDevPreview } from './articles';

export type ArticleLang = 'en' | 'pt-BR';

export const defaultArticleLang: ArticleLang = 'en';

export const articleLangLabels: Record<ArticleLang, string> = {
  en: 'English',
  'pt-BR': 'Português',
};

export const articleLangFlags: Record<ArticleLang, string> = {
  en: '🇺🇸',
  'pt-BR': '🇧🇷',
};

export const articleDateLocales: Record<ArticleLang, string> = {
  en: 'en-US',
  'pt-BR': 'pt-BR',
};

export const giscusLangs: Record<ArticleLang, string> = {
  en: 'en',
  'pt-BR': 'pt',
};

export function articleUrl(id: string): string {
  return `/articles/${id}/`;
}

export function findAlternateArticle(
  articles: CollectionEntry<'articles'>[],
  current: CollectionEntry<'articles'>,
): CollectionEntry<'articles'> | undefined {
  const { translationId, lang } = current.data;
  return articles.find(
    (article) =>
      article.data.translationId === translationId &&
      article.data.lang !== lang &&
      (isDevPreview() || !article.data.draft),
  );
}

export function filterArticlesForListing(
  articles: CollectionEntry<'articles'>[],
  lang: ArticleLang = defaultArticleLang,
): CollectionEntry<'articles'>[] {
  return articles.filter((article) => article.data.lang === lang);
}
