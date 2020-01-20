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
          </>
        );
      });

    return (
      <Layout title="Posts">
        <div className="home">
          <h1>Posts</h1>
          {posts}
        </div>
        <style jsx>{`
          @keyframes wave-animation {
            0% {
              transform: rotate(0deg);
            }
            10% {
              transform: rotate(-10deg);
            }
            20% {
              transform: rotate(50deg);
            }
            30% {
              transform: rotate(-10deg);
            }
            40% {
              transform: rotate(9deg);
            }
            50% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }

          h1 {
            font-size: 35px;
            font-weight: 600;
          }

          h2 {
            font-size: 16px;
            width: 70%;
          }

          .wave {
            animation-name: wave-animation;
            animation-duration: 2.5s;
            animation-iteration-count: infinite;
            transform-origin: 70% 70%;
            display: inline-block;
          }
        `}</style>
      </Layout>
    );
  }
}
