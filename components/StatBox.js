import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CountLoader from "@/components/CountLoader";
import { kmFormat } from "@/utils";

const StatBox = ({ loading, name, value, icon, iconColor, borderColor }) => {
  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-2 col-xl pd-x-5 mg-b-10">
      <div className="d-flex align-items-lg-center flex-column flex-lg-row pd-15 pd-lg-t-20 pd-lg-b-20 bg-white rounded-4">
        <div
          className={`stat-sign flex-shrink-0 mg-r-15 bd bd-4 mg-b-15 mg-lg-b-5 ${borderColor}`}
        >
          <FontAwesomeIcon
            icon={icon}
            className={`stat-sign__icon ${iconColor}`}
          />
        </div>
        <div className='stat-sign__wrapper'>
          <h6 className="tx-uppercase tx-semibold mg-b-7 tx-10 tx-spacing-1 tx-color-05 tx-overflow w-100">
            {name}
          </h6>
          <h2 className="mb-0 tx-normal tx-spacing-2">
            {loading ?
              <CountLoader />
              :
              (typeof value === 'number' ? kmFormat.format(value) : value)
            }
          </h2>
        </div>
      </div>
    </div>
  )
};

export default StatBox;
