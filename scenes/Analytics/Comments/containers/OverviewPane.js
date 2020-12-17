import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlt, faRedoAlt } from "@fortawesome/pro-solid-svg-icons";

import Loader from "@/components/Loader";
import customStyles from "@/scenes/commonSettings";
import ExportToExcel from "@/components/ExportToExcel";
import { TooltipContainer } from "@/components/Tooltip";

import { loadCommentStats } from "@/services/actions/analytics/comments";
import { kmFormat } from "@/utils";
import moment from "moment";

const columns = [
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Year-Month-Day">
        Date
      </TooltipContainer>
    ),
    selector: "date",
    sortable: true,
    minWidth: "110px",
    maxWidth: "110px",
  },
  {
    name: (
      <TooltipContainer
        className="text-center"
        tooltip="Total comments and replies that were approved"
      >
        Approved
      </TooltipContainer>
    ),
    cell: (row) => kmFormat.format(row.Approved),
    sortable: true,
    center: true,
  },
  {
    name: (
      <TooltipContainer
        className="text-center"
        tooltip="Total comments and replies that were rejected"
      >
        Rejected
      </TooltipContainer>
    ),
    cell: (row) => kmFormat.format(row.Rejected),
    sortable: true,
    center: true,
  },
  {
    name: (
      <TooltipContainer
        className="text-center"
        tooltip="Total comments and replies that were pending"
      >
        Pending
      </TooltipContainer>
    ),
    cell: (row) => kmFormat.format(row.Pending),
    sortable: true,
    center: true,
  },
];

const OverviewPane = () => {
  const dispatch = useDispatch();

  const filterStore = useSelector(({ filter }) => filter);
  const sessionStore = useSelector(({ session }) => session);
  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { comment_stats, comment_stats_loading } = analyticsStore.comments;

  const items = Object.keys(comment_stats).map((date) => {
    return {
      ...comment_stats[date],
      date,
    };
  });

  const formattedData = React.useMemo(() => {
    return items.map((item) => {
      return {
        Date: item.date,
        Approved: item.Approved,
        Rejected: item.Rejected,
        Pending: item.Pending,
      };
    });
  }, [items]);

  useEffect(() => {
    dispatch(loadCommentStats());
  }, [filterStore]);

  return (
    <>
      <div className="d-flex mg-y-10 pd-y-2 align-items-center">
        <h6 className="tx-20 tx-spacing-2 mg-b-0 mg-r-auto">Overview</h6>
        <div className="d-flex">
          <FontAwesomeIcon
            className="svg-inline--fa panel-button mn-ht-100p mg-x-5"
            icon={faRedoAlt}
            style={{
              cursor: "pointer",
              color: "#3a84ff",
            }}
            onClick={() =>
              typeof dispatch(loadCommentStats()) === "function" &&
              dispatch(loadCommentStats())
            }
          />
          <ExportToExcel
            excelData={formattedData}
            fileName={`analytics_comments_overview_${
              filterStore.host || sessionStore.apiKey
            }_${moment(filterStore.dateRange[0]).format("YYYY-MM-DD")}-${moment(
              filterStore.dateRange[1]
            ).format("YYYY-MM-DD")}`}
          />
        </div>
      </div>
      <DataTable
        sortIcon={<FontAwesomeIcon icon={faSortAlt} />}
        customStyles={customStyles}
        columns={columns}
        data={items}
        noHeader={true}
        defaultSortField="date"
        defaultSortAsc={false}
        striped={true}
        dense={true}
        progressPending={comment_stats_loading}
        progressComponent={<Loader />}
      />
    </>
  );
};

export default OverviewPane;
