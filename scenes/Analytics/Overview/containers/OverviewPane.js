import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

import MonthStatsChart from "../components/MonthStatsChart";
import DeviceBreakdown from "../../components/DeviceBreakdown";
import TopTagsTable from "../components/TopTagsTable";
import Top5Countries from "../components/Top5Countries";
import Top5Cities from "../components/Top5Cities";
import GeoCountriesMap from "../../components/GeoCountriesMap";

import { loadMonthStats } from "@/services/actions/analytics";
import {
  loadTopDevices,
  loadTopTags,
  loadTopCountries,
  loadTopCities
} from "@/services/actions/analytics/comments";

const OverviewPane = () => {
  const dispatch = useDispatch();

  const filterStore = useSelector(({ filter }) => filter);
  const commentsStore = useSelector(({ analytics }) => analytics.comments);
  const {
    top_devices,
    top_devices_loading,
    top_countries,
    top_countries_loading,
    top_cities,
    top_cities_loading
  } = commentsStore;

  useEffect(() => {
    dispatch(loadMonthStats());
    dispatch(loadTopDevices());
    dispatch(loadTopTags());
    dispatch(loadTopCountries(5));
    dispatch(loadTopCities(5));
  }, [filterStore]);

  return (
    <>
      <DeviceBreakdown
        title="Device breakdown by comments"
        top_devices={top_devices}
        top_devices_loading={top_devices_loading}
        onRefresh={() => dispatch(loadTopDevices())}
      />
      <MonthStatsChart />
      <GeoCountriesMap
        title="Countries chart by comments"
        top_countries={top_countries}
        top_countries_loading={top_countries_loading}
        onRefresh={() => dispatch(loadTopCountries(5))}
      />

      <Row className="mb-3 mg-t-20 pd-t-3">
        <Col>
          <TopTagsTable title="Top 5 Tags by Comments" />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Top5Countries
            title="Top 5 Countries"
            top_countries={top_countries}
            top_countries_loading={top_countries_loading}
            onRefresh={() => dispatch(loadTopCountries(5))}
          />
        </Col>
        <Col md={6}>
          <Top5Cities
            title="Top 5 Cities"
            top_cities={top_cities}
            top_cities_loading={top_cities_loading}
            onRefresh={() => dispatch(loadTopCities(5))}
          />
        </Col>
      </Row>
    </>
  );
};

export default OverviewPane;
