import { getBlogPosts } from '../helpers/getPosts';
import { SITE_URL } from '../helpers/seo';

const staticPaths = [
  '/',
  '/about',
  '/press',
  '/posts',
  '/speaking',
  '/projects',
  '/lists',
  '/objects',
  '/travel',
  '/travel/copenhagen',
  '/travel/new-york',
];

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const renderUrl = (path) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>
  </url>`;

const buildSitemap = () => {
  const postPaths = getBlogPosts()
    .filter((post) => post.published)
    .map((post) => `/post/${post.slug}`);
  const paths = [...staticPaths, ...postPaths];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(renderUrl).join('\n')}
</urlset>`;
};

const Sitemap = () => null;

export const getServerSideProps = async ({ res }) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=604800'
  );
  res.end(buildSitemap());

  return { props: {} };
};

export default Sitemap;
