import React from "react";
import { useSelector } from 'react-redux';

import TopReferrersContainer from '../components/TopReferrersContainer';
import BrowsersContainer from '../components/BrowsersContainer';
import OsContainer from '../components/OsContainer';

const RealtimeLeftBar = () => {
  const realtimeStore = useSelector(({ realtime }) => realtime);
  const { article } = realtimeStore;

  return (
    <>
      { !article.id && (
        <TopReferrersContainer />
      ) }
      <BrowsersContainer />
      <OsContainer />
    </>
  );
};

export default RealtimeLeftBar;
