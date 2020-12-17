import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/pro-solid-svg-icons";
import moment from "moment";

import { kmFormat } from '@/utils';

const TimeContainer = () => {
  const realtimeStore = useSelector(({ realtime }) => realtime);
  const { AvgTimeOnPage, Min15PVs, Hour1PVs } = realtimeStore;

  return (
    <>
      {AvgTimeOnPage && (
        <div className="analytic-info-card d-flex analytic-card align-items-lg-center flex-column flex-lg-row pd-lg-t-20 pd-lg-b-20">
          <div className="analytic-info-card__icon blue flex-shrink-0 mg-r-15 mg-b-15 mg-lg-b-5">
            <div className="analytic-info-card__icon-inner">
              <FontAwesomeIcon icon={faClock} />
            </div>
          </div>
          <div>
            <h6 className="analytic-info-card__title mg-b-7">
              Avg Time On Page
            </h6>
            <div className="analytic-info-card__numbers mb-0">
              {moment(AvgTimeOnPage, moment.HTML5_FMT.TIME_MS).format("mm:ss")}
            </div>
          </div>
        </div>
      )}
      {Min15PVs && (
        <div className="analytic-info-card d-flex analytic-card align-items-lg-center flex-column flex-lg-row pd-lg-t-20 pd-lg-b-20">
          <div className="analytic-info-card__icon light-blue flex-shrink-0 mg-r-15 mg-b-15 mg-lg-b-5">
            <div className="analytic-info-card__icon-inner">
              <FontAwesomeIcon icon={faClock} />
            </div>
          </div>
          <div>
            <h6 className="analytic-info-card__title mg-b-7">Min 15 PVs</h6>
            <div className="analytic-info-card__numbers mb-0">{kmFormat.format(Min15PVs)}</div>
          </div>
        </div>
      )}
      {Hour1PVs && (
        <div className="analytic-info-card d-flex analytic-card align-items-lg-center flex-column flex-lg-row pd-lg-t-20 pd-lg-b-20">
          <div className="analytic-info-card__icon light-blue flex-shrink-0 mg-r-15 mg-b-15 mg-lg-b-5">
            <div className="analytic-info-card__icon-inner">
              <FontAwesomeIcon icon={faClock} />
            </div>
          </div>
          <div>
            <h6 className="analytic-info-card__title mg-b-7">Hour 1 PVs</h6>
            <div className="analytic-info-card__numbers mb-0">{kmFormat.format(Hour1PVs)}</div>
          </div>
        </div>
      )}
      {/* { Hour24PVs &&
        <div className="analytic-info-card d-flex analytic-card align-items-lg-center flex-column flex-lg-row pd-lg-t-20 pd-lg-b-20">
          <div className="analytic-info-card__icon light-blue flex-shrink-0 mg-r-15 mg-b-15 mg-lg-b-5">
            <div className="analytic-info-card__icon-inner">
              <FontAwesomeIcon icon={faClock} />
            </div>
          </div>
          <div>
            <h6 className="analytic-info-card__title mg-b-7">Hour 24 PVs</h6>
            <div className="analytic-info-card__numbers mb-0">
              {Hour24PVs}
            </div>
          </div>
        </div>
      } */}
    </>
  );
};

export default TimeContainer;
