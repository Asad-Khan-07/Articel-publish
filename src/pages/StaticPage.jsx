import { Helmet } from 'react-helmet-async';

const content = {
  'About Us': `
VitalPuls was founded in 2022 with a clear goal: to make health information understandable, evidence-based, and accessible to everyone. In a world full of half-truths and viral myths, we want to be a reliable compass.

Our team consists of doctors, nutritionists, psychologists, and experienced journalists. Every article is researched according to scientific standards, reviewed by experts, and presented clearly.

**Not a substitute for medical advice.** Our content is for general information purposes only. Always consult a doctor if you have health concerns.
  `,
  Imprint: `
**Information according to § 5 TMG:**

VitalPuls GmbH
Sample Street 1
10115 Berlin

Managing Director: Max Mustermann
Email: info@vitalpuls.com
Phone: +49 30 12345678

**Register entry:**
Commercial Register: HRB 123456 B
Register Court: District Court Berlin-Charlottenburg

**VAT Identification Number according to § 27 a Value Added Tax Act:**
DE123456789
  `,
  'Privacy Policy': `
**Privacy Policy**

The protection of your personal data is very important to us. This privacy policy informs you about the type, scope, and purposes of processing personal data on our website.

**Responsible body:**
VitalPuls GmbH, Sample Street 1, 10115 Berlin, info@vitalpuls.com

**Hosting:**
This website is hosted by Vercel Inc., 340 Pine Street, San Francisco, CA 94104, USA.

**Cookies:**
We only use technically necessary cookies. Tracking without consent does not take place.

**Google Fonts:**
This website uses Google Fonts, which are loaded via the Google CDN. IP addresses may be transmitted to Google servers.

**Contact:**
If you have any questions about data protection, please contact: privacy@vitalpuls.com
  `,
};

export default function StaticPage({ title }) {
  const text = content[title] || `Here is the content for ${title}.`;

  return (
    <>
      <Helmet>
        <title>{title} | VitalPuls</title>
        <meta name="description" content={`${title} – VitalPuls Health Blog`} />
      </Helmet>

      <div className="bg-primary-light py-14 px-4 border-b border-green-100">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl font-bold text-text">{title}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
            {text.split('\n').map((line, i) => {
              if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
                return <p key={i} className="font-bold text-text mt-6 mb-2">{line.replace(/\*\*/g, '')}</p>;
              }
              return <p key={i} className="mb-3">{line}</p>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
