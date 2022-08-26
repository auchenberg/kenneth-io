import React from 'react';
import {DefaultSeo} from 'next-seo';

function MyApp({Component, pageProps}) {
  return <Component {...pageProps} />;
}

export default MyApp;
