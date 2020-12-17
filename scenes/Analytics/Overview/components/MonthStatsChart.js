import { loadMonthStats } from "@/services/actions/analytics";
import moment from "moment";
import dynamic from "next/dynamic";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PanelContainer from "../../components/PanelContainer";
import Loader from "@/components/Loader";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false, loading: () => <Loader /> });

const MonthStatsChart = props => {
  const dispatch = useDispatch();

  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { month_stats, month_stats_loading } = analyticsStore.index;

  const options = {
    yaxis: [
      {
        show: true,
        showAlways: true,
        labels: {
          align: "left",
          style: {
            fontSize: "13px"
          }
        },
        axisBorder: {
          show: true,
          color: "#E5E9F2"
        }
      }
    ],
    xaxis: {
      categories: month_stats.map(stat => {
        return moment(stat.statsDay).format("MMM DD");
      }),
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
      shared: true,
      followCursor: true
    },
    dataLabels: {
      enabled: false
    },
    width: "100% - 60px",
    chart: {
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
    grid: {
      borderColor: "#E5E9F2"
    },
    colors: ["#3A84FF", "#66E0E0", "#FFC863", "#FF9684", "#FF76B9"],
    legend: {
      horizontalAlign: "left",
      fontSize: "13px",
      markers: {
        width: 20,
        height: 20,
        radius: 5
      }
    },
    markers: {
      size: 1,
      strokeWidth: 0,
      hover: {
        size: 8
      }
    }
  };
  const series = [
    {
      name: "Comments",
      data: month_stats.map(stat => stat.comments)
    },
    {
      name: "Emotes",
      data: month_stats.map(stat => stat.emotes)
    },
    {
      name: "Recommendations",
      data: month_stats.map(stat => stat.recommends)
    },
    {
      name: "Shares",
      data: month_stats.map(stat => stat.shares)
    },
    {
      name: "New Sessions",
      data: month_stats.map(stat => stat.refCount)
    }
  ];

  return (
    <div className="mg-t-15 pd-t-2">
      <PanelContainer
        title="Chart (Last 30 days)"
        tooltip="The graph shows the hourly trend of <br>user engagement on various parameters in <br>last 24 hrs."
        toggle={true}
        list={false}
        onRefresh={() => dispatch(loadMonthStats())}
      >
        {month_stats_loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <Chart
              className="pos-relative overflow-x-auto"
              type="bar"
              height="400px"
              options={options}
              series={series}
              style={{ minWidth: 1110 }}
            />
          </div>
        )}
      </PanelContainer>
    </div>
  );
};

export default MonthStatsChart;
