import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlt, faRedoAlt } from "@fortawesome/pro-solid-svg-icons";

import Loader from "@/components/Loader";
import customStyles from "@/scenes/commonSettings";
import WhiteLineChart from "@/components/LineChart/WhiteLineChart";
import ExportToExcel from "@/components/ExportToExcel";
import { TooltipContainer } from "@/components/Tooltip";

import { loadTopBrowsers } from "@/services/actions/analytics/comments";
import { kmFormat } from "@/utils";
import moment from "moment";

const columns = [
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Browser">
        Browser
      </TooltipContainer>
    ),
    selector: "browser",
    sortable: true,
  },
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Total count">
        #
      </TooltipContainer>
    ),
    cell: row => kmFormat.format(row.count),
    sortable: true,
    center: true,
  },
];

const TechBrowsersPane = () => {
  const dispatch = useDispatch();

  const filterStore = useSelector(({ filter }) => filter);
  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { top_browsers, top_browsers_loading } = analyticsStore.comments;

  const items = Object.keys(top_browsers).map(browser => {
    return {
      browser,
      count: top_browsers[browser],
    };
  });

  useEffect(() => {
    dispatch(loadTopBrowsers());
  }, [filterStore]);

  const formattedData = React.useMemo(() => {
    return items.map(item => {
      return {
        Browser: item.browser,
        "#": item.count,
      };
    });
  }, [items]);

  return (
    <>
      {!top_browsers_loading && (
        <div className="pd-t-20 pd-b-10">
          <WhiteLineChart data={top_browsers} />
        </div>
      )}
      <div className="d-flex mg-y-10 pd-y-2 align-items-center">
        <h6 className="tx-20 tx-spacing-2 mg-b-0 mg-r-auto">
          Technology Analytics by browser
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
              typeof dispatch(loadTopBrowsers()) === "function" &&
              dispatch(loadTopBrowsers())
            }
          />
          <ExportToExcel
            excelData={formattedData}
            fileName={`analytics_comments_top_browsers_${
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
        defaultSortField="count"
        defaultSortAsc={false}
        striped={true}
        dense={true}
        progressPending={top_browsers_loading}
        progressComponent={<Loader />}
      />
    </>
  );
};

export default TechBrowsersPane;
