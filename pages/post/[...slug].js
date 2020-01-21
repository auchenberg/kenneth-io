import React from 'react';
import Link from 'next/link';
import Layout from '../../components/layout';
import moment from 'moment';

import {getBlogPostBySlug} from '../../helpers/getPosts';

class Post extends React.Component {
  static async getInitialProps(params) {
    if (typeof window === 'undefined') {
      let path = params.asPath;
      let pathParts = path.split('/');

      let slug = pathParts[pathParts.length - 1];

      return {
        post: getBlogPostBySlug(slug),
      };
    }
  }

  render() {
    if (!this.props.post) {
      return <>Not found</>;
    }

    let formattedData = moment(this.props.post.data.date).format('MMMM YYYY');

    return (
      <Layout title="Post" center>
        <div className="post">
          <header>
            <h1>{this.props.post.data.title}</h1>
            <p className="date">{formattedData}</p>
          </header>
          <div
            className="content"
            dangerouslySetInnerHTML={{__html: this.props.post.html}}
          ></div>
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
        `}</style>
      </Layout>
    );
  }
}

export default Post;
