import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlt, faRedoAlt } from "@fortawesome/pro-solid-svg-icons";

import TotalStats from "../components/TotalStats";
import Loader from "@/components/Loader";
import customStyles from "@/scenes/commonSettings";
import ExportToExcel from "@/components/ExportToExcel";
import { TooltipContainer } from "@/components/Tooltip";

import { loadSiteStats } from "@/services/actions/sites";
import { loadDailySiteStats } from "@/services/actions/analytics";
import { kmFormat, num2percent } from "@/utils";
import moment from "moment";

const columns = [
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Date">
        Date
      </TooltipContainer>
    ),
    selector: "statsDay",
    sortable: true,
    minWidth: "650px",
  },
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Number of comments">
        Comments
      </TooltipContainer>
    ),
    cell: (row) => kmFormat.format(row.comments),
    sortable: true,
    center: true,
    minWidth: "95px",
  },
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Number of replies">
        Replies
      </TooltipContainer>
    ),
    cell: (row) => kmFormat.format(row.replies),
    sortable: true,
    center: true,
    minWidth: "99px",
  },
  {
    name: (
      <TooltipContainer
        className="text-center"
        tooltip="Number of clicks on reactions"
      >
        Emotes
      </TooltipContainer>
    ),
    cell: (row) => kmFormat.format(row.emotes),
    sortable: true,
    center: true,
    minWidth: "99px",
  },
  {
    name: (
      <TooltipContainer
        className="text-center"
        tooltip="Total number of votes on comments"
      >
        Votes
      </TooltipContainer>
    ),
    cell: (row) => kmFormat.format(row.votes),
    sortable: true,
    center: true,
    minWidth: "85px",
  },
  {
    name: (
      <TooltipContainer
        className="text-center"
        tooltip="Total number of shares from share bar and comments"
      >
        Shares
      </TooltipContainer>
    ),
    cell: (row) => kmFormat.format(row.shares),
    sortable: true,
    center: true,
    minWidth: "99px",
  },
  {
    name: (
      <TooltipContainer
        className="text-center"
        tooltip="Internal re-circulation, clicks on Talk of the Town"
      >
        New Sessions
      </TooltipContainer>
    ),
    cell: (row) => kmFormat.format(row.refCount),
    sortable: true,
    center: true,
    minWidth: "144px",
  },
  {
    name: (
      <TooltipContainer
        className="text-center"
        tooltip="Clicks on like button in the share bar"
      >
        Recommendations
      </TooltipContainer>
    ),
    cell: (row) => kmFormat.format(row.recommends),
    sortable: true,
    center: true,
    minWidth: "175px",
  },
  {
    name: (
      <TooltipContainer
        className="text-center"
        tooltip="Total article page views"
      >
        Page Views
      </TooltipContainer>
    ),
    cell: (row) => kmFormat.format(row.pageViews),
    sortable: true,
    center: true,
    minWidth: "124px",
  },
  {
    name: (
      <TooltipContainer
        className="text-center"
        tooltip="% viewability of the comment section"
      >
        Comment Viewability
      </TooltipContainer>
    ),
    cell: (row) =>
      num2percent(row.pageViews > 0 ? row.commentViews / row.pageViews : 0, 1),
    sortable: true,
    center: true,
    minWidth: "195px",
  },
];

const DailyStatisticsPane = () => {
  const dispatch = useDispatch();

  const filterStore = useSelector(({ filter }) => filter);
  const sessionStore = useSelector(({ session }) => session);
  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { daily_site_stats, daily_site_stats_loading } = analyticsStore.index;

  useEffect(() => {
    dispatch(loadSiteStats());
  }, []);
  useEffect(() => {
    dispatch(loadDailySiteStats());
  }, [filterStore]);

  const formattedData = React.useMemo(() => {
    return daily_site_stats.map((item) => {
      return {
        Date: item.statsDay,
        Comments: item.comments,
        Replies: item.replies,
        Emotes: item.emotes,
        Votes: item.votes,
        Shares: item.shares,
        "New Sessions": item.refCount,
        Recommendations: item.recommends,
        "Page Views": item.pageViews,
        "Comment Viewability": num2percent(
          item.commentViews / item.pageViews,
          1
        ),
      };
    });
  }, [daily_site_stats]);

  return (
    <>
      <TotalStats />
      <div className="d-flex mg-y-10 pd-y-2 align-items-center">
        <h6 className="tx-20 tx-spacing-2 mg-b-0 mg-r-auto">
          Daily Statistics
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
              typeof dispatch(loadDailySiteStats()) === "function" &&
              dispatch(loadDailySiteStats())
            }
          />
          <ExportToExcel
            excelData={formattedData}
            fileName={`analytics_overview_daily_stats_${
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
        data={daily_site_stats}
        noHeader={true}
        defaultSortField="statsDay"
        defaultSortAsc={false}
        striped={true}
        dense={true}
        progressPending={daily_site_stats_loading}
        progressComponent={<Loader intent="primary" size="60" />}
      />
    </>
  );
};

export default DailyStatisticsPane;
