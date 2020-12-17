import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Pane } from "evergreen-ui";
import orderBy from "lodash/orderBy";
import filter from "lodash/filter";

import { num2percent, kmFormat } from "@/utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/pro-solid-svg-icons";
import moment from "moment";

const TopReferrersContainer = () => {
  const [expanded, setExpanded] = useState(false);
  const realtimeStore = useSelector(({ realtime }) => realtime);

  let totalCount = 0;
  let totalGoogle = 0;
  let totalFacebook = 0;
  let totalAvgTimeOnGoogle = "0:00";
  let totalAvgTimeOnFacebook = "0:00";
  let top_referrers = filter(realtimeStore.TopReferrers, (item) => {
    totalCount += item.Count;

    if (item.Referrer.match(/(g|G)oogle/g)) {
      totalGoogle += item.Count;
      if (item.AvgTimeOnpage) {
        totalAvgTimeOnGoogle = moment(totalAvgTimeOnGoogle, moment.HTML5_FMT.TIME_MS).add(
          moment.duration(item.AvgTimeOnpage, moment.HTML5_FMT.TIME_MS)
        );
      }
      return false;
    }
    if (item.Referrer.match(/(f|F)acebook/g)) {
      totalFacebook += item.Count;
      if (item.AvgTimeOnpage) {
        totalAvgTimeOnFacebook = moment(totalAvgTimeOnFacebook, moment.HTML5_FMT.TIME_MS).add(
          moment.duration(item.AvgTimeOnpage, moment.HTML5_FMT.TIME_MS)
        );
      }
      return false;
    }
    if (item.Referrer === "") {
      return false;
    }
    return true;
  });
  if (totalGoogle > 0) {
    top_referrers.push({
      Referrer: "Google.com",
      Count: totalGoogle,
      AvgTimeOnpage: totalAvgTimeOnGoogle,
    });
  }
  if (totalFacebook > 0) {
    top_referrers.push({
      Referrer: "Facebook.com",
      Count: totalFacebook,
      AvgTimeOnpage: totalAvgTimeOnFacebook,
    });
  }

  totalCount = totalCount || 1;

  top_referrers = orderBy(top_referrers, ["Count"], ["desc"]);

  return (
    <Pane className="analytics-top-card analytics-top-card--big-icons">
      <Pane
        className="analytics-top-card__title"
        display="flex"
        alignItems="center"
      >
        <Pane marginRight="auto">
          <span>Top Referrers</span>
        </Pane>
      </Pane>
      <Pane className={expanded ? "expanded" : ""}>
        {top_referrers.map((item, index) => (
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
            <span className="d-flex">
              <img
                src={`http://www.google.com/s2/favicons?domain=${item.Referrer}`}
                className="mr-2 flex-shrink-0"
              />
              <span style={{ wordBreak: "break-all" }}>
                {item.Referrer.toLowerCase()}
              </span>
            </span>
            <div className="analytics-top-card__numbers ml-auto">
              {item.AvgTimeOnpage && (
                <>
                  <FontAwesomeIcon
                    style={{ height: "12px", width: "12px" }}
                    icon={faClock}
                  />{" "}
                  {moment(item.AvgTimeOnpage, moment.HTML5_FMT.TIME_MS).format(
                    "mm:ss"
                  )}{" "}
                  |{" "}
                </>
              )}
              {kmFormat.format(item.Count)} |{" "}
              {num2percent(item.Count / totalCount, 0)}
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

export default TopReferrersContainer;
