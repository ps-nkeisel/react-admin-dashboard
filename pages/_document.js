import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import * as Sentry from "@sentry/browser";

if (process.env.NODE_ENV !== 'development') {
  process.on('unhandledRejection', (err) => {
    Sentry.captureException(err);
  });
  
  process.on('uncaughtException', (err) => {
    Sentry.captureException(err);
  });
}


class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="icon" type="image/ico" href="/static/images/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.4/jquery-jvectormap.css"
            type="text/css"
            media="screen"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
