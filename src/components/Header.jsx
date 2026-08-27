import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Heart, Menu, X, Crown, Search } from 'lucide-react';

const categories = [
  { label: 'Nutrition', path: 'nutrition' },
  { label: 'Fitness', path: 'fitness' },
  { label: 'Mental Health', path: 'mental-health' },
  { label: 'Prevention', path: 'prevention' },
  { label: 'Sleep', path: 'sleep' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      {/* Premium top bar */}
      <div className="premium-gradient text-white text-center py-1.5 text-xs font-medium tracking-wide">
        <Crown className="inline-block w-3 h-3 mr-1 mb-0.5" />
        VitalPuls Premium — Try free for 30 days!
        <Link to="/premium" className="ml-2 underline hover:no-underline">Learn more →</Link>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="font-serif text-2xl font-bold text-primary">VitalPuls</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {categories.map(cat => (
              <NavLink
                key={cat.path}
                to={`/category/${cat.path}`}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-text hover:text-primary'}`
                }
              >
                {cat.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors">
              <Search className="w-4 h-4 text-muted" />
            </button>
            <Link
              to="/premium"
              className="hidden md:flex items-center gap-1.5 bg-premium text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
            >
              <Crown className="w-3.5 h-3.5" />
              Premium
            </Link>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {categories.map(cat => (
            <Link
              key={cat.path}
              to={`/category/${cat.path}`}
              className="block text-sm font-medium text-text hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {cat.label}
            </Link>
          ))}
          <Link to="/premium" className="flex items-center gap-1.5 bg-premium text-white text-sm font-semibold px-4 py-2 rounded-full w-fit">
            <Crown className="w-3.5 h-3.5" /> Premium
          </Link>
        </div>
      )}
    </header>
  );
}
