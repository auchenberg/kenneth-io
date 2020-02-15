import React from 'react';
import App, {Container} from 'next/app';
import {DefaultSeo} from 'next-seo';

export default class Kenneth extends App {
  render() {
    const {Component, pageProps} = this.props;

    let renderProps = {...pageProps};

    return (
      <Container>
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'en_us',
            url: 'https://kenneth.io',
            site_name: 'Kenneth Auchenberg',
          }}
          twitter={{
            handle: '@auchenberg',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        />
        <Component {...renderProps} />;
      </Container>
    );
  }
}
