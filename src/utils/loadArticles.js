export const getArticlesIndex = async () => {
  const data = await import('../content/articles-index.json');
  return data.default || data;
};

export const getArticleBySlug = async (slug) => {
  try {
    const data = await import(`../content/articles/${slug}.json`);
    return data.default || data;
  } catch (error) {
    console.error(`Error loading article ${slug}:`, error);
    return null;
  }
};

