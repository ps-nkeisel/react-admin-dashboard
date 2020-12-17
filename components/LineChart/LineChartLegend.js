import PropTypes from "prop-types";
import React from "react";
import prepareForLineChart from "./prepareForLineChart";

const LineChartLegend = ({ data, quantity = 4 }) => {
  data = prepareForLineChart(data);
  const items = data.slice(0, quantity);
  let arrSum = data.reduce((a, b) => a + b.count, 0);
  let topSum = data.slice(0, quantity).reduce((a, b) => a + b.count, 0);
  return (
    <div className="line-legend tx-color-05 mg-t-20 d-none d-lg-flex">
      {items.map((item, i) => (
        <div key={i} className="line-legend__item tx-13">
          <div
            className="line-legend__icon bg-ui-04"
            style={{ backgroundColor: item.color }}
          ></div>
          {item.title} ({((item.count / arrSum) * 100).toFixed(1)}%)
        </div>
      ))}
      {data.length > quantity && (
        <div className="line-legend__item tx-13">
          <div className="line-legend__icon bg-ui-04"></div>
          Others ({(100 - (topSum / arrSum) * 100).toFixed(1)}%)
        </div>
      )}
    </div>
  );
};

LineChartLegend.propTypes = {
  data: PropTypes.object,
  quantity: PropTypes.number
};

export default LineChartLegend;
