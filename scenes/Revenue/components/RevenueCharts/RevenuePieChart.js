import React from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { Pane } from "evergreen-ui";
import Loader from "@/components/Loader";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <Loader />
});
// import moment from 'moment';

const RevenuePieChart = () => {
  const chartData = useSelector(({ revenue }) => revenue.revenue);

  if (!chartData) {
    return null;
  }

  const options = {
    labels: _.map(chartData, item => item.host),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };
  const series = _.map(chartData, item => Math.round(item.revenueVal * 100) / 100);

  return (
    <Pane marginTop={24} width="100%">
      <h6 className="tx-20 tx-spacing-2 tx-normal mg-b--20">Chart by days</h6>
      <Chart
        className="pos-relative pd-t-40"
        options={options}
        series={series}
        type="pie"
        width="100%"
        height="400px"
      />
    </Pane>
  );
};

export default RevenuePieChart;
