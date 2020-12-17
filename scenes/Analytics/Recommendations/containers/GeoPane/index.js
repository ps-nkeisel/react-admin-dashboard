import React, { useState } from "react";
import { Tablist, Tab, Pane } from "evergreen-ui";

import GeoCountriesPane from "./GeoCountriesPane";
import GeoCitiesPane from "./GeoCitiesPane";

const tabs = [
  {
    title: "Countries",
    disabled: false,
  },{
    title: "Cities",
    disabled: false,
  },
];

const GeoPane = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <Pane borderBottom padding={12}>
        <Tablist>
        { tabs.map( (tab, index) => (
          <Tab key={index} id={index}
            isSelected={index === currentTab}
            onSelect={() => setCurrentTab(index)}
            disabled={tab.disabled}
          >
            <span>{ tab.title }</span>
          </Tab>
        ))}
        </Tablist>
      </Pane>
      <Pane width="100%">
        { currentTab === 0 && <GeoCountriesPane /> }
        { currentTab === 1 && <GeoCitiesPane /> }
      </Pane>
    </>
  )
}

export default GeoPane;
