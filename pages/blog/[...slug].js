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
        url: `/post/${slug}`,
      };
    }
  }

  render() {
    return (
      <>
        <meta http-equiv="refresh" content={'0; url=' + this.props.url}></meta>
      </>
    );
  }
}

export default Post;
