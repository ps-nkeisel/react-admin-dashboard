import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Pane } from "evergreen-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSolarSystem } from "@fortawesome/pro-solid-svg-icons";
import {
  faWindows,
  faAndroid,
  faApple,
  faLinux,
} from "@fortawesome/free-brands-svg-icons";
import { faClock } from "@fortawesome/pro-solid-svg-icons";
import orderBy from "lodash/orderBy";
import filter from "lodash/filter";

import "../styles/os-colors.scss";

import { num2percent, kmFormat } from "@/utils";
import moment from "moment";

const OsContainer = () => {
  const [expanded, setExpanded] = useState(false);
  const realtimeStore = useSelector(({ realtime }) => realtime);

  let totalCount = 0;
  let totalWindows = 0;
  let totalWindowsAvgTime = "0:00";
  let oses = filter(realtimeStore.ClientStats.oses, (item) => {
    totalCount += item.count;

    if (item.os.match(/(w|W)indows/g)) {
      totalWindows += item.count;
      if (item.avgTimeOnPage) {
        totalWindowsAvgTime = moment(
          totalWindowsAvgTime,
          moment.HTML5_FMT.TIME_MS
        ).add(moment.duration(item.avgTimeOnPage, moment.HTML5_FMT.TIME_MS));
      }
      return false;
    }
    if (item.os.match(/unknown/g)) {
      return false;
    }
    return true;
  });
  if (totalWindows > 0) {
    oses.push({
      os: "Windows",
      count: totalWindows,
      avgTimeOnPage: totalWindowsAvgTime,
    });
  }

  totalCount = totalCount || 1;

  oses = orderBy(oses, ["count"], ["desc"]);

  const renderOsIcon = (os) => {
    if (os === "windows") {
      return <FontAwesomeIcon icon={faWindows} className="color-os-windows" />;
    } else if (os === "android") {
      return <FontAwesomeIcon icon={faAndroid} className="color-os-android" />;
    } else if (os === "mac os" || os === "mac os x" || os === "ios") {
      return <FontAwesomeIcon icon={faApple} className="color-os-mac" />;
    } else if (os === "linux") {
      return <FontAwesomeIcon icon={faLinux} className="color-os-linux" />;
    } else {
      return (
        <FontAwesomeIcon icon={faSolarSystem} className="color-os-linux" />
      );
    }
  };

  return (
    <Pane className="analytics-top-card analytics-top-card--big-icons">
      <Pane
        className="analytics-top-card__title"
        display="flex"
        alignItems="center"
      >
        <Pane marginRight="auto">
          <span>Os</span>
        </Pane>
      </Pane>
      <Pane className={expanded ? "expanded" : ""}>
        {oses.map((item, index) => (
          <Pane
            key={index}
            display="flex"
            alignItems="center"
            className={
              index > 4
                ? "analytics-top-card__item hidden"
                : "analytics-top-card__item"
            }
          >
            <span className="analytics-top-card__item-left">
              {renderOsIcon(item.os.toLowerCase())}
              <span className="ml-2">{item.os}</span>
            </span>
            <div className="analytics-top-card__numbers ml-auto">
              {item.avgTimeOnPage && (
                <>
                  <FontAwesomeIcon
                    style={{ height: "12px", width: "12px" }}
                    icon={faClock}
                  />{" "}
                  {moment(item.avgTimeOnPage, moment.HTML5_FMT.TIME_MS).format(
                    "mm:ss"
                  )}{" "}
                  |{" "}
                </>
              )}
              {kmFormat.format(item.count)} |{" "}
              {num2percent(item.count / totalCount, 0)}
            </div>
          </Pane>
        ))}
      </Pane>
      {oses.length > 5 && (
        <div className="toggle" onClick={() => setExpanded(!expanded)}>
          {expanded ? "View Less" : "View All"}
        </div>
      )}
    </Pane>
  );
};

export default OsContainer;
