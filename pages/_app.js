import React from 'react';
import App from 'next/app';

export default class Kenneth extends App {
  render() {
    const {Component, pageProps} = this.props;

    let renderProps = {...pageProps};

    return <Component {...renderProps} />;
  }
}
