import React, { useState } from "react";
import { useRouter } from "next/router";
import { Tablist, Tab, Pane } from "evergreen-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faBullhorn,
  faTags,
  faFileAlt,
  faGlobeAmericas,
  faLaptop,
  faCaretDown
} from "@fortawesome/pro-solid-svg-icons";

import AnalyticsHeader from "../components/header";
import OverviewPane from "./containers/OverviewPane";
import ModeratorsPane from "./containers/ModeratorsPane";
import TopTagsPane from "./containers/TopTagsPane";
import TopArticlesPane from "./containers/TopArticlesPane";
import GeoPane from "./containers/GeoPane";
import TechPane from "./containers/TechPane";

const tabs = [
  {
    title: "Overview",
    icon: faEye,
    disabled: false
  },
  {
    title: "Moderators",
    icon: faBullhorn,
    disabled: false
  },
  {
    title: "Top Tags",
    icon: faTags,
    disabled: false
  },
  {
    title: "Top Articles",
    icon: faFileAlt,
    disabled: false
  },
  {
    title: "GEO Analytics",
    icon: faGlobeAmericas,
    disabled: false
  },
  {
    title: "Technology - Platform",
    icon: faLaptop,
    disabled: false
  }
];

const CommentsAnalyticsScene = () => {
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
      <AnalyticsHeader title="Comment Analytics" subtitle="Comments" />
      <Pane
        width="100%"
        style={{ flex: 1, overflowY: "auto", backgroundColor: "#f5f7fa" }}
      >
        <div className="pd-lg-x-30 pd-x-15 pd-t-30">
          <div className="w-100 d-none d-lg-block">
            <Tablist>
              {tabs.map((tab, index) => (
                <Tab
                  color={index === currentTab ? "#fff !important" : "#8192a4"}
                  backgroundColor={
                    index === currentTab ? "#3A84FF !important" : "#fff"
                  }
                  minHeight={30}
                  minWidth={145}
                  key={index}
                  id={index}
                  isSelected={index === currentTab}
                  onSelect={() => {
                    setCurrentTab(index)
                    query.tab = index
                    router.push({ pathname, query });
                  }}
                  disabled={tab.disabled}
                >
                  <FontAwesomeIcon
                    icon={tab.icon}
                    className="svg-inline--fa fa-w-18 mr-1"
                  />
                  <span>{tab.title}</span>
                </Tab>
              ))}
            </Tablist>
          </div>
          <div className="w-100 d-block d-lg-none mb-lg-4">
            <div className="pos-relative custom-select--icon mg-b-4">
              <FontAwesomeIcon
                icon={tabs[currentTab].icon}
                className="pos-absolute custom-select__icon left tx-color-05"
              />
              <FontAwesomeIcon
                icon={faCaretDown}
                className="pos-absolute custom-select__icon tx-color-05"
              />
              <select
                className="d-block w-100 custom-select custom-select--large bd mg-b--3"
                id="moderators"
                name="moderators"
                value={currentTab}
                onChange={e => {
                  setCurrentTab(+e.target.value)
                  query.tab = +e.target.value
                  router.push({ pathname, query });
                }}
              >
                {tabs.map((tab, index) => (
                  <option key={index} value={index}>
                    {tab.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="pd-lg-x-30 pd-t-10 mg-t-3 pd-x-15">
          {currentTab === 0 && <OverviewPane />}
          {currentTab === 1 && <ModeratorsPane />}
          {currentTab === 2 && <TopTagsPane />}
          {currentTab === 3 && <TopArticlesPane />}
          {currentTab === 4 && <GeoPane />}
          {currentTab === 5 && <TechPane />}
        </div>
      </Pane>
    </>
  );
};

export default CommentsAnalyticsScene;
