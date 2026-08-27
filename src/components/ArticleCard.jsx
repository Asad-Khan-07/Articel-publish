import { Link } from 'react-router-dom';
import { Crown, Clock } from 'lucide-react';

export default function ArticleCard({ article, featured = false }) {
  const isPremium = article.isPremium;
  const readTime = article.readTime || '5 min';

  if (featured) {
    return (
      <Link to={`/article/${article.slug}`} className="group block relative rounded-3xl overflow-hidden card-hover shadow-md">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={article.heroImage}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">{article.category}</span>
            {isPremium && <span className="premium-badge">⭐ Premium</span>}
          </div>
          <h3 className="font-serif text-2xl font-bold mb-2 leading-tight">{article.title}</h3>
          <p className="text-white/80 text-sm line-clamp-2">{article.excerpt}</p>
          <div className="mt-3 flex items-center gap-3 text-white/60 text-xs">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readTime}</span>
            <span>{new Date(article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden card-hover shadow-sm border border-gray-100">
      <div className="aspect-[16/9] overflow-hidden relative">
        <img
          src={article.heroImage}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isPremium && (
          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1 bg-premium/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              <Crown className="w-3 h-3" /> Premium
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-primary text-xs font-bold uppercase tracking-wider">{article.category}</span>
        <h3 className="font-serif text-lg font-bold mt-2 mb-2 text-text group-hover:text-primary transition-colors line-clamp-2 flex-grow">
          {article.title}
        </h3>
        <p className="text-muted text-sm line-clamp-2 mb-4">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-muted border-t border-gray-100 pt-3">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readTime}</span>
          <span>{new Date(article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
    </Link>
  );
}
