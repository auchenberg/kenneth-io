const matter = require('gray-matter');
var slug = require('slug');
let _ = require('lodash');
let moment = require('moment');

function getBlogPosts() {
  const path = require('path');

  const DIR = path.join(process.cwd(), 'posts/');

  const fs = require('fs');
  const files = fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));

  let posts = files.map((file, index) => {
    const name = path.join(DIR, file);
    const source = fs.readFileSync(name, 'utf-8');

    const matterResult = matter(source, {
      excerpt_separator: '<!--more-->',
      excerpt: true,
    });

    const {title, date} = matterResult.data;
    let slugged = slug(title).toLowerCase();

    return {
      ...matterResult.data,
      title,
      date,
      fileName: file,
      slug: slugged,
    };
  });

  // Sort the posts by date
  const sortedPosts = posts.sort((a, b) => a.date - b.date);

  // We need to format the dates into strings because Next.js expects the props to be serializable as JSON.
  const parsedDatePosts = sortedPosts.map((post) => {
    return {
      ...post,
      originalDate: moment(post.date).format('YYYY-MM-DD'),
      date: moment(post.date).format('MMMM YYYY'),
    };
  });

  return parsedDatePosts;
}

function getBlogPostsGroupedByYear() {
  let allPosts = getBlogPosts();
  let groupedPosts = _.groupBy(allPosts, (p) => {
    return new Date(p.date).getFullYear();
  });

  // Sort the posts by date
  for (let year in groupedPosts) {
    groupedPosts[year].sort((a, b) => new Date(b.originalDate) - new Date(a.originalDate));
  }

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
