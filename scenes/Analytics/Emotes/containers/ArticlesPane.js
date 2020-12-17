import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlt,
  faSearch,
  faRedoAlt,
} from "@fortawesome/pro-solid-svg-icons";

import Loader from "@/components/Loader";
import ExportToExcel from "@/components/ExportToExcel";
import customStyles from "@/scenes/commonSettings";
import { TooltipContainer } from "@/components/Tooltip";
import EmoteContainer from "../components/EmoteContainer";

import {
  loadEmoteState,
  loadTopArticles,
} from "@/services/actions/analytics/emotes";
import { updateEmote } from "@/services/actions/analytics/emotes";
import { containsFilter, kmFormat } from "@/utils";
import moment from "moment";

const AvatarWrapper = styled.div`
  width: 32px
  height: 32px
  min-width: 32px
  min-height: 32px
  overflow: hidden
  border-radius: 50%

  & > img {
    position: relative
    width: 100%
    height: 100%
    left: 50%
    transform: translateX(-50%)
  }
`;

const emote_types = [
  "Happy",
  "Indifferent",
  "Amused",
  "Excited",
  "Angry",
  "Sad",
];

const stringNumber = [
  "zero",
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
];

const myDatatableTheme = {
  rows: {
    height: "80px",
  },
};

const ArticlesPane = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const pathname = router.pathname;
  let query = router.query;

  let { subtab } = query;

  const filterStore = useSelector(({ filter }) => filter);
  const sessionStore = useSelector(({ session }) => session);

  const emotesStore = useSelector(({ analytics }) => analytics.emotes);
  const {
    top_articles,
    top_articles_loading,
    emote_state,
    emote,
  } = emotesStore;

  if (!_.inRange(parseInt(subtab), 1, emote_types.length)) {
    subtab = emote;
  }

  if (subtab != query.subtab) {
    query.subtab = subtab;
    router.replace({ pathname, query });
  }
  if (subtab != emote) {
    dispatch(updateEmote(subtab));
  }

  useEffect(() => {
    dispatch(loadEmoteState());
  }, [filterStore]);

  useEffect(() => {
    dispatch(loadTopArticles());
  }, [filterStore, emote]);

  const columns = [
    {
      name: (
        <TooltipContainer className="text-center" tooltip="Article">
          Article
        </TooltipContainer>
      ),
      cell: (row) => (
        <div className="d-flex">
          <AvatarWrapper className="mg-r-10">
            <img
              srcSet={`${row.articleAvatar}, /static/images/default_img.png`}
            />
          </AvatarWrapper>
          <a href={`${row.uri}`} target="_blank" className="text-nowrap">
            {row.title}
          </a>
        </div>
      ),
    },
    {
      name: (
        <TooltipContainer className="text-center" tooltip="Total count">
          {`${emote_types[emote - 1]} Emotes`}
        </TooltipContainer>
      ),
      cell: (row) => kmFormat.format(row.count),
      selector: "count",
      sortable: true,
      center: true,
    },
  ];

  const totalEmotes = emote_state.reduce((sum, num) => sum + num) || 1;

  const items = top_articles.map((article) => {
    return {
      ...article,
      count: article.emotes[stringNumber[emote]],
    };
  });

  const [filter, setFilter] = useState("");

  const filteredItems = items.filter((item) => containsFilter(item, filter));

  const formattedData = React.useMemo(() => {
    return filteredItems.map((item) => {
      return {
        Article: item.title,
        [`${emote_types[emote - 1]} Emotes`]: item.count,
      };
    });
  }, [filteredItems]);

  return (
    <>
      <div className="row my-3 mg-sm-x--10 mg-x--5">
        {emote_types.map((et, index) => (
          <div
            key={index}
            className="col-xl-2 col-md-4 col-6 pd-lg-x-10 pd-x-5 mg-t-10 mg-lg-t-20 mg-xl-t-0"
          >
            <EmoteContainer
              type={et}
              count={emote_state[index]}
              percentage={emote_state[index] / totalEmotes}
              index={index}
            />
          </div>
        ))}
      </div>
      <div className="mg-y-10 pd-y-2">
        <h6 className="tx-20 tx-spacing-2 mg-b-15">Article</h6>
        <div className="d-flex">
          <div className="pos-relative mr-lg-auto wd-lg-auto wd-100p mn-wd-lg-215">
            <input
              type="search"
              placeholder="Search article"
              value={filter}
              className="search-input outline-none"
              onChange={(event) => setFilter(event.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} className="pos-absolute" />
          </div>
          <div className="d-flex">
            <FontAwesomeIcon
              className="svg-inline--fa panel-button mn-ht-100p mg-x-5"
              icon={faRedoAlt}
              style={{
                cursor: "pointer",
                color: "#3a84ff",
              }}
              onClick={() =>
                typeof dispatch(loadTopArticles()) === "function" &&
                dispatch(loadTopArticles())
              }
            />
            <ExportToExcel
              excelData={formattedData}
              fileName={`analytics_emotes_toparticles_${
                filterStore.host || sessionStore.apiKey
              }_${moment(filterStore.dateRange[0]).format(
                "YYYY-MM-DD"
              )}-${moment(filterStore.dateRange[1]).format("YYYY-MM-DD")}`}
            />
          </div>
        </div>
      </div>
      <DataTable
        fixedHeader={true}
        fixedHeaderScrollHeight={"550px"}
        sortIcon={<FontAwesomeIcon icon={faSortAlt} />}
        customStyles={customStyles}
        dense={true}
        columns={columns}
        data={filteredItems}
        noHeader={true}
        defaultSortField="count"
        defaultSortAsc={false}
        striped={true}
        progressPending={top_articles_loading}
        progressComponent={<Loader />}
        customTheme={myDatatableTheme}
      />
    </>
  );
};

export default ArticlesPane;
