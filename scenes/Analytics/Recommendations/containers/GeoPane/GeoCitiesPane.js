import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from 'react-bootstrap';

import GeoCitiesChart from "../../../components/GeoCitiesChart";
import GeoCitiesTable from "../../../components/GeoCitiesTable";

import {
  loadTopCities,
} from "@/services/actions/analytics/recommendations";

const GeoCitiesPane = () => {
  const dispatch = useDispatch();

  const filterStore = useSelector(({ filter }) => filter);
  const analyticsStore = useSelector(({ analytics }) => analytics);
  const { top_cities, top_cities_loading } = analyticsStore.recommendations;

  useEffect(() => {
    dispatch(loadTopCities());
  }, [filterStore]);

  return (
    <>
      <Row className="my-3">
        <Col md={6} className="text-center">
          <GeoCitiesChart 
            top_cities={top_cities}
            top_cities_loading={top_cities_loading}
          />
        </Col>
        <Col md={6}>
          <GeoCitiesTable
            title="GEO Analytics by cities"
            top_cities={top_cities}
            top_cities_loading={top_cities_loading}
            onRefresh={() => dispatch(loadTopCities())}
          />
        </Col>
      </Row>
    </>
  );
};

export default GeoCitiesPane;
