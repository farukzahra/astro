import type { CollectionEntry } from 'astro:content';

/** True while `astro dev` is running — drafts are previewable on localhost only. */
export function isDevPreview(): boolean {
  return import.meta.env.DEV;
}

export function isPublishedArticle(article: CollectionEntry<'articles'>): boolean {
  return !article.data.draft;
}

/** Published always; drafts only on localhost dev server. */
export function isVisibleArticle(article: CollectionEntry<'articles'>): boolean {
  return isPublishedArticle(article) || isDevPreview();
}

export function filterVisibleArticles(
  articles: CollectionEntry<'articles'>[],
): CollectionEntry<'articles'>[] {
  return articles.filter(isVisibleArticle);
}
