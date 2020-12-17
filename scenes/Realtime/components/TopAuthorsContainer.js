import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Pane } from "evergreen-ui";

import { kmFormat } from "@/utils";

const TopAuthorsContainer = () => {
  const [expanded, setExpanded] = useState(false);
  const TopAuthors = useSelector(({ realtime }) => realtime.TopAuthors);

  return (
    <Pane className="analytics-top-card">
      <Pane className="analytics-top-card__title" display="flex" alignItems="center">
        <Pane marginRight="auto">
          <span>Top Authors</span>
        </Pane>
      </Pane>
      <Pane className={expanded ? "expanded": ""}>
      { TopAuthors.map((item, index) => item.Author && item.Count && (
        <Pane 
          key={index}
          display="flex"
          alignItems="center"
          className={index > 4 ? "analytics-top-card__item hidden" : "analytics-top-card__item"}
        >
          <span>{item.Author}</span>
          <div className="analytics-top-card__numbers ml-auto">{kmFormat.format(item.Count)}</div>
        </Pane>
      ))}
      </Pane>
      <div className="toggle" onClick={() => setExpanded(!expanded)}>{expanded ? "View Less": "View All"}</div>
    </Pane>
  );
}

export default TopAuthorsContainer;
