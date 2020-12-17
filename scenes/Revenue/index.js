import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import { Tablist, Tab, Pane } from "evergreen-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faHistory,
  faCaretDown
} from "@fortawesome/pro-solid-svg-icons";

import RevenueHeader from "./components/header";
import WriteUs from "./components/WriteUs";
import RevenuePane from "./containers/RevenuePane";
import RevenuePaymentPane from "./containers/RevenuePaymentPane";

import { updateTitle } from '@/services/actions/session';

const tabs = [
  { title: "Revenue", icon: faDollarSign, disabled: false },
  // { title: "Invoices", icon: faFileInvoiceDollar, disabled: true },
  { title: "Payment History", icon: faHistory, disabled: false }
];

const RevenueScene = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(updateTitle(tabs[currentTab].title));
  }, [currentTab]);

  return (
    <>
      <RevenueHeader />
      <div className="content-body bg-ui-06">
        <WriteUs />
        <div className="w-100 d-none d-lg-block mt-4">
          <Tablist>
          {tabs.map((tab, index) => (
            <Tab
              color={index === currentTab ? "#fff !important" : "#8192a4"}
              backgroundColor={
                index === currentTab ? "#3A84FF !important" : "#fff"
              }
              marginLeft={0}
              marginBottom={8}
              minHeight="auto"
              height="auto"
              fontSize={12}
              lineHeight={1.9}
              paddingTop={4}
              paddingBottom={4}
              minWidth={145}
              key={tab.title}
              id={tab.title}
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
              ></FontAwesomeIcon>
              <span>{tab.title}</span>
            </Tab>
          ))}
          </Tablist>
        </div>
        <div className="w-100 d-block d-lg-none mb-2 mt-4">
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
        <Pane width="100%" paddingTop={24}>
          {currentTab === 0 && <RevenuePane />}
          {currentTab === 1 && <RevenuePaymentPane />}
        </Pane>
      </div>
    </>
  );
};

export default RevenueScene;
