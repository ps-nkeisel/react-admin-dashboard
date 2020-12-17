import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Pane } from "evergreen-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas } from "@fortawesome/pro-solid-svg-icons";
import {
  faSafari,
  faChrome,
  faFirefox,
  faEdge,
  faInternetExplorer,
  faOpera,
  faApple,
  faFacebook,
  faAmazon,
} from "@fortawesome/free-brands-svg-icons";
import { faClock } from "@fortawesome/pro-solid-svg-icons";
import orderBy from "lodash/orderBy";
import sumBy from "lodash/sumBy";

import "../styles/browser-colors.scss";

import { num2percent, kmFormat } from "@/utils";
import moment from "moment";

const BrowsersContainer = () => {
  const [expanded, setExpanded] = useState(false);
  const realtimeStore = useSelector(({ realtime }) => realtime);

  const browsers = orderBy(
    realtimeStore.ClientStats.browsers,
    ["count"],
    ["desc"]
  );
  const totalCount = sumBy(browsers, "count") || 1;

  const renderBrowserIcon = (browser) => {
    if (browser.includes("chrome")) {
      return (
        <FontAwesomeIcon icon={faChrome} className="color-browser-chrome" />
      );
    } else if (browser.includes("firefox")) {
      return (
        <FontAwesomeIcon icon={faFirefox} className="color-browser-firefox" />
      );
    } else if (browser.includes("edge")) {
      return <FontAwesomeIcon icon={faEdge} className="color-browser-edge" />;
    } else if (browser.includes("opera")) {
      return <FontAwesomeIcon icon={faOpera} className="color-browser-opera" />;
    } else if (browser.includes("safari")) {
      return (
        <FontAwesomeIcon icon={faSafari} className="color-browser-safari" />
      );
    } else if (browser.includes("ie")) {
      return (
        <FontAwesomeIcon
          icon={faInternetExplorer}
          className="color-browser-ie"
        />
      );
    } else if (browser.includes("apple")) {
      return <FontAwesomeIcon icon={faApple} className="" />;
    } else if (browser.includes("facebook")) {
      return <FontAwesomeIcon icon={faFacebook} color="#3b5998" />;
    } else if (browser.includes("amazon")) {
      return <FontAwesomeIcon icon={faAmazon} color="#FF9900" />;
    } else {
      return (
        <FontAwesomeIcon icon={faGlobeAmericas} className="color-browser-ie" />
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
          <span>Browsers</span>
        </Pane>
      </Pane>
      <Pane className={expanded ? "expanded" : ""}>
        {browsers.map((item, index) => (
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
              {renderBrowserIcon(item.browser.toLowerCase())}
              <span className="ml-2">{item.browser}</span>
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
                  )} | {" "}
                </>
              )}
              {kmFormat.format(item.count)} |{" "}
              {num2percent(item.count / totalCount, 0)}
            </div>
          </Pane>
        ))}
      </Pane>
      <div className="toggle" onClick={() => setExpanded(!expanded)}>
        {expanded ? "View Less" : "View All"}
      </div>
    </Pane>
  );
};

export default BrowsersContainer;
