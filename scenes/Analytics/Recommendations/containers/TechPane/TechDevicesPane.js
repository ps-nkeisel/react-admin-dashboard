import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Loader from "@/components/Loader";

import PanelContainer from "../../../components/PanelContainer";
import DeviceBreakdown from "../../../components/DeviceBreakdown";
import { TooltipContainer } from "@/components/Tooltip";

import { loadTopDevices } from "@/services/actions/analytics/recommendations";

const columns = [
  {
    name: (
      <TooltipContainer className="text-center" tooltip="Device">
        Device
      </TooltipContainer>
    ),
    selector: "device",
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

const TechDevicesPane = () => {
  const dispatch = useDispatch();

  const filterStore = useSelector(({ filter }) => filter);
  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { top_devices, top_devices_loading } = analyticsStore.recommendations;

  const items = Object.keys(top_devices).map(device => {
    return {
      device,
      count: top_devices[device]
    };
  });

  useEffect(() => {
    dispatch(loadTopDevices());
  }, [filterStore]);

  return (
    <>
      <Row className="my-3">
        <Col md={6}>
          <DeviceBreakdown
            title="Device breakdown by recommendations"
            top_devices={top_devices}
            top_devices_loading={top_devices_loading}
            refresh={false}
          />
        </Col>
        <Col md={6}>
          <PanelContainer
            title="Technology Analytics by devices"
            onRefresh={() => dispatch(loadTopDevices())}
          >
            <DataTable
              columns={columns}
              data={items}
              noHeader={true}
              defaultSortField="count"
              defaultSortAsc={false}
              striped={true}
              dense={true}
              progressPending={top_devices_loading}
              progressComponent={<Loader />}
            />
          </PanelContainer>
        </Col>
      </Row>
    </>
  );
};

export default TechDevicesPane;
