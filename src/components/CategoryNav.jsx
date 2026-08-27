import { Shield, BookOpen, Utensils, Brain, Moon, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Nutrition', path: 'nutrition', icon: Utensils, color: 'bg-green-50 text-green-600 border-green-100' },
  { name: 'Fitness', path: 'fitness', icon: Activity, color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { name: 'Mental Health', path: 'mental-health', icon: Brain, color: 'bg-purple-50 text-purple-600 border-purple-100' },
  { name: 'Prevention', path: 'prevention', icon: Shield, color: 'bg-red-50 text-red-600 border-red-100' },
  { name: 'Sleep', path: 'sleep', icon: Moon, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  { name: 'Wellness', path: 'wellness', icon: BookOpen, color: 'bg-amber-50 text-amber-600 border-amber-100' },
];

export default function CategoryNav() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="font-serif text-3xl font-bold text-center mb-8 text-text">Browse Topics</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.path}
              to={`/category/${cat.path}`}
              className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all hover:scale-105 hover:shadow-md ${cat.color}`}
            >
              <Icon className="w-7 h-7" />
              <span className="text-sm font-semibold text-center">{cat.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
