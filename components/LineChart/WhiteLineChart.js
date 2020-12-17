import PropTypes from "prop-types";
import React from "react";
import LineChart from "./LineChart";
import LineChartLegend from "./LineChartLegend";

const WhiteLineChart = ({ data }) => (
  <div className="pd-lg-x-15 pd-lg-t-25 pd-lg-b-10 pd-0 bg-white rounded-4">
    <LineChart data={data} />
    <LineChartLegend data={data} />
  </div>
);

WhiteLineChart.propTypes = {
  data: PropTypes.object
};

export default WhiteLineChart;
