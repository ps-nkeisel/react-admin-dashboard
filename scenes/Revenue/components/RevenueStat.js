import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RevenueStat = ({ icon, title, amount, borderColor, background }) => (
  <div className="col-6 col-sm-6 col-md-4 pd-x-5 pd-lg-x-10 mg-b-10 stat-item">
    <div className="d-flex align-items-lg-center flex-column flex-lg-row pd-15 pd-lg-t-20 pd-lg-b-20 bg-white rounded-4">
      <div className={`stat-sign flex-shrink-0 mg-r-15 bd bd-4 mg-b-15 mg-lg-b-5 ${borderColor}`}>
        <FontAwesomeIcon
          className={`stat-sign__icon ${background}`}
          icon={icon}
        />
      </div>
      <div>
        <h6 className="tx-uppercase tx-semibold mg-b-7 tx-10 tx-spacing-1 tx-color-05">
          {title}
        </h6>
        <h2 className="mb-0 tx-normal tx-spacing-2">{amount}</h2>
      </div>
    </div>
  </div>
);

export default RevenueStat;
