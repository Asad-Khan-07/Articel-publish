import { Helmet } from 'react-helmet-async';
import PricingTable from '../components/PricingTable';
import { Crown, Check, Star, Shield, BookOpen, Utensils, Zap } from 'lucide-react';

const features = [
  { icon: BookOpen, title: '500+ Premium Articles', desc: 'In-depth analyses, exclusive content and expert knowledge you won\'t find anywhere else.' },
  { icon: Utensils, title: '1,000+ Recipes', desc: 'Healthy, delicious recipes categorized by diet, nutrients, and health goals.' },
  { icon: Zap, title: 'Personalized Health Plan', desc: 'Tailored recommendations based on your goals and preferences.' },
  { icon: Shield, title: 'Ad-Free', desc: 'No banners, no popups. Just pure, focused content.' },
];

export default function Premium() {
  return (
    <>
      <Helmet>
        <title>VitalPuls Premium | Exclusive Health Content</title>
        <meta name="description" content="Become a VitalPuls Premium member. 500+ exclusive articles, recipe database, personalized plan. Try 30 days for free." />
      </Helmet>

      {/* Hero */}
      <section className="premium-gradient text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <Crown className="w-14 h-14 mx-auto mb-5 text-yellow-300" />
          <h1 className="font-serif text-5xl font-bold mb-5">VitalPuls Premium</h1>
          <p className="text-xl text-purple-200 mb-8 max-w-xl mx-auto">
            The best of health science — curated for you, evidence-based and completely ad-free.
          </p>
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-full text-lg mb-4">
            <Star className="w-5 h-5 fill-current" />
            30 days free · No credit card required
          </div>
          <p className="text-purple-300 text-sm">Then just $9.99/month. Cancel anytime.</p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="font-serif text-4xl font-bold text-center text-text mb-14">What you get</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex gap-5">
              <div className="w-12 h-12 bg-premium-light rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-premium" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-text mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <PricingTable />

      {/* Trust */}
      <section className="max-w-3xl mx-auto px-4 pb-20 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Shield, text: 'SSL-secured & GDPR-compliant' },
            { icon: Check, text: 'Cancel anytime, no subscription traps' },
            { icon: Star, text: '4.9/5 from over 1,200 reviews' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center justify-center gap-2 text-sm text-muted bg-white rounded-xl py-4 px-5 border border-gray-100">
              <Icon className="w-4 h-4 text-primary shrink-0" />
              {text}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
