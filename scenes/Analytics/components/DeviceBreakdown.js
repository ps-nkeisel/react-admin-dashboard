import { num2percent } from "@/utils";
import {
  faDesktop,
  faMobileAlt,
  faTabletAlt
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Row } from "react-bootstrap";
import WhiteLineChart from "../../../components/LineChart/WhiteLineChart";
import PanelContainer from "./PanelContainer";
import Loader from "@/components/Loader";

const DeviceBreakdown = props => {
  const { title, refresh, top_devices, top_devices_loading } = props;
  const Desktop = top_devices.Desktop || 0;
  const Tablet = top_devices.Tablet || 0;
  const Mobile = top_devices.Mobile || 0;

  const total_devices = Desktop + Tablet + Mobile || 1;

  return (
    <div className="mg-t-5">
      <PanelContainer
        title={title}
        refresh={refresh}
        list={false}
        tooltip="It gives the percentage (and count) of the <br>comments done by users using Desktop <br>Devices (Desktop Computers and Laptop <br>Computers) and Mobile Devices (Smart <br>Phones, Tablets and other Internet-<br>enabled phones)."
        onRefresh={props.onRefresh}
      >
        {top_devices_loading ? (
          <Loader />
        ) : (
          <Row>
            <Col md={12} sm={12}>
              <div className="row mg-sm-x--10 mg-x--5">
                <div className="col-6 col-md-4 col-lg-3 pd-sm-x-10 pd-x-5 stat-item">
                  <div className="d-flex align-items-lg-center pd-x-15 pd-t-20 pd-b-20 bg-white rounded-4 mg-b-10 mg-sm-b-20 mg-md-b-0 flex-column flex-lg-row">
                    <div className="stat-sign mg-b-15 mg-lg-b-5 mg-r-15 bd bd-4 mg-lg-b-5 bd-ui-08-2">
                      <FontAwesomeIcon
                        icon={faDesktop}
                        className="stat-sign__icon bg-ui-08"
                      />
                    </div>
                    <div>
                      <h6 className="tx-uppercase tx-semibold mg-b-7 tx-10 tx-spacing-1 tx-color-05">
                        Desktop Comments
                      </h6>
                      <h2 className="mb-0 tx-normal tx-spacing-2">
                        {num2percent(Desktop / total_devices)}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-lg-3 pd-sm-x-10 pd-x-5 stat-item">
                  <div className="d-flex align-items-lg-center pd-x-15 pd-t-20 pd-b-20 bg-white rounded-4 mg-b-10 mg-sm-b-20 mg-md-b-0 flex-column flex-lg-row">
                    <div className="stat-sign mg-b-15 mg-lg-b-5 mg-r-15 bd bd-4 mg-lg-b-5 bd-ui-09-2">
                      <FontAwesomeIcon
                        icon={faTabletAlt}
                        className="stat-sign__icon bg-ui-09"
                      />
                    </div>
                    <div>
                      <h6 className="tx-uppercase tx-semibold mg-b-7 tx-10 tx-spacing-1 tx-color-05">
                        Tablet Comments
                      </h6>
                      <h2 className="mb-0 tx-normal tx-spacing-2">
                        {num2percent(Tablet / total_devices)}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4 col-lg-3 pd-sm-x-10 pd-x-5 stat-item">
                  <div className="d-flex align-items-lg-center pd-x-15 pd-t-20 pd-b-20 bg-white rounded-4 flex-column flex-lg-row">
                    <div className="stat-sign mg-b-15 mg-lg-b-5 mg-r-15 bd bd-4 mg-lg-b-5 bd-ui-12-2">
                      <FontAwesomeIcon
                        icon={faMobileAlt}
                        className="stat-sign__icon bg-ui-12"
                      />
                    </div>
                    <div>
                      <h6 className="tx-uppercase tx-semibold mg-b-7 tx-10 tx-spacing-1 tx-color-05">
                        Mobile Comments
                      </h6>
                      <h2 className="mb-0 tx-normal tx-spacing-2">
                        {num2percent(Mobile / total_devices)}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="col-xl col-12 pd-x-10 mg-t-20 mt-xl-0">
                  <WhiteLineChart data={top_devices} />
                </div>
              </div>
            </Col>
          </Row>
        )}
      </PanelContainer>
    </div>
  );
};

DeviceBreakdown.defaultProps = {
  refresh: true
};

export default DeviceBreakdown;
