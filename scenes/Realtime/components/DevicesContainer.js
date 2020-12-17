import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faDesktop,
  faTabletAlt,
  faMobileAlt,
} from "@fortawesome/pro-solid-svg-icons";
import orderBy from "lodash/orderBy";
import sumBy from "lodash/sumBy";

import { num2percent } from "@/utils";
import moment from "moment";

const DevicesContainer = () => {
  const realtimeStore = useSelector(({ realtime }) => realtime);

  const devices = orderBy(
    realtimeStore.ClientStats.devices,
    ["count"],
    ["desc"]
  );
  const totalCount = sumBy(devices, "count") || 1;

  return (
    <>
      {devices.map((item, index) => {
        if (item.device === "Desktop") {
          return (
            <div
              key={index}
              className="analytic-info-card d-flex analytic-card align-items-lg-center flex-column flex-lg-row pd-lg-t-20 pd-lg-b-20"
              style={{ padding: '10px 10px 5px 16px' }}
            >
              <div className="analytic-info-card__icon blue flex-shrink-0 mg-r-15 mg-b-15 mg-lg-b-5">
                <div className="analytic-info-card__icon-inner">
                  <FontAwesomeIcon icon={faDesktop} />
                </div>
              </div>
              <div>
                <h6 className="analytic-info-card__title mg-b-7">Desktop</h6>
                <div className="analytic-info-card__numbers mb-0">
                  {num2percent(item.count / totalCount, 2)}
                </div>
                {item.avgTimeOnPage && (
                  <small className="analytic-info-card__title">
                    <FontAwesomeIcon icon={faClock} /> Avg. time on page:{" "}
                    {moment(
                      item.avgTimeOnPage,
                      moment.HTML5_FMT.TIME_MS
                    ).format("mm:ss")}
                  </small>
                )}
              </div>
            </div>
          );
        } else if (item.device === "Tablet") {
          return (
            <div
              key={index}
              className="analytic-info-card d-flex analytic-card align-items-lg-center flex-column flex-lg-row pd-lg-t-20 pd-lg-b-20"
              style={{ padding: '10px 10px 5px 16px' }}
            >
              <div className="analytic-info-card__icon light-blue flex-shrink-0 mg-r-15 mg-b-15 mg-lg-b-5">
                <div className="analytic-info-card__icon-inner">
                  <FontAwesomeIcon icon={faTabletAlt} />
                </div>
              </div>
              <div>
                <h6 className="analytic-info-card__title mg-b-7">Tablet</h6>
                <div className="analytic-info-card__numbers mb-0">
                  {num2percent(item.count / totalCount, 2)}
                </div>
                {item.avgTimeOnPage && (
                  <small className="analytic-info-card__title">
                    <FontAwesomeIcon icon={faClock} /> Avg. time on page:{" "}
                    {moment(
                      item.avgTimeOnPage,
                      moment.HTML5_FMT.TIME_MS
                    ).format("mm:ss")}
                  </small>
                )}
              </div>
            </div>
          );
        } else if (item.device === "Mobile") {
          return (
            <div
              key={index}
              className="analytic-info-card d-flex analytic-card align-items-lg-center flex-column flex-lg-row pd-lg-t-20 pd-lg-b-20"
              style={{ padding: '10px 10px 5px 16px' }}
            >
              <div className="analytic-info-card__icon orange flex-shrink-0 mg-r-15 mg-b-15 mg-lg-b-5">
                <div className="analytic-info-card__icon-inner">
                  <FontAwesomeIcon icon={faMobileAlt} />
                </div>
              </div>
              <div>
                <h6 className="analytic-info-card__title mg-b-7">Mobile</h6>
                <div className="analytic-info-card__numbers mb-0">
                  {num2percent(item.count / totalCount, 2)}
                </div>
                {item.avgTimeOnPage && (
                  <small className="analytic-info-card__title">
                    <FontAwesomeIcon icon={faClock} /> Avg. time on page:{" "}
                    {moment(
                      item.avgTimeOnPage,
                      moment.HTML5_FMT.TIME_MS
                    ).format("mm:ss")}
                  </small>
                )}
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default DevicesContainer;
