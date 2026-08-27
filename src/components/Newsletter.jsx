import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-primary-light py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Mail className="w-7 h-7 text-white" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-text mb-3">Your Weekly Health Newsletter</h2>
        <p className="text-muted mb-2">
          Evidence-based tips, new articles and exclusive insights — delivered fresh to your inbox every week.
        </p>
        <p className="text-xs text-muted/70 mb-8">Already <strong>12,000+</strong> readers on board. No spam, unsubscribe anytime.</p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 bg-primary text-white py-4 px-8 rounded-2xl text-lg font-medium">
            <CheckCircle className="w-6 h-6" />
            Thank you! You're subscribed! 🎉
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-grow px-5 py-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <button
              type="submit"
              className="bg-primary text-white font-semibold px-7 py-3.5 rounded-2xl hover:bg-primary-dark transition-colors shrink-0"
            >
              Subscribe for Free
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
