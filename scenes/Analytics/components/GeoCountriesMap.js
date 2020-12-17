import React from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import _ from "lodash";
const VectorMap = dynamic(
  () => import("react-jvectormap").then(mod => mod.VectorMap),
  { ssr: false, loading: () => <Loader /> }
);

import PanelContainer from "./PanelContainer";
import { getCode } from "country-list";

const Map = props => {
  const { title, refresh, top_countries, top_countries_loading } = props;

  let mapData = {};

  Object.keys(top_countries).map(country_name => {
    const country_code = getCode(country_name);
    if (country_code) {
      mapData[country_code] = top_countries[country_name];
    }
  });

  const minVal = _.min(_.values(top_countries));
  const maxVal = _.max(_.values(top_countries));

  const selectList = [
    {
      title: "Countries",
      disabled: false
    },
    {
      title: "Cities",
      disabled: false
    }
  ];

  return (
    <PanelContainer
      title={title}
      refresh={refresh}
      onRefresh={props.onRefresh}
      list={false}
      selectList={selectList}
    >
      {top_countries_loading ? (
        <Loader />
      ) : (
        <VectorMap
          map={"world_mill"}
          backgroundColor="#fff"
          zoomOnScroll={false}
          containerStyle={{
            width: "100%",
            height: "620px",
            borderRadius: 4,
            overflow: "hidden",
            paddingTop: "50px",
            paddingBottom: "50px",
            backgroundColor: "#fff",
            position: "relative"
          }}
          onRegionClick={null}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#E5E9F2",
              stroke: "#E5E9F2",
              "stroke-width": 1,
              "stroke-opacity": 1
            },
            hover: {
              cursor: "pointer",
              "fill-opacity": 0.5,
              "stroke-opacity": 1
            },
            selectedHover: {}
          }}
          regionsSelectable={false}
          series={{
            regions: [
              {
                values: mapData,
                scale: [
                  "#3A84FF",
                  "#66E0E0",
                  "#FFC863",
                  "#FF9684",
                  "#FF76B9k",
                  "#D677EA"
                ],
                normalizeFunction: "linear"
              }
            ],
            markers: [
              {
                attribute: "fill",
                scale: [
                  "#3A84FF",
                  "#66E0E0",
                  "#FFC863",
                  "#FF9684",
                  "#FF76B9k",
                  "#D677EA"
                ],
                normalizeFunction: "linear",
                min: minVal,
                max: maxVal,
                legend: {
                  horizontal: true
                }
              }
            ]
          }}
          onRegionTipShow={(e, el, code) => {
            if (mapData[code] > 0) {
              el.html(el.html() + "</br>" + mapData[code]);
            }
          }}
        />
      )}
    </PanelContainer>
  );
};

export default Map;
