import React from 'react';
import { useSelector } from 'react-redux';
import LineChart from '../../../../components/LineChart/LineChart';
import { Pane } from "evergreen-ui";
import { dollarFormat } from "@/utils";

import Link from "next/link";
    
const RevenueLineChart = () => {
    const chartData = useSelector(({ revenue }) => revenue.revenue);
    let data = {}
    for (let i = 0; i < chartData.length; i++) {
        data[chartData[i].entryTimeStamp] = chartData[i].viewability * 100
    }
    const colors = ["#3A84FF", "#D677EA", "#66E0E0", "#FFC863", "#FF9684"];
    const dataTable = Object.keys(chartData).map((i) => ({
        color: colors[i],
        host: chartData[i].host,
        revenue: dollarFormat.format(chartData[i].revenueVal),
    }));
    // let arrSum = dataTable.reduce((a, b) => a + b.count, 0);
    
    if (!chartData) {
        return null;
    }
    
    return (
        <Pane marginTop={24} width="100%">
            <h6 className="tx-20 tx-spacing-2 tx-normal mg-b-20">Chart by days</h6>
            <LineChart data={data} />
            <div className="overflow-x-auto mg-t-15">
                <table className="table table-borderless tx-nowrap mg-b-0">
                <tbody>
                    {dataTable.map((item, i) => (
                    <tr key={i}>
                        <td>
                        <span
                            className="d-inline-block rounded-4 mg-r-10 valign-middle bg-ui-04"
                            style={{
                            backgroundColor: item.color,
                            height: 20,
                            width: 20
                            }}
                        ></span>
                            <Link href={`/revenue?by=domain&host=${item.host}`} prefetch={false}>
                                <a>
                                    {item.host}
                                </a>
                            </Link> 
                        </td>
                        <td className="text-right">{item.revenue}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </Pane>
    )
    ;
};

export default RevenueLineChart;
