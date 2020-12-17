import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import Loader from "@/components/Loader";
import { TooltipContainer } from "@/components/Tooltip";
import PanelContainer from "../../../components/PanelContainer";

import { loadTopBrowsers } from "@/services/actions/analytics/recommendations";

const columns = [
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Browser">
        Browser
      </TooltipContainer>
    ),
    selector: "browser",
    sortable: true,
    center: true
  },
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Total clicks on like button in the share bar">
        Likes
      </TooltipContainer>
    ),
    selector: "count",
    sortable: true,
    center: true
  }
];

const TechBrowsersPane = () => {
  const dispatch = useDispatch();

  const filterStore = useSelector(({ filter }) => filter);
  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { top_browsers, top_browsers_loading } = analyticsStore.recommendations;

  const options = {
    labels: Object.keys(top_browsers),
    legend: {
      show: false
    }
  };
  const series = Object.values(top_browsers);

  const items = Object.keys(top_browsers).map(browser => {
    return {
      browser,
      count: top_browsers[browser]
    };
  });

  useEffect(() => {
    dispatch(loadTopBrowsers());
  }, [filterStore]);

  return (
    <>
      <Row className="my-3">
        <Col md={6} className="text-center">
          {!top_browsers_loading && (
            <Chart
              type="donut"
              width="100%"
              height="300px"
              options={options}
              series={series}
            />
          )}
        </Col>
        <Col md={6}>
          <PanelContainer
            title="Technology Analytics by browser"
            onRefresh={() => dispatch(loadTopBrowsers())}
          >
            <DataTable
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
          </PanelContainer>
        </Col>
      </Row>
    </>
  );
};

export default TechBrowsersPane;
