import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getArticlesIndex } from '../utils/loadArticles';
import ArticleCard from '../components/ArticleCard';
import CategoryNav from '../components/CategoryNav';
import Newsletter from '../components/Newsletter';
import PricingTable from '../components/PricingTable';
import { Award, Users, BookOpen, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Users, value: '42,000+', label: 'Monthly Readers' },
  { icon: BookOpen, value: '500+', label: 'Articles' },
  { icon: Award, value: '12', label: 'Expert Authors' },
  { icon: TrendingUp, value: '98%', label: 'Reader Satisfaction' },
];

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticlesIndex().then(setArticles);
  }, []);

  const [featured, ...rest] = articles;

  return (
    <>
      <Helmet>
        <title>VitalPuls | Your Health Blog for a Better Life</title>
        <meta name="description" content="Evidence-based health tips on nutrition, fitness, sleep and mental health. Trusted by over 42,000 readers." />
        <meta property="og:title" content="VitalPuls | Health Blog" />
        <meta property="og:description" content="Evidence-based health tips for a better life." />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-gradient text-white py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            🌱 Evidence-Based · Easy to Understand · Independent
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Live Healthier —<br />
            <span className="text-green-300">with Knowledge.</span>
          </h1>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            VitalPuls delivers science-backed health tips on nutrition, fitness, sleep and mental wellbeing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#articles" className="bg-white text-primary font-bold px-8 py-4 rounded-full hover:bg-green-50 transition-colors text-lg">
              Explore Articles
            </a>
            <a href="/premium" className="border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors text-lg">
              Try Premium ✦
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-bold text-xl text-text">{value}</div>
                <div className="text-xs text-muted">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Navigation */}
      <CategoryNav />

      {/* Featured Article */}
      {featured && (
        <section className="max-w-6xl mx-auto px-4 pb-10" id="articles">
          <h2 className="font-serif text-3xl font-bold mb-6 text-text">Featured Article</h2>
          <ArticleCard article={featured} featured />
        </section>
      )}

      {/* Article Grid */}
      {articles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl font-bold text-text">Latest Articles</h2>
            <a href="/category/nutrition" className="text-sm text-primary font-semibold hover:underline">View all →</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Trust Section */}
      <section className="bg-white py-16 px-4 my-10 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted uppercase tracking-widest font-semibold mb-8">As Seen In</p>
          <div className="flex flex-wrap justify-center items-center gap-10 opacity-40 grayscale">
            {['Forbes', 'WebMD', 'Healthline', 'TIME', 'Men\'s Health'].map(name => (
              <span key={name} className="font-serif font-bold text-2xl text-gray-500">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="font-serif text-3xl font-bold text-center mb-10">What Our Readers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Sarah K.', text: 'VitalPuls helped me completely overhaul my diet. The articles are clear and truly evidence-based.', stars: 5 },
            { name: 'Thomas M.', text: 'The sleep article was a game-changer for me. I now sleep 1.5 hours more every night!', stars: 5 },
            { name: 'Julia R.', text: 'Premium is absolutely worth it. The recipe database alone justifies the price. Highly recommended!', stars: 5 },
          ].map(t => (
            <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-yellow-400 text-lg mb-3">{'★'.repeat(t.stars)}</div>
              <p className="text-muted text-sm leading-relaxed mb-4">"{t.text}"</p>
              <div className="font-semibold text-text text-sm">— {t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <PricingTable />

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
