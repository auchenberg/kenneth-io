import React from 'react';
import Head from 'next/head';

export default class ChatPage extends React.Component {
  constructor() {
    super();
    this.redirectUrl = 'https://calendly.com/auchenberg/30min';
  }

  // Redirects on the client with JavaScript if no server
  componentDidMount() {
    window.location.href = this.redirectUrl;
  }

  render() {
    return (
      <>
        <Head>
          {/* Redirects with meta refresh if no JavaScript support */}
          <noscript>
            <meta httpEquiv="refresh" content={`0;url=${this.redirectUrl}`} />
          </noscript>
          <link rel="canonical" href={this.redirectUrl} />
        </Head>
        <p>
          Redirecting to <a href={this.redirectUrl}>{this.redirectUrl}</a>
          &hellip;
        </p>
      </>
    );
  }
}
