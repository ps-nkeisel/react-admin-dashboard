import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GeoCitiesChart from "../../../components/GeoCitiesChart";
import GeoCitiesTable from "../../../components/GeoCitiesTable";

import { loadTopCities } from "@/services/actions/analytics/emotes";

const GeoCitiesPane = () => {
  const dispatch = useDispatch();

  const filterStore = useSelector(({ filter }) => filter);
  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { top_cities, top_cities_loading } = analyticsStore.emotes;

  useEffect(() => {
    dispatch(loadTopCities());
  }, [filterStore]);

  return (
    <>
      <GeoCitiesChart
        top_cities={top_cities}
        top_cities_loading={top_cities_loading}
      />
      <GeoCitiesTable
        title="GEO Analytics by cities"
        top_cities={top_cities}
        top_cities_loading={top_cities_loading}
        onRefresh={() => dispatch(loadTopCities())}
      />
    </>
  );
};

export default GeoCitiesPane;
