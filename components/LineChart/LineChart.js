import PropTypes from "prop-types";
import React from "react";
import prepareForLineChart from "./prepareForLineChart";

const LineChart = ({ data, quantity = 4 }) => {
  data = prepareForLineChart(data);
  let arrSum = data.reduce((a, b) => a + b.count, 0);
  let topSum = data.slice(0, quantity).reduce((a, b) => a + b.count, 0);
  return (
    <>
      <div className="line-chart d-none d-lg-flex">
        {data.map((item, i) => (
          <div
            key={i}
            className="line-chart__item bg-ui-04"
            style={{
              width: (item.count / arrSum) * 100 + "%",
              backgroundColor: item.color
            }}
          ></div>
        ))}
      </div>
      <div className="d-block d-lg-none bg-white pd-10 rounded-4">
        {data.slice(0, quantity).map((item, i) => (
          <div key={i} className="d-flex align-items-center mg-b-10">
            <p className="mb-0 line-chart__item-title tx-color-05">
              {item.title}
            </p>
            <div className="bg-ui-05 line-chart__row">
              <div
                key={i}
                className="line-chart__item bg-ui-04"
                style={{
                  width: (item.count / arrSum) * 100 + "%",
                  backgroundColor: item.color
                }}
              ></div>
            </div>
          </div>
        ))}
        {data.length > quantity && (
          <div className="d-flex align-items-center mg-b-10">
            <p className="mb-0 line-chart__item-title tx-color-05">Others</p>
            <div className="bg-ui-05 line-chart__row">
              <div
                className="line-chart__item bg-ui-04"
                style={{
                  width: (100 - (topSum / arrSum) * 100).toFixed(1) + "%"
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

LineChart.propTypes = {
  data: PropTypes.array
};

export default LineChart;
