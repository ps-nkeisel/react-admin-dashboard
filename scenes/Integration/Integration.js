import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Tablist, Tab } from "evergreen-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faTools, faCaretDown } from "@fortawesome/pro-solid-svg-icons";

import ProfileDropdown from "@/components/ProfileDropdown";
import PageHeader from "@/layouts/PageHeader";
import ApiKeys from "./components/ApiKeys";
import SetupGuide from "./components/SetupGuide";
import { updateTitle } from "@/services/actions/session";

const tabs = [
  {
    title: "API Keys",
    icon: faKey
  },
  {
    title: "Setup Guide",
    icon: faTools
  }
];

const Integration = () => {
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTitle('Integration'));
  }, []);

  useEffect(() => {
    dispatch(updateTitle('Integration - ' + tabs[currentTab].title));
  }, [currentTab]);

  return (
    <div style={{ flex: 1 }}>
      <div className="content-header tx-11">
        <PageHeader breadcrumbs={["Integration"]} title="Integration" />
        <ProfileDropdown />
      </div>
      <div
        className="content-body vu-settings-body bg-ui-06"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "30px",
          backgroundColor: "#F5F7FA"
        }}
      >
        <div>
          <Tablist className="d-lg-block d-none">
            <div>
              {tabs.map((tab, index) => (
                <Tab
                  color={index === currentTab ? "#fff !important" : "#8192a4"}
                  backgroundColor={
                    index === currentTab
                      ? "#3A84FF !important"
                      : "#fff !important"
                  }
                  marginLeft={0}
                  minHeight={30}
                  minWidth={145}
                  key={tab.title}
                  id={tab.title}
                  isSelected={index === currentTab}
                  onSelect={() => {
                    setCurrentTab(index)
                    query.tab = index
                    router.push({ pathname, query });
                  }}
                >
                  <FontAwesomeIcon
                    icon={tab.icon}
                    className="svg-inline--fa fa-w-18 mr-1"
                  ></FontAwesomeIcon>
                  <span>{tab.title}</span>
                </Tab>
              ))}
            </div>
          </Tablist>
          <div className="w-100 d-block d-lg-none mb-2">
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
                  !tab.disabled && (<option key={index} value={index}>
                    {tab.title}
                  </option>)
                ))}
              </select>
            </div>
          </div>
          <div>
            {currentTab === 0 && <ApiKeys />}
            {currentTab === 1 && <SetupGuide />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integration;
