import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Pane } from "evergreen-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/pro-solid-svg-icons";

import { kmFormat } from "@/utils";

const TopTagsContainer = () => {
  const [expanded, setExpanded] = useState(false);
  const TopTags = useSelector(({ realtime }) => realtime.TopTags);

  return (
    <Pane className="analytics-top-card">
      <Pane className="analytics-top-card__title" display="flex" alignItems="center">
        <Pane marginRight="auto">
          <span>Top Tags</span>
        </Pane>
      </Pane>
      <Pane className={expanded ? "expanded": ""}>
      { TopTags.map((item, index) => item.Tag && item.Count && (
        <Pane 
          key={index}
          display="flex"
          alignItems="center"
          className={index > 4 ? "analytics-top-card__item hidden" : "analytics-top-card__item"}
        >
          <FontAwesomeIcon icon={faTags}/>
          <span>{item.Tag}</span>
          <div className="analytics-top-card__numbers ml-auto">{kmFormat.format(item.Count)}</div>
        </Pane>
      ))}
      </Pane>
      <div className="toggle" onClick={() => setExpanded(!expanded)}>{expanded ? "View Less": "View All"}</div>
    </Pane>
  );
}

export default TopTagsContainer;
