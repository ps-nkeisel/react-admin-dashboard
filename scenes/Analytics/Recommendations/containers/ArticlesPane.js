import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pane, TextInput } from "evergreen-ui";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTags } from "@fortawesome/free-solid-svg-icons";
library.add(faTags);

import Loader from "@/components/Loader";
import { TooltipContainer } from "@/components/Tooltip";
import PanelContainer from "../../components/PanelContainer";

import { loadTopArticles } from "@/services/actions/analytics/recommendations";
import { containsFilter } from "@/utils";

const AvatarWrapper = styled.div`
  width: 60px;
  height: 60px;
  min-width: 60px;
  min-height: 60px;
  overflow: hidden;

  & > img {
    position: relative;
    width: 100%;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const myDatatableTheme = {
  rows: {
    height: "80px"
  }
};

const ArticlesPane = () => {
  const dispatch = useDispatch();

  const filterStore = useSelector(({ filter }) => filter);
  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { top_articles, top_articles_loading } = analyticsStore.recommendations;

  useEffect(() => {
    dispatch(loadTopArticles());
  }, [filterStore]);

  const renderTags = rowData => {
    const tags = rowData.tag.split(",");
    if (tags.length > 0) {
      return (
        <div className="d-flex">
          {tags.map((tag, index) => {
            if (tag.length > 0) {
              return (
                <div
                  key={index}
                  className="nav-item nav-link mr-1 p-0"
                  style={{ lineHeight: "1rem" }}
                >
                  <FontAwesomeIcon icon="tags" size="sm" className="mr-1" />
                  <span style={{ cursor: "pointer" }}>{tag}</span>
                </div>
              );
            }
          })}
        </div>
      );
    }
  };

  const columns = [
    {
      name: (
        <TooltipContainer className="text-center" tooltip="Article">
          Article
        </TooltipContainer>
      ),
      cell: row => (
        <div className="d-flex">
          <AvatarWrapper className="mr-2">
            <img
              srcSet={`${row.articleAvatar}, /static/images/default_img.png`}
            />
          </AvatarWrapper>
          <div className="d-flex flex-column">
            <a
              href={`//${row.host}${row.uri}`}
              target="_blank"
              className="text-nowrap"
            >
              {row.title}
            </a>
            {renderTags(row)}
          </div>
        </div>
      )
    },
    {
      name: (
        <TooltipContainer className="text-center" tooltip="Total likes clicked from the share bar">
          Likes
        </TooltipContainer>
      ),
      selector: "recommendCount",
      sortable: true,
      maxWidth: "200px",
      center: true
    }
  ];

  const [filter, setFilter] = useState("");

  const filteredItems = top_articles.filter(item =>
    containsFilter(item, filter)
  );

  return (
    <>
      <PanelContainer
        title="Article"
        onRefresh={() => dispatch(loadTopArticles())}
      >
        <Pane padding={12} borderBottom>
          <TextInput
            width="100%"
            height={36}
            placeholder="search article..."
            value={filter}
            onChange={event => setFilter(event.target.value)}
          />
        </Pane>
        <DataTable
          columns={columns}
          data={filteredItems}
          noHeader={true}
          defaultSortField="count"
          defaultSortAsc={false}
          striped={true}
          progressPending={top_articles_loading}
          progressComponent={<Loader />}
          pagination={true}
          paginationPerPage={15}
          customTheme={myDatatableTheme}
        />
      </PanelContainer>
    </>
  );
};

export default ArticlesPane;
