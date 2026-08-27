import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getArticlesIndex } from '../utils/loadArticles';
import ArticleCard from '../components/ArticleCard';

export default function Category() {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');

  useEffect(() => {
    getArticlesIndex().then(all => {
      const filtered = all.filter(a => a.category.toLowerCase() === category.replace(/-/g, ' ').toLowerCase());
      setArticles(filtered);
    });
  }, [category]);

  return (
    <>
      <Helmet>
        <title>{categoryName} – Articles | VitalPuls</title>
        <meta name="description" content={`All VitalPuls articles on ${categoryName}. Evidence-based and easy to understand.`} />
      </Helmet>

      <div className="bg-primary-light py-14 px-4 border-b border-green-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl font-bold text-text capitalize mb-2">{categoryName}</h1>
          <p className="text-muted">{articles.length} article{articles.length !== 1 ? 's' : ''} found</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted text-lg">No articles in this category yet.</p>
            <p className="text-muted text-sm mt-2">Check back soon — new content drops every week!</p>
          </div>
        )}
      </div>
    </>
  );
}
