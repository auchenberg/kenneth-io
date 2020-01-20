import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import {getBlogPostsGroupedByYear} from '../helpers/getPosts';

export default class Posts extends React.Component {
  static async getInitialProps() {
    if (typeof window === 'undefined') {
      return {
        posts: getBlogPostsGroupedByYear(),
      };
    }
  }

  render() {
    const postsByYear = (year) => {
      let yearPosts = this.props.posts[year];

      return yearPosts.map((post) => {
        return (
          <li key={post.id}>
            <a href={'/post/' + post.slug}>{post.data.title}</a>
          </li>
        );
      });
    };

    const posts = Object.keys(this.props.posts)
      .sort((a, b) => {
        return b - a;
      })
      .map((year) => {
        return (
          <>
            <h3>{year}</h3>
            <ul>{postsByYear(year)}</ul>
            <style jsx>{`
              h3 {
                font-size: 20px;
              }
            `}</style>
          </>
        );
      });

    return (
      <Layout title="Posts" center>
        <div className="home">
          <h1>Articles</h1>
          <div className="list">{posts}</div>
        </div>
        <style jsx>{`
          .list {
          }
        `}</style>
      </Layout>
    );
  }
}
