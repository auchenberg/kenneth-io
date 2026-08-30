import React from 'react';
import NextHead from 'next/head';

const serializeStructuredData = (data) =>
  JSON.stringify(data).replace(/</g, '\\u003c');

const Head = (props) => (
  <NextHead>
    <title key="title">{props.title}</title>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link
      rel="alternate"
      type="application/rss+xml"
      title="Kenneth Auchenberg's Blog RSS Feed"
      href="/api/feed.xml"
    />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossOrigin="anonymous"
    />
    {(props.structuredData || []).map((data, index) => (
      <script
        key={`structured-data-${index}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(data) }}
      />
    ))}
  </NextHead>
);

export default Head;
