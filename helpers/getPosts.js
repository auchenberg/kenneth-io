const matter = require('gray-matter');
var slug = require('slug');
var MarkdownIt = require('markdown-it');
let _ = require('lodash');

function getBlogPosts() {
  const path = require('path');
  let md = new MarkdownIt({
    html: true,
  });

  const DIR = path.join(process.cwd(), 'posts/');

  const fs = require('fs');
  const files = fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));

  let posts = files
    .map((file, index) => {
      const name = path.join(DIR, file);
      const contents = fs.readFileSync(name, 'utf-8');

      const parsed = matter(contents, {
        excerpt_separator: '<!--more-->',
        excerpt: true,
      });

      return {
        ...parsed,
        slug: slug(parsed.data.title).toLowerCase(),
        html: md.render(parsed.content),
      };
    })
    .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

  return posts;
}

function getBlogPostsGroupedByYear() {
  let allPosts = getBlogPosts();
  let groupedPosts = _.groupBy(allPosts, (p) => {
    return new Date(p.data.date).getFullYear();
  });
  return groupedPosts;
}

function getBlogPostBySlug(slug) {
  let allPosts = getBlogPosts();

  let post = allPosts.filter((post) => {
    return post.slug == slug;
  });

  return post ? post[0] : null;
}

module.exports.getBlogPosts = getBlogPosts;
module.exports.getBlogPostBySlug = getBlogPostBySlug;
module.exports.getBlogPostsGroupedByYear = getBlogPostsGroupedByYear;
