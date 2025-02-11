import { Feed } from 'feed';
import { getBlogPosts } from './getPosts';

export function generateFeed() {
  const posts = getBlogPosts().filter(post => post.published);
  
  const feed = new Feed({
    title: "Kenneth Auchenberg's Blog",
    description: "Thoughts on technology, software, and innovation",
    id: "https://kenneth.io/",
    link: "https://kenneth.io/",
    language: "en",
    favicon: "https://kenneth.io/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}`
  });

  posts.forEach(post => {
    feed.addItem({
      title: post.title,
      id: `https://kenneth.io/post/${post.slug}`,
      link: `https://kenneth.io/post/${post.slug}`,
      description: post.description,
      date: new Date(post.originalDate),
      content: post.content
    });
  });

  return feed;
}
