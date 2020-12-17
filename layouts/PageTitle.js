import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";

const PageTitle = () => {
  const pageTitle = useSelector(({ session }) => session.title);

  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  );
}

export default PageTitle;
