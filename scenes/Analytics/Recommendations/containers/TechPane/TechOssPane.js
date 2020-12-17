import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import Loader from "@/components/Loader";
import { TooltipContainer } from "@/components/Tooltip";
import PanelContainer from "../../../components/PanelContainer";

import { loadTopOss } from "@/services/actions/analytics/recommendations";

const columns = [
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Operating system">
        OS
      </TooltipContainer>
    ),
    selector: "os",
    sortable: true,
    center: true
  },
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Total count">
        Likes
      </TooltipContainer>
    ),
    selector: "count",
    sortable: true,
    center: true
  }
];

const TechOssPane = () => {
  const dispatch = useDispatch();

  const filterStore = useSelector(({ filter }) => filter);
  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { top_oss, top_oss_loading } = analyticsStore.recommendations;

  const options = {
    labels: Object.keys(top_oss),
    legend: {
      show: false
    }
  };
  const series = Object.values(top_oss);

  const items = Object.keys(top_oss).map(os => {
    return {
      os,
      count: top_oss[os]
    };
  });

  useEffect(() => {
    dispatch(loadTopOss());
  }, [filterStore]);

  return (
    <>
      <Row className="my-3">
        <Col md={6} className="text-center">
          {!top_oss_loading && (
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
            title="Technology Analytics by OS"
            onRefresh={() => dispatch(loadTopOss())}
          >
            <DataTable
              columns={columns}
              data={items}
              noHeader={true}
              defaultSortField="count"
              defaultSortAsc={false}
              striped={true}
              dense={true}
              progressPending={top_oss_loading}
              progressComponent={<Loader />}
            />
          </PanelContainer>
        </Col>
      </Row>
    </>
  );
};

export default TechOssPane;
