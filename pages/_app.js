import App from "next/app";
import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/browser";

import "@/styles/index.scss";
import "@/styles/dashforge.scss";
import withReduxStore from "@/HOC/withReduxStore";

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: "https://d551be911b6c41d1914495d6d1eb0242@sentry.io/3449125",
    release: process.env.ENV === 'staging' ? `${process.env.VERSION}-DEV` : `${process.env.VERSION}-PROD`
  });
}

class MyApp extends App {
  /** Report caught errors to sentry */
  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV !== 'development') {
      Sentry.withScope(scope => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key]);
        });
  
        Sentry.captureException(error);
      });
  
      super.componentDidCatch(error, errorInfo);
    }
  }
  
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        <Head>
          <title>Vuukle Dashboard</title>
        </Head>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
