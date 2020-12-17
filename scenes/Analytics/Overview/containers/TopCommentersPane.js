import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import Loader from "@/components/Loader";
import { Pane } from "evergreen-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlt,
  faSearch,
  faRedoAlt,
} from "@fortawesome/pro-solid-svg-icons";

import ExportToExcel from "@/components/ExportToExcel";
import customStyles from "@/scenes/commonSettings";
import { TooltipContainer } from "@/components/Tooltip";

import { loadTopCommenters } from "@/services/actions/analytics/comments";
import { containsFilter, kmFormat } from "@/utils";
import moment from "moment";

const columns = [
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Name of the commenter">
        Name
      </TooltipContainer>
    ),
    cell: (row) => `${row.name} ( ${row.email} )`,
    maxWidth: "430px",
  },
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Total count">
        Comments
      </TooltipContainer>
    ),
    cell: (row) => kmFormat.format(row.count),
    sortable: true,
    center: true,
  },
];

const TopCommentersPane = () => {
  const dispatch = useDispatch();

  const filterStore = useSelector(({ filter }) => filter);
  const sessionStore = useSelector(({ session }) => session);
  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { top_commenters, top_commenters_loading } = analyticsStore.comments;

  const [filter, setFilter] = useState("");

  const filteredItems = top_commenters.filter((item) =>
    containsFilter(item, filter)
  );

  useEffect(() => {
    dispatch(loadTopCommenters());
  }, [filterStore]);

  const formattedData = React.useMemo(() => {
    return filteredItems.map((item) => {
      return {
        Name: `${item.name} (${item.email})`,
        Comments: item.count,
      };
    });
  }, [filteredItems]);

  return (
    <>
      <Pane paddingBottom={12}>
        <h6 className="tx-20 tx-spacing-2 mg-b-15">Top Commenters</h6>
        <div className="d-flex">
          <div className="pos-relative mr-lg-auto wd-lg-auto wd-100p">
            <input
              type="search"
              placeholder="Search commenter..."
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
                typeof dispatch(loadTopCommenters()) === "function" &&
                dispatch(loadTopCommenters())
              }
            />
            <ExportToExcel
              excelData={formattedData}
              fileName={`analytics_overview_top_commenters_${
                filterStore.host || sessionStore.apiKey
              }_${moment(filterStore.dateRange[0]).format(
                "YYYY-MM-DD"
              )}-${moment(filterStore.dateRange[1]).format("YYYY-MM-DD")}`}
            />
          </div>
        </div>
      </Pane>
      <DataTable
        fixedHeader={true}
        fixedHeaderScrollHeight={"512px"}
        sortIcon={<FontAwesomeIcon icon={faSortAlt} />}
        customStyles={customStyles}
        columns={columns}
        data={filteredItems}
        noHeader={true}
        striped={true}
        dense={true}
        progressPending={top_commenters_loading}
        progressComponent={<Loader />}
      />
    </>
  );
};

export default TopCommentersPane;
