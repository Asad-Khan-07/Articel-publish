import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://vitalpuls.com'; // Change to real domain

const generateSitemap = () => {
  const indexPath = path.join(__dirname, '../src/content/articles-index.json');
  let articles = [];
  
  if (fs.existsSync(indexPath)) {
    const rawData = fs.readFileSync(indexPath, 'utf-8');
    articles = JSON.parse(rawData);
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/imprint</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${BASE_URL}/privacy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${BASE_URL}/premium</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

  // Categories could be extracted from articles, but for now we'll just map from existing articles
  const categories = [...new Set(articles.map(a => a.category))];
  categories.forEach(cat => {
    xml += `  <url>
    <loc>${BASE_URL}/category/${encodeURIComponent(cat.toLowerCase().replace(/ /g, '-'))}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
  });

  articles.forEach(article => {
    xml += `  <url>
    <loc>${BASE_URL}/article/${article.slug}</loc>
    <lastmod>${new Date(article.publishDate).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  });

  xml += `</urlset>`;

  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf-8');
  console.log('Sitemap generated successfully!');
};

generateSitemap();
