import React from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { Pane } from "evergreen-ui";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <Loader />
});
import moment from "moment";

import Loader from "@/components/Loader";

import { kmFormat } from "@/utils";

const RevenuePageviewBarChart = () => {
  const chartData = useSelector(({ revenue }) => revenue.revenue);

  if (!chartData) {
    return null;
  }

  chartData.sort((r1, r2) =>
    moment(r1["entryTimeStamp"]).unix() < moment(r2["entryTimeStamp"]).unix()
      ? -1
      : 1
  );

  const options = {
    chart: {
      id: "revenue-bars",
      // stacked: true,
      type: "bar",
      width: "100% - 60px",
      toolbar: {
        show: false,
        tools: {
          download:
            '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="list" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-list  tx-color-06"><path fill="currentColor" d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" class=""></path></svg>'
        }
      },
      fontFamily: "IBM Plex Sans, sans-serif",
      background: "#fff",
      foreColor: "#8192A4"
    },
    plotOptions: {
      bar: {
        columnWidth: "70%"
      }
    },
    grid: {
      borderColor: "#E5E9F2"
    },
    colors: ["#FFC863", "#3A84FF", "#66E0E0"],
    legend: {
      horizontalAlign: "left",
      fontSize: "13px",
      markers: {
        width: 20,
        height: 20,
        radius: 5
      }
    },
    stroke: {
      width: [0, 0, 2]
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: chartData.map(item =>
        moment(item.entryTimeStamp).format("M/D")
      ),
      axisBorder: {
        show: true,
        color: "#E5E9F2",
        height: 2
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          fontSize: "10px"
        }
      }
    },
    tooltip: {
      shared: true
    },
    markers: {
      size: 1,
      strokeWidth: 0,
      hover: {
        size: 8
      }
    },
    yaxis: [
      {
        show: true,
        showAlways: true,
        seriesName: "Page Views",
        decimalsInFloat: 0,
        labels: {
          align: "left",
          minWidth: 105,
          formatter(val = 0) {
            return `${kmFormat.format(val)}`;
          },
          style: {
            fontSize: "13px"
          }
        },
        axisBorder: {
          show: true,
          color: "#E5E9F2"
        }
      },
      {
        show: false,
        labels: {
          formatter(val = 0) {
            return `${kmFormat.format(val)}`;
          }
        }
      },
      {
        show: true,
        showAlways: true,
        seriesName: "Viewability",
        opposite: true,
        decimalsInFloat: 2,
        labels: {
          formatter(val = 0) {
            return `${val.toFixed(2)}%`;
          },
          style: {
            fontSize: "13px"
          }
        }
      }
    ]
  };
  const series = [
    {
      name: "Page Views",
      type: "column",
      data: chartData.map(item => item.bqPageViews)
    },
    {
      name: "Viewable impressions",
      type: "column",
      data: chartData.map(item => item.pageViews)
    },
    {
      name: "Viewability",
      type: "line",
      data: chartData.map(item => item.viewability * 100)
    }
  ];

  return (
    <Pane marginTop={24} width="100%">
      <h6 className="tx-20 tx-spacing-2 tx-normal mg-b--20">
        Revenue Page Views / Viewability Chart by days
      </h6>
      <Chart
        className="pos-relative pd-t-40"
        options={options}
        series={series}
        type="line"
        width="100%"
        height="400px"
      />
    </Pane>
  );
};

export default RevenuePageviewBarChart;
