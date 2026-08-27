import { Link } from 'react-router-dom';
import { Heart, Crown } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-24">
      {/* Premium CTA banner */}
      <div className="premium-gradient">
        <div className="max-w-5xl mx-auto px-4 py-10 text-center text-white">
          <Crown className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
          <h2 className="font-serif text-3xl font-bold mb-3">Become a VitalPuls Premium Member</h2>
          <p className="text-purple-200 mb-6 max-w-xl mx-auto">
            Exclusive articles, personalized health plans, recipe database & ad-free experience.
          </p>
          <Link to="/premium" className="inline-block bg-white text-premium font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
            Start 30 days free
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-serif text-xl font-bold text-white">VitalPuls</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Your trusted portal for health, wellness and an active life. Evidence-based. Easy to understand. Premium.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/category/nutrition" className="hover:text-white transition-colors">Nutrition</Link></li>
            <li><Link to="/category/fitness" className="hover:text-white transition-colors">Fitness</Link></li>
            <li><Link to="/category/mental-health" className="hover:text-white transition-colors">Mental Health</Link></li>
            <li><Link to="/category/prevention" className="hover:text-white transition-colors">Prevention</Link></li>
            <li><Link to="/category/sleep" className="hover:text-white transition-colors">Sleep</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/imprint" className="hover:text-white transition-colors">Imprint</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/premium" className="hover:text-white transition-colors">Premium</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-2">
        <span>© 2024 VitalPuls. All rights reserved.</span>
        <span>Not medical advice — always consult a doctor.</span>
      </div>
    </footer>
  );
}
