import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import {getBlogPostsGroupedByYear} from '../helpers/getPosts';

const Posts = (props) => {
  const posts = props.posts || {};

  const postsByYear = (year) => {
    let yearPosts = posts[year];

    return yearPosts.map((post) => {
      return (
        <li key={post.id}>
          <Link href={'/post/' + post.slug} legacyBehavior>
            <a>{post.title}</a>
          </Link>
        </li>
      );
    });
  };

  const renderedPosts = Object.keys(posts)
    .sort((a, b) => {
      return b - a;
    })
    .map((year) => {
      return (
        <div key={year}>
          <h3>{year}</h3>
          <ul>{postsByYear(year)}</ul>
          <style jsx>{`
            h3 {
              font-size: 20px;
            }
          `}</style>
        </div>
      );
    });

  return (
    <Layout title="Thoughts" center>
      <div className="home">
        <h1>Thoughts</h1>
        <div className="list">{renderedPosts}</div>
      </div>
      <style jsx>{`
        .list {
        }
      `}</style>
    </Layout>
  );
};

export default Posts;

export const getStaticProps = async () => {
  return {
    props: {
      posts: getBlogPostsGroupedByYear(),
    },
  };
};
