import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "evergreen-ui";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlt, faRedoAlt } from "@fortawesome/pro-solid-svg-icons";

import Loader from "@/components/Loader";
import customStyles from "@/scenes/commonSettings";
import ExportToExcel from "@/components/ExportToExcel";
import { TooltipContainer } from "@/components/Tooltip";

import { loadTopArticles } from "@/services/actions/analytics/comments";
import { kmFormat } from "@/utils";
import moment from "moment";

const AvatarWrapper = styled.div`
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  overflow: hidden;
  border-radius: 50%;

  & > img {
    position: relative;
    width: 100%;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const columns = [
  {
    name: (
      <TooltipContainer
        className="text-center"
        tooltip="Articles with highest engagement"
      >
        Article
      </TooltipContainer>
    ),
    cell: (row) => (
      <>
        <Text
          fontSize={13}
          minWidth={44}
          marginLeft={-16}
          fontFamily="'IBM Plex Sans', sans-serif"
          color="#8192A4"
          textAlign="center"
          paddingX={10}
        >
          {row.index}
        </Text>
        <AvatarWrapper className="mg-r-10">
          <img
            className="object-fit-cover"
            srcSet={`${row.articleAvatar}, /static/images/default_img.png`}
          />
        </AvatarWrapper>
        <a
          href={`http://${row.host}${row.uri}`}
          target="_blank"
          className="mx-wd-335"
        >
          {row.title}
        </a>
      </>
    ),
    minWidth: "345px",
  },
  {
    name: (
      <TooltipContainer
        className="text-center"
        tooltip="Total comments and replies"
      >
        Comments
      </TooltipContainer>
    ),
    cell: (row) => kmFormat.format(row.commentCount),
    sortable: true,
    maxWidth: "150px",
    center: true,
  },
  {
    name: (
      <TooltipContainer
        className="text-center"
        tooltip="Total reactions received"
      >
        Emotes
      </TooltipContainer>
    ),
    cell: (row) => kmFormat.format(row.emoteCount),
    sortable: true,
    maxWidth: "150px",
    center: true,
  },
  {
    name: (
      <TooltipContainer
        className="text-center"
        tooltip="Total likes received on the share bar"
      >
        Recommendations
      </TooltipContainer>
    ),
    cell: (row) => kmFormat.format(row.recommendCount),
    sortable: true,
    maxWidth: "200px",
    center: true,
  },
];

const TopArticlesPane = () => {
  const dispatch = useDispatch();

  const filterStore = useSelector(({ filter }) => filter);
  const sessionStore = useSelector(({ session }) => session);
  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { top_articles, top_articles_loading } = analyticsStore.comments;

  const items =
    top_articles.map((item, index) => ({
      ...item,
      index: index + 1,
      emoteCount: item.emotes.reduce((sum, num) => sum + num),
    })) || [];

  useEffect(() => {
    dispatch(loadTopArticles());
  }, [filterStore]);

  const formattedData = React.useMemo(() => {
    return items.map((item) => {
      return {
        Article: `${item.title}`,
        Comments: item.commentCount,
        Emotes: item.emoteCount,
        Recommendations: item.recommendCount,
      };
    });
  }, [items]);

  return (
    <>
      <div className="d-flex mg-y-10 pd-y-2 align-items-center">
        <h6 className="tx-20 tx-spacing-2 mg-b-0 mg-r-auto">
          Article Analytics
        </h6>
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
            fileName={`analytics_comments_toparticles_${
              filterStore.host || sessionStore.apiKey
            }_${moment(filterStore.dateRange[0]).format("YYYY-MM-DD")}-${moment(
              filterStore.dateRange[1]
            ).format("YYYY-MM-DD")}`}
          />
        </div>
      </div>
      <DataTable
        fixedHeader={true}
        fixedHeaderScrollHeight={"550px"}
        sortIcon={<FontAwesomeIcon icon={faSortAlt} />}
        customStyles={customStyles}
        columns={columns}
        data={items}
        noHeader={true}
        striped={true}
        dense={true}
        progressPending={top_articles_loading}
        progressComponent={<Loader />}
      />
    </>
  );
};

export default TopArticlesPane;
