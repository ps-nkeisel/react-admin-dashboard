import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from 'react-bootstrap';

import GeoCountriesTable from "../../../components/GeoCountriesTable";
import GeoCountriesMap from "../../../components/GeoCountriesMap";

import {
  loadTopCountries,
} from "@/services/actions/analytics/recommendations";

const GeoCountriesPane = () => {
  const dispatch = useDispatch();

  const filterStore = useSelector(({ filter }) => filter);
  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { top_countries, top_countries_loading } = analyticsStore.recommendations;

  useEffect(() => {
    dispatch(loadTopCountries());
  }, [filterStore]);

  return (
    <>
      <Row className="my-3">
        <Col md={6}>
          <GeoCountriesMap
            title="Countries Chart by Recommendations"
            top_countries={top_countries}
            top_countries_loading={top_countries_loading}
            refresh={false}
          />
        </Col>
        <Col md={6}>
          <GeoCountriesTable
            title="GEO Analytics by countries"
            top_countries={top_countries}
            top_countries_loading={top_countries_loading}
            onRefresh={() => dispatch(loadTopCountries())}
          />
        </Col>
      </Row>
    </>
  );
};

export default GeoCountriesPane;
