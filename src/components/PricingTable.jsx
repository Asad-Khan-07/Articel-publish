import { Crown, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    period: '',
    color: 'border-gray-200',
    features: [
      'All public articles',
      'Weekly newsletter',
      'Basic health tips',
    ],
    cta: 'Get started free',
    ctaClass: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  },
  {
    name: 'Premium',
    price: '$9.99',
    period: '/month',
    color: 'border-purple-500',
    badge: 'Most Popular',
    features: [
      'Everything in Basic',
      '500+ exclusive premium articles',
      'Personalized health plan',
      'Recipe database (1,000+ recipes)',
      'Ad-free experience',
      'Priority support',
    ],
    cta: 'Start 30 days free',
    ctaClass: 'premium-gradient text-white hover:opacity-90',
    popular: true,
  },
  {
    name: 'Family',
    price: '$16.99',
    period: '/month',
    color: 'border-green-500',
    features: [
      'Everything in Premium',
      'Up to 5 family members',
      'Kids health section',
      'Family-wide meal plans',
    ],
    cta: 'Start Family plan',
    ctaClass: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  },
];

export default function PricingTable() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-premium-light text-premium text-sm font-bold px-4 py-2 rounded-full mb-4">
            <Crown className="w-4 h-4" /> Membership
          </span>
          <h2 className="font-serif text-4xl font-bold text-text mb-4">Choose Your Plan</h2>
          <p className="text-muted max-w-xl mx-auto">
            Invest in your health. Cancel anytime, no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-3xl border-2 ${plan.color} p-8 flex flex-col ${plan.popular ? 'shadow-xl scale-105' : 'shadow-sm'}`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 bg-premium text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    <Star className="w-3 h-3 fill-white" /> {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-serif text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-text">{plan.price}</span>
                  {plan.period && <span className="text-muted mb-1">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 flex-grow mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-muted">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <Link
                to="/premium"
                className={`block text-center font-semibold py-3 rounded-full transition-all ${plan.ctaClass}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
