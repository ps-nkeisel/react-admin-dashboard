import React from "react";
import LineChart from "@/components/LineChart/LineChart";
import PanelContainer from "../../components/PanelContainer";
import Loader from "@/components/Loader";

import { kmFormat } from '@/utils';

const Top5CitiesTable = props => {
  const { title, refresh, top_cities, top_cities_loading } = props;

  const colors = ["#3A84FF", "#D677EA", "#66E0E0", "#FFC863", "#FF9684"];
  const data = Object.keys(top_cities).map((city, i) => ({
    color: colors[i],
    city: city,
    count: top_cities[city]
  }));
  let arrSum = data.reduce((a, b) => a + b.count, 0);

  return (
    <PanelContainer
      title={title}
      refresh={refresh}
      list={false}
      onRefresh={props.onRefresh}
    >
      {top_cities_loading ? (
        <Loader />
      ) : (
        <>
          <div className="mg-b-15 pd-b-1">
            <LineChart data={top_cities} />
          </div>
          <div className="overflow-x-auto">
            <table className="table table-borderless tx-nowrap mg-b-0">
              <thead>
                <tr className="tx-10 tx-spacing-1 tx-color-03 tx-uppercase">
                  <th className="font-weight-bold">City</th>
                  <th className="font-weight-bold text-right">Comments</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => (
                  <tr key={i}>
                    <td>
                      <span
                        className="d-inline-block rounded-4 mg-r-10 valign-middle"
                        style={{
                          backgroundColor: item.color,
                          height: 20,
                          width: 20
                        }}
                      ></span>
                      {item.city} ({((item.count / arrSum) * 100).toFixed(1)}
                      %)
                    </td>
                    <td className="text-right">{kmFormat.format(item.count)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </PanelContainer>
  );
};

export default Top5CitiesTable;
