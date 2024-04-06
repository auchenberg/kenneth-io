import React from 'react';
import Layout from '../../components/layout';
import Markdoc from '@markdoc/markdoc';
import path from 'path';
import fs from 'fs';

import { getBlogPostBySlug, getBlogPosts } from '../../helpers/getPosts';

import { TwitterTweetEmbed } from 'react-twitter-embed';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { InstagramEmbed } from 'react-social-media-embed';

const markDocConfig = {
  tags: {
    tweet_embed: {
      render: 'TweetEmbed',
      description: 'Display an embedded Tweet',
    },
    image: {
      render: 'ZoomableImage',
      description: 'Display a zoomable image',
      attributes: {
        src: {
          type: String,
          required: true,
        },
        title: {
          type: String,
        },
      },
    },
    youtube: {
      render: 'YouTubeEmbed',
      description: 'Display a embedded YouTube ',
      attributes: {
        src: {
          type: String,
          required: true,
        },
        width: {
          type: String,
        },
        height: {
          type: String,
        },
      },
    },
    instagram: {
      render: 'InstagramEmbed',
      description: 'Display an embedded Instagram',
      attributes: {
        url: {
          type: String,
          required: true,
        },
      },
    },
  },
};

const markDocComponents = {
  InstagramEmbed: ({ url }) => {
    return (
      <div className="instagram-embed">
        <InstagramEmbed url={url} />
      </div>
    );
  },
  TweetEmbed: ({ id }) => {
    return (
      <div className="tweet-embed">
        <TwitterTweetEmbed tweetId={id}></TwitterTweetEmbed>
      </div>
    );
  },
  ZoomableImage: ({ src, title }) => {
    return (
      <Zoom>
        <img src={src} title={title} />
      </Zoom>
    );
  },
  YouTubeEmbed: ({ src, width, height }) => {
    return (
      <figure>
        <iframe
          width={width}
          height={height}
          src={src}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </figure>
    );
  },
};

export const getStaticPaths = async () => {
  let allPosts = getBlogPosts();

  const paths = allPosts.map((post) => {
    return { params: { slug: `${post.slug}` } };
  });

  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const slug = context.params.slug;

  let post = getBlogPostBySlug(slug);

  const POSTS_DIR = path.join(process.cwd(), 'posts');
  const fullPath = path.join(POSTS_DIR, post.fileName);
  const source = fs.readFileSync(fullPath, 'utf-8');
  const ast = Markdoc.parse(source);
  const content = JSON.stringify(Markdoc.transform(ast, markDocConfig));

  let paddedPost = {
    ...post,
    content,
  };

  return {
    props: {
      post: paddedPost,
    },
  };
};

const Post = (props) => {
  if (!props.post) {
    return <>Not found</>;
  }

  let post = props.post;
  let parsedContent = JSON.parse(post.content);
  let socialImageUrl = 'https://kenneth.io/' + post.og_image;

  return (
    <Layout
      title={post.title}
      socialImage={socialImageUrl}
      description={post.description}
      center
    >
      <div className="post">
        <header>
          <h1>{post.title}</h1>
          <p className="date">{post.date}</p>
        </header>
        <div className="content">
          {Markdoc.renderers.react(parsedContent, React, {
            components: markDocComponents,
          })}
        </div>
      </div>
      <style jsx>{`
        .post h1 {
          font-size: 30px;
        }

        .post header {
          margin-bottom: 30px;
        }

        :global(.post img),
        :global(.post iframe) {
          width: 100%;
          max-width: 100%;
          margin: 20px 0;
        }

        :global(.post h2) {
          font-size: 20px;
          margin-top: 30px;
          margin-bottom: 20px;
        }

        :global(.post h3) {
          font-size: 16px;
          margin-top: 30px;
          margin-bottom: 20px;
        }

        :global(.post blockquote) {
          padding: 10px;
          font-size: 16px;
          margin: 0;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
