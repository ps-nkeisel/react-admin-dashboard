import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import WhiteLineChart from "@/components/LineChart/WhiteLineChart";
import GeoCitiesTable from "../../../components/GeoCitiesTable";
import PanelContainer from "../../../components/PanelContainer";

import { loadTopCities } from "@/services/actions/analytics/comments";

const GeoCitiesPane = () => {
  const dispatch = useDispatch();

  const filterStore = useSelector(({ filter }) => filter);
  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { top_cities, top_cities_loading } = analyticsStore.comments;

  useEffect(() => {
    dispatch(loadTopCities());
  }, [filterStore]);

  return (
    <>
      <PanelContainer
        refresh={false}
        list={false}
      >
        <WhiteLineChart data={top_cities}></WhiteLineChart>
      </PanelContainer>
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
