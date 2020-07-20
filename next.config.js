module.exports = {
  webpack: (config, {isServer}) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    return config;
  },

  async exportPathMap() {
    let getBlogPosts = require('./helpers/getPosts').getBlogPosts;

    const postList = getBlogPosts();
    const moment = require('moment');

    // tranform the list of posts into a map of pages with the pathname `/post/:id`
    const pages = postList.reduce(
      (pages, post) =>
        Object.assign({}, pages, {
          [`/post/${post.slug}`]: {page: '/post/[...slug]'},
          [`/blog/${moment(post.data.date).format('YYYY/MM/DD')}/${
            post.slug
          }`]: {page: '/blog/[...slug]'},
        }),
      {},
    );

    // combine the map of post pages with the home
    return Object.assign({}, pages, {
      '/': {page: '/'},
      '/about': {page: '/about'},
      '/posts': {page: '/posts'},
      '/projects': {page: '/projects'},
      '/speaking': {page: '/speaking'},
      '/chat': {page: '/chat'},
    });
  },
};
