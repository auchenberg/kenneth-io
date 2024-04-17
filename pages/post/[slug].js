import React from 'react';
import Layout from '../../components/layout';
import Markdoc from '@markdoc/markdoc';
import path from 'path';
import fs from 'fs';

import { getBlogPostBySlug, getBlogPosts } from '../../helpers/getPosts';

import { Tweet } from 'react-tweet'

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { InstagramEmbed } from 'react-social-media-embed';

const markDocConfig = {
  nodes: {
    table: {
      render: 'Table'
    }
  },
  tags: {
    tweet_embed: {
      render: 'Tweet',
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
  Tweet: ({ id }) => {
    return (
      <div className="tweet-embed light">
        <Tweet id={id}></Tweet>
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
  Table: ({ children }) => {
    return (
      <div className='table-wrap'>
        <table>
          {children}
        </table>
      </div>
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

  let socialImageUrl = post.og_image;

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

        :global(.post ul> li) {
          margin-bottom: 20px;
        }
        
        :global(.post table) {    
          width: 150%;
          margin-left: -25%;     
          padding: 20px;             

          border: 1px solid black;
          border-collapse: collapse;
          border-spacing: 0;
        }

        :global(.post table thead th) {
          border: 1px solid black;
          padding: 10px;
        }           

        :global(.post table tr) {
          border: 1px solid black;
        }        

        :global(.post table td) {
          border: 1px solid black;
          padding: 10px;
          vertical-align: top;
        }     
        
        :global(.post table td ul) {
          padding: 0 12px;
        }    
        
        @media (max-width: 800px) {
          :global(.post .table-wrap) {
            overflow-x: auto;
          }

          :global(.post table) {
            width: 100%;
            margin-left: 0;
          }
        }        

        :global(.react-tweet-theme) {
          --tweet-body-font-size: 14px;
          --tweet-body-line-height: 1.2;
          --tweet-header-font-size: 12px;
          --tweet-info-font-size: 12px;
          --tweet-quoted-body-font-size: 12px;
          --tweet-replies-font-size: 12px;
          --tweet-actions-icon-size: 12px;
          --tweet-actions-font-size: 12px;
          margin: 30px auto;
        }   

        :global(.react-tweet-theme img) {
         margin: 0;
        }  
        
      `}</style>
    </Layout>
  );
};

export default Post;
