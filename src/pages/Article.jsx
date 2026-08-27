import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Markdown from 'react-markdown';
import { Clock, Crown, Share2, Link2 } from 'lucide-react';
import { getArticleBySlug, getArticlesIndex } from '../utils/loadArticles';
import ArticleCard from '../components/ArticleCard';

export default function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [faqOpen, setFaqOpen] = useState({});

  useEffect(() => {
    setLoading(true);
    getArticleBySlug(slug).then(data => {
      setArticle(data);
      if (data) {
        getArticlesIndex().then(all => {
          const others = all.filter(a => a.category === data.category && a.slug !== slug).slice(0, 3);
          setRelated(others);
        });
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!article) return <div className="py-20 text-center text-muted">Article not found.</div>;

  const currentUrl = `https://vitalpuls.com/article/${article.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "image": [article.heroImage],
    "datePublished": article.publishDate,
    "author": [{ "@type": "Person", "name": article.author.name }]
  };

  const faqSchema = article.faq?.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  } : null;

  const toggleFaq = (i) => setFaqOpen(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <>
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        {article.keywords && <meta name="keywords" content={article.keywords.join(', ')} />}
        <link rel="canonical" href={currentUrl} />
        <meta property="og:title" content={article.metaTitle} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:image" content={article.heroImage} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.metaTitle} />
        <meta name="twitter:description" content={article.metaDescription} />
        <meta name="twitter:image" content={article.heroImage} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to={`/category/${article.category.toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary capitalize">{article.category}</Link>
          <span>/</span>
          <span className="text-text truncate max-w-[200px]">{article.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Link to={`/category/${article.category.toLowerCase().replace(/ /g, '-')}`} className="bg-primary-light text-primary text-xs font-bold px-3 py-1 rounded-full">
              {article.category}
            </Link>
            {article.isPremium && (
              <span className="flex items-center gap-1 bg-premium text-white text-xs font-bold px-3 py-1 rounded-full">
                <Crown className="w-3 h-3" /> Premium
              </span>
            )}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-text leading-tight mb-6">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <img src={article.author.avatar} alt={article.author.name} className="w-11 h-11 rounded-full object-cover border-2 border-gray-100" loading="lazy" />
              <div>
                <div className="font-semibold text-text text-sm">{article.author.name}</div>
                <div className="text-xs text-muted">{new Date(article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
            </div>
            {article.readTime && (
              <span className="flex items-center gap-1 text-xs text-muted ml-auto">
                <Clock className="w-3.5 h-3.5" /> {article.readTime} read
              </span>
            )}
          </div>
        </header>

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden mb-10 shadow-md">
          <img src={article.heroImage} alt={article.heroImageAlt || article.title} className="w-full aspect-video object-cover" loading="lazy" />
        </div>

        {/* Premium notice */}
        {article.isPremium && (
          <div className="bg-premium-light border border-purple-200 rounded-2xl p-6 mb-8 flex items-center gap-4">
            <Crown className="w-8 h-8 text-premium shrink-0" />
            <div>
              <p className="font-bold text-premium">Premium Article</p>
              <p className="text-sm text-muted">This article is for VitalPuls Premium members. <Link to="/premium" className="text-premium underline">Unlock now →</Link></p>
            </div>
          </div>
        )}

        {/* Intro */}
        <div className="prose prose-green prose-lg max-w-none mb-12">
          <div className="text-gray-700 leading-relaxed space-y-4">
            <Markdown>{article.intro}</Markdown>
          </div>
        </div>

        {/* Sections */}
        {article.sections.map((section, idx) => (
          <section key={idx} className="mb-14">
            <h2 className="font-serif text-3xl font-bold text-text mb-6">{section.heading}</h2>
            {section.image && (
              <div className="rounded-2xl overflow-hidden mb-6 shadow-sm">
                <img src={section.image} alt={section.imageAlt || section.heading} className="w-full object-cover" loading="lazy" />
              </div>
            )}
            <div className="prose prose-lg max-w-none text-gray-700">
              <Markdown components={{
                a: ({ node, ...props }) => (
                  <Link to={props.href} className="text-primary font-semibold hover:underline" {...props} />
                )
              }}>{section.body}</Markdown>
            </div>
          </section>
        ))}

        {/* Social Share */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-semibold text-text">Share this article</p>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-700 transition">
              <Share2 className="w-4 h-4" /> Facebook
            </button>
            <button className="flex items-center gap-2 bg-sky-500 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-sky-600 transition">
              <Share2 className="w-4 h-4" /> Twitter
            </button>
            <button className="flex items-center gap-2 bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-300 transition">
              <Link2 className="w-4 h-4" /> Copy Link
            </button>
          </div>
        </div>

        {/* FAQ Accordion */}
        {article.faq?.length > 0 && (
          <div className="mb-14">
            <h2 className="font-serif text-3xl font-bold text-text mb-8">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {article.faq.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between text-left px-6 py-5 font-semibold text-text hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFaq(idx)}
                  >
                    <span>{item.question}</span>
                    <span className="text-primary text-xl ml-4">{faqOpen[idx] ? '−' : '+'}</span>
                  </button>
                  {faqOpen[idx] && (
                    <div className="px-6 pb-5 text-muted text-sm leading-relaxed border-t border-gray-100 pt-4">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        <div className="bg-primary-light rounded-2xl p-6 flex gap-5 items-start">
          <img src={article.author.avatar} alt={article.author.name} className="w-16 h-16 rounded-full object-cover border-4 border-white shadow shrink-0" loading="lazy" />
          <div>
            <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">About the Author</p>
            <p className="font-bold text-text">{article.author.name}</p>
            <p className="text-sm text-muted mt-1">{article.author.bio}</p>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="bg-white border-t border-gray-100 py-16 mt-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold mb-10">More Articles on This Topic</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map(rel => <ArticleCard key={rel.slug} article={rel} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
