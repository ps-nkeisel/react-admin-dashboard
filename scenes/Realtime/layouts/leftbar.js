import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Pane from "evergreen-ui/commonjs/layers/src/Pane";
import Alert from 'evergreen-ui/commonjs/alert/src/Alert';

import TopTagsContainer from '../components/TopTagsContainer';
import TopAuthorsContainer from '../components/TopAuthorsContainer';

import {
  updateArticle,
} from '@/services/actions/realtime';

const RealtimeLeftBar = () => {
  const dispatch = useDispatch();

  const realtimeStore = useSelector(({ realtime }) => realtime);
  const { article } = realtimeStore;

  return (
    <>
      { article.id && (
        <Pane padding={6}>
          <Alert appearance="card" intent="none" padding={6}
            title={article.title}
            isRemoveable={true}
            onRemove={() => dispatch(updateArticle({}))}
          />
        </Pane>
      ) }
      { !article.id && (
        <>
          <TopTagsContainer />
          <TopAuthorsContainer />
        </>
      ) }
    </>
  );
};

export default RealtimeLeftBar;
