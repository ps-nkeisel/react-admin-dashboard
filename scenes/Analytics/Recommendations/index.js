import React, { useState } from "react";
import { useRouter } from "next/router";
import { Tablist, Tab, Pane, Icon } from "evergreen-ui";

import AnalyticsHeader from "../components/header";
import ArticlesPane from "./containers/ArticlesPane";
import TechPane from "./containers/TechPane";
import GeoPane from "./containers/GeoPane";

const tabs = [
  {
    title: "Articles",
    icon: "circle",
    disabled: false,
  },{
    title: "Technology - Platform",
    icon: "desktop",
    disabled: false,
  },{
    title: "GEO Analytics",
    icon: "globe",
    disabled: false,
  },
];

const RecommendationsAnalyticsScene = () => {
  const router = useRouter();

  const pathname = router.pathname;
  let query = router.query;

  let { tab } = query;
  tab = parseInt(tab);

  if (!_.includes(_.range(tabs.length), tab)) {
    tab = 0;
  }
  if (tab != query.tab) {
    query.tab = tab;
    router.replace({ pathname, query });
  }

  const [currentTab, setCurrentTab] = useState(tab);

  return (
    <>
      <AnalyticsHeader title="Heart (Likes)" subtitle="Heart (Likes)" />
      <Pane width="100%" style={{ flex: 1, overflowY: 'auto' }}>
        <Pane borderBottom padding={12}>
          <Tablist>
          { tabs.map( (tab, index) => (
            <Tab key={index} id={index}
              isSelected={index === currentTab}
              onSelect={() => {
                setCurrentTab(index)
                query.tab = index
                router.push({ pathname, query });
              }}
              disabled={tab.disabled}
            >
              <Icon icon={ tab.icon } color="info" marginRight={8} />
              <span>{ tab.title }</span>
            </Tab>
          ))}
          </Tablist>
        </Pane>
        <Pane width="100%" padding={24}>
          { currentTab === 0 && <ArticlesPane /> }
          { currentTab === 1 && <TechPane /> }
          { currentTab === 2 && <GeoPane /> }
        </Pane>
      </Pane>
    </>
  )
}

export default RecommendationsAnalyticsScene;
