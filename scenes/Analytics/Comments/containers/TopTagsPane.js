import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlt,
  faSearch,
  faRedoAlt,
} from "@fortawesome/pro-solid-svg-icons";

import Loader from "@/components/Loader";
import customStyles from "@/scenes/commonSettings";
import ExportToExcel from "@/components/ExportToExcel";
import { TooltipContainer } from "@/components/Tooltip";

import { loadTopTags } from "@/services/actions/analytics/comments";
import { containsFilter, kmFormat } from "@/utils";
import moment from "moment";

const columns = [
  {
    name: (
      <TooltipContainer
        className="text-center"
        tooltip="Tag or category of an article"
      >
        Tag
      </TooltipContainer>
    ),
    selector: "tags",
    sortable: true,
    maxWidth: "350px",
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
    cell: (row) => kmFormat.format(row.count),
    sortable: true,
    center: true,
    maxWidth: "350px",
  },
];

const TopTagsPane = () => {
  const dispatch = useDispatch();

  const filterStore = useSelector(({ filter }) => filter);
  const sessionStore = useSelector(({ session }) => session);
  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { top_tags, top_tags_loading } = analyticsStore.comments;

  const [filter, setFilter] = useState("");

  const filteredItems = top_tags.filter((item) => containsFilter(item, filter));

  useEffect(() => {
    dispatch(loadTopTags());
  }, [filterStore]);

  const formattedData = React.useMemo(() => {
    return filteredItems.map((item) => {
      return {
        Tag: item.tags,
        Comments: item.count,
      };
    });
  }, [filteredItems]);

  return (
    <>
      <div className="mg-y-10 pd-y-2">
        <h6 className="tx-20 tx-spacing-2 mg-b-15">Tag Analytics</h6>
        <div className="d-flex">
          <div className="pos-relative mr-lg-auto wd-lg-auto wd-100p mn-wd-lg-215">
            <input
              type="search"
              placeholder="Search Tag"
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
                typeof dispatch(loadTopTags()) === "function" &&
                dispatch(loadTopTags())
              }
            />
            <ExportToExcel
              excelData={formattedData}
              fileName={`analytics_comments_toptags_${
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
        fixedHeaderScrollHeight={"500px"}
        sortIcon={<FontAwesomeIcon icon={faSortAlt} />}
        customStyles={customStyles}
        columns={columns}
        data={filteredItems}
        noHeader={true}
        striped={true}
        dense={true}
        progressPending={top_tags_loading}
        progressComponent={<Loader />}
      />
    </>
  );
};

export default TopTagsPane;
