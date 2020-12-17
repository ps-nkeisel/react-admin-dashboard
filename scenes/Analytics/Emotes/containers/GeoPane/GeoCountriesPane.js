import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GeoCountriesTable from "../../../components/GeoCountriesTable";
import GeoCountriesMap from "../../../components/GeoCountriesMap";

import { loadTopCountries } from "@/services/actions/analytics/emotes";

const GeoCountriesPane = () => {
  const dispatch = useDispatch();

  const filterStore = useSelector(({ filter }) => filter);
  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { top_countries, top_countries_loading } = analyticsStore.emotes;

  useEffect(() => {
    dispatch(loadTopCountries());
  }, [filterStore]);

  return (
    <>
      <GeoCountriesMap
        top_countries={top_countries}
        top_countries_loading={top_countries_loading}
        refresh={false}
      />
      <GeoCountriesTable
        title="GEO Analytics by countries"
        top_countries={top_countries}
        top_countries_loading={top_countries_loading}
        onRefresh={() => dispatch(loadTopCountries())}
      />
    </>
  );
};

export default GeoCountriesPane;
