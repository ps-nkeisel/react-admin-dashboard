import React, { useState } from "react";
import { Tablist, Tab, Pane } from "evergreen-ui";

import TechOssPane from "./TechOssPane";
import TechBrowsersPane from "./TechBrowsersPane";
import TechDevicesPane from "./TechDevicesPane";

const tabs = [
  {
    title: "OS",
    disabled: false,
  },{
    title: "Browsers",
    disabled: false,
  },{
    title: "Devices",
    disabled: false,
  },
];

const TechPane = () => {
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
        { currentTab === 0 && <TechOssPane /> }
        { currentTab === 1 && <TechBrowsersPane /> }
        { currentTab === 2 && <TechDevicesPane /> }
      </Pane>
    </>
  )
}

export default TechPane;
