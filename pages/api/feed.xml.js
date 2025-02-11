import { generateFeed } from '../../helpers/feed';

export default function handler(req, res) {
  const feed = generateFeed();
  res.setHeader('Content-Type', 'application/xml');
  res.write(feed.rss2());
  res.end();
}
