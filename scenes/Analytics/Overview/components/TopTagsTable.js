import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pane, Text } from "evergreen-ui";
import DataTable from "react-data-table-component";
import customStyles from "@/scenes/commonSettings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/pro-solid-svg-icons";

import { loadTopTags } from "@/services/actions/analytics/comments";
import Loader from "@/components/Loader";
import { TooltipContainer } from "@/components/Tooltip";

import { kmFormat } from "@/utils";

const columns = [
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Total count">
        #
      </TooltipContainer>
    ),
    selector: "index",
    width: "50px"
  },
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Tags or category of the article">
        Tag
      </TooltipContainer>
    ),
    selector: "tags"
  },
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Total comments and replies">
        Comments
      </TooltipContainer>
    ),
    cell: row => kmFormat.format(row.count),
    center: true
  }
];

const TopTagsTable = props => {
  const dispatch = useDispatch();

  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { top_tags, top_tags_loading } = analyticsStore.comments;

  const items =
    top_tags.map((item, index) => ({ ...item, index: index + 1 })) || [];

  const { title } = props;

  return (
    <>
      <Pane
        display="flex"
        alignItems="center"
        marginBottom={9}
        background="transparent"
      >
        <Pane marginRight="auto">
          <Text
            marginRight={6}
            fontSize={20}
            fontFamily="IBM Plex Sans, sans-serif"
            letterSpacing="1px"
          >
            {title}
          </Text>
        </Pane>
        <Pane>
          <FontAwesomeIcon
            className="svg-inline--fa panel-button"
            icon={faRedoAlt}
            style={{ cursor: "pointer", marginLeft: "12px ", color: "#3a84ff" }}
            onClick={() => dispatch(loadTopTags())}
          />
        </Pane>
      </Pane>
      <Pane>
        <DataTable
          customStyles={customStyles}
          columns={columns}
          data={items}
          noHeader={true}
          striped={true}
          dense={true}
          progressPending={top_tags_loading}
          progressComponent={<Loader />}
        />
      </Pane>
    </>
  );
};

export default TopTagsTable;
