import React from "react"
import { useSelector } from "react-redux"
import dynamic from "next/dynamic"
import { Pane } from "evergreen-ui"
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <Loader />
})
import moment from "moment"

import Loader from '@/components/Loader'

import { dollarFormat, kmFormat, num2percent } from "@/utils"

const RevenueEcpmBarChart = () => {
  const chartData = useSelector(({ revenue }) => revenue.revenue)

  if (!chartData) {
    return null
  }

  chartData.sort((r1, r2) =>
    moment(r1["entryTimeStamp"]).unix() < moment(r2["entryTimeStamp"]).unix()
      ? -1
      : 1
  )

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
    colors: ["#3A84FF", "#FFC863", "#66E0E0"],
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
      width: [0, 2, 2]
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
        seriesName: "Net revenue",
        labels: {
          formatter(val = 0) {
            return `${dollarFormat.format(val)}`
          },
          align: "left",
          minWidth: 105,
          style: {
            fontSize: "13px"
          }
        },
        axisBorder: {
          show: true,
          color: "#E5E9F2"
        }
      },{
        show: false,
        seriesName: "eCPM",
        labels: {
          formatter(val = 0) {
            return `$${val.toFixed(2)}`
          }
        },
      },{
        show: true,
        seriesName: "vCPM",
        opposite: true,
        labels: {
          formatter(val = 0) {
            return `$${val.toFixed(2)}`
          },
          style: {
            fontSize: "13px"
          }
        }
      }
    ]
  }
  const series = [
    {
      name: "Net revenue",
      type: "column",
      data: chartData.map(item => item.revenueVal)
    },
    {
      name: "vCPM",
      type: "line",
      data: chartData.map(item => item.vcpm)
    },
    {
      name: "eCPM",
      type: "line",
      data: chartData.map(item => item.bQ_eCPM)
    },
  ]

  return (
    <Pane marginTop={24} width="100%">
      <h6 className="tx-20 tx-spacing-2 tx-normal mg-b--20">Revenue / eCPM Chart by days</h6>
      <Chart
        className="pos-relative pd-t-40"
        options={options}
        series={series}
        type="line"
        width="100%"
        height="400px"
      />
    </Pane>
  )
}

export default RevenueEcpmBarChart
