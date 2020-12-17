import React from "react";
import WhiteLineChart from "@/components/LineChart/WhiteLineChart";

const GeoCitiesContainer = props => {
  const { top_cities, top_cities_loading } = props;

  const options = {
    labels: Object.keys(top_cities),
    legend: {
      show: false
    }
  };
  const series = Object.values(top_cities);

  return <>{!top_cities_loading && <WhiteLineChart data={top_cities} />}</>;
};

export default GeoCitiesContainer;
