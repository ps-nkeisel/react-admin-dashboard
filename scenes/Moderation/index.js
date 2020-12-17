import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import moment from "moment";

import ModerationHeader from "./components/header";
import ModerationSidebar from "./components/sidebar";
import ModerationTable from "./components/table";
import "./styles/index.scss";

import {
  loadCommentsCount,
  loadTags,
  loadModerations
} from "@/services/actions/moderation";
import { updateFilterParams } from "@/services/actions/moderation";

import { pageSizes, searchTypes } from "./constants";

const ModerationScene = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const pathname = router.pathname;
  let query = router.query;

  const moderationStore = useSelector(({ moderation }) => moderation);

  let { pageSize, state, tag, search_type, search_param, sort_dir } = query;
  pageSize = parseInt(pageSize);
  state = parseInt(state);
  sort_dir = parseInt(sort_dir);

  if (!_.includes(pageSizes, pageSize)) {
    pageSize = moderationStore.pageSize;
  }
  if (!_.inRange(parseInt(state), 4)) {
    state = moderationStore.state;
  }
  if (
    tag != "" &&
    moderationStore.tags.length > 0 &&
    !_.includes(moderationStore.tags, tag)
  ) {
    tag = moderationStore.tag;
  }
  const searchTypeValues = searchTypes.map(item => item.value);
  if (search_type != "" && !_.includes(searchTypeValues, search_type)) {
    search_type = moderationStore.search_type;
  }
  if (search_param == null) {
    search_param = moderationStore.search_param;
  }
  if (!_.includes([-1, 1], sort_dir)) {
    sort_dir = moderationStore.sort_dir;
  }

  if (
    pageSize != query.pageSize ||
    state != query.state ||
    tag != query.tag ||
    search_type != query.search_type ||
    search_param != query.search_param ||
    sort_dir != query.sort_dir
  ) {
    query = {
      ...query,
      pageSize,
      state,
      tag,
      search_type,
      search_param,
      sort_dir
    };
    router.replace({ pathname, query });
  }
  if (
    pageSize != moderationStore.pageSize ||
    state != moderationStore.state ||
    tag != moderationStore.tag ||
    search_type != moderationStore.search_type ||
    search_param != moderationStore.search_param ||
    sort_dir != moderationStore.sort_dir
  ) {
    dispatch(
      updateFilterParams({
        pageSize,
        state,
        tag,
        search_type,
        search_param,
        sort_dir
      })
    );
  }

  const filterStore = useSelector(({ filter }) => filter);
  const { host, dateRange } = filterStore;

  useEffect(() => {
    if (
      host != null &&
      moment(dateRange[0], "YYYY-MM-DD", true).isValid() &&
      moment(dateRange[1], "YYYY-MM-DD", true).isValid()
    ) {
      dispatch(loadCommentsCount());
      dispatch(loadTags());
      dispatch(loadModerations());
    }
  }, [host, dateRange]);

  return (
    <>
      <ModerationHeader />
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          backgroundColor: "rgb(245, 247, 250)"
        }}
      >
        <div className="w-100 h-100 moderation-scene">
          <div className="moderation-sidebar pd-15 pd-lg-30 tx-13">
            <ModerationSidebar />
          </div>
          <div className="pd-l-15 pd-lg-l-30 pd-r-15 pd-lg-r-30 pd-b-15 pd-lg-b-30">
            <ModerationTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default ModerationScene;
