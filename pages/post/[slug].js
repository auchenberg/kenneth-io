import React from 'react';
import Layout from '../../components/layout';
import Markdoc from '@markdoc/markdoc';
import path from 'path';
import fs from 'fs';
import Prism from 'prismjs';

import "prismjs/components/prism-cshtml";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-markdown";

import { getBlogPostBySlug, getBlogPosts } from '../../helpers/getPosts';

import { EmbeddedTweet, TweetNotFound } from 'react-tweet';
import { getTweet } from 'react-tweet/api';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { InstagramEmbed } from 'react-social-media-embed';
import 'prismjs/themes/prism.css';

const markDocConfig = {
  nodes: {
    table: {
      render: 'Table'
    },
    fence: {
      render: 'CodeBlock',
      attributes: {
        language: {
          type: String,
          default: 'text',
        },
        source: {
          type: String,
        },
        content: { type: String },
      },
    },
  },
  tags: {
    tweet_embed: {
      render: 'Tweet',
      description: 'Display an embedded Tweet',
      attributes: {
        id: {
          type: String,
          required: true,
        },
        width: {
          type: String,
        },
      },
    },
    references: {
      render: 'References',
      description: 'Display a list of references',
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
    }
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
  // Tweet is provided per-render inside the Post component so it can close
  // over the pre-fetched tweet data from getStaticProps.
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
  References: ({ children }) => {
    return (
      <div className='references'>
        {children}
      </div>
    );
  },
  CodeBlock: ({ language, children, source }) => {

    let content = Prism.highlight(children, Prism.languages[language], language);

    return (
      <div className="code-block">
        <pre className="">
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </pre>
        {
          path && (
            <div className="source-link text-center">
              Source: <a href={source} target="_blank">{source}</a>
            </div>
          )
        }
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

function collectTweetIds(node, acc = []) {
  if (!node) return acc;
  if (node.type === 'tag' && node.tag === 'tweet_embed' && node.attributes?.id) {
    acc.push(String(node.attributes.id));
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) collectTweetIds(child, acc);
  }
  return acc;
}

// react-tweet's renderer iterates entities.{hashtags,urls,user_mentions,symbols}
// without null-checks. Tweets without those entities come back from the
// syndication API with the keys missing, which crashes the renderer. Fill the
// missing arrays, including on any quoted tweet.
function fillEntities(entities) {
  return {
    hashtags: [],
    urls: [],
    user_mentions: [],
    symbols: [],
    ...(entities ?? {}),
  };
}

function sanitizeTweet(tweet) {
  if (!tweet) return tweet;
  const sanitized = {
    ...tweet,
    entities: fillEntities(tweet.entities),
  };
  // getStaticProps cannot serialize undefined values; strip or sanitize.
  if (tweet.quoted_tweet) {
    sanitized.quoted_tweet = {
      ...tweet.quoted_tweet,
      entities: fillEntities(tweet.quoted_tweet.entities),
    };
  } else {
    delete sanitized.quoted_tweet;
  }
  return JSON.parse(JSON.stringify(sanitized));
}

export const getStaticProps = async (context) => {
  const slug = context.params.slug;

  let post = getBlogPostBySlug(slug);

  const POSTS_DIR = path.join(process.cwd(), 'posts');
  const fullPath = path.join(POSTS_DIR, post.fileName);
  const source = fs.readFileSync(fullPath, 'utf-8');
  const ast = Markdoc.parse(source);
  const content = JSON.stringify(Markdoc.transform(ast, markDocConfig));

  const tweetIds = [...new Set(collectTweetIds(ast))];
  const tweetsById = {};
  await Promise.all(
    tweetIds.map(async (id) => {
      try {
        const tweet = await getTweet(id);
        tweetsById[id] = sanitizeTweet(tweet) ?? null;
      } catch (err) {
        tweetsById[id] = null;
      }
    })
  );

  let paddedPost = {
    ...post,
    content,
  };

  return {
    props: {
      post: paddedPost,
      tweetsById,
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

  const tweetsById = props.tweetsById ?? {};
  const components = {
    ...markDocComponents,
    Tweet: ({ id, width }) => {
      const tweet = tweetsById[id];
      return (
        <div className="tweet-embed light" style={width ? { maxWidth: width, margin: '0 auto' } : undefined}>
          {tweet ? <EmbeddedTweet tweet={tweet} /> : <TweetNotFound />}
        </div>
      );
    },
  };

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
            components,
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

        :global(.post) {
            overflow-wrap: break-word;
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
          --tweet-body-font-size: 13px;
          --tweet-body-line-height: 1.2;
          --tweet-header-font-size: 11px;
          --tweet-info-font-size: 11px;
          --tweet-quoted-body-font-size: 11px;
          --tweet-replies-font-size: 11px;
          --tweet-actions-icon-size: 11px;
          --tweet-actions-font-size: 11px;
          margin: 30px auto;
        }

        :global(.react-tweet-theme img) {
         margin: 0;
        }  

        :global(.code-block) {
                 margin: 20px 0;
        }

        :global(.code-block pre) {
          background: #f6f8fa;
          padding: 20px;
          border-radius: 5px;
          overflow: auto;
          font-size: 14px;
        }

        :global(.code-block pre code) {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
          font-size: 12px;
          line-height: 1;
        }

        :global(.code-block .source-link) {
          font-size: 12px;
        } 

        :global(.references ul) {
          padding-left: 20px;
        }        

        :global(.references ul li) {
          margin-bottom: 5px;
        }

      `}</style>
    </Layout>
  );
};

export default Post;
