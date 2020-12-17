import React, { useState } from "react";
import { useRouter } from "next/router";
import { Tablist, Tab } from "evergreen-ui";

import CommentsSettingsBlock from '../components/CommentsSettings'
import AdvancedSettings from '../components/AdvancedSettings'

const tabs = [
  { title: "General" },
  { title: "Advanced" },
];

const CommentsSettings = () => {
  const router = useRouter();

  const pathname = router.pathname;
  let query = router.query;

  let { subtab } = query;
  subtab = parseInt(subtab);

  if (!_.includes(_.range(tabs.length), subtab)) {
    subtab = 0;
  }
  if (subtab != query.subtab) {
    query.subtab = subtab;
    router.replace({ pathname, query });
  }

  const [currentTab, setCurrentTab] = useState(subtab);

  return (
    <>
      <div className="d-none d-lg-flex mg-b-20">
        <Tablist display="flex" width="100%">
          {tabs.map((tab, index) => (
            <Tab
              fontSize={16}
              fontFamily="inherit"
              borderRadius={0}
              backgroundColor="transparent !important"
              color={index === currentTab ? "#3A84FF !important" : "#8192a4"}
              borderBottom={
                index === currentTab
                  ? "3px solid #3A84FF !important"
                  : "1px solid #E5E9F2 !important"
              }
              boxShadow="none !important"
              marginX={0}
              minHeight={30}
              key={tab.title}
              id={tab.title}
              isSelected={index === currentTab}
              onSelect={() => {
                setCurrentTab(index)
                query.subtab = index
                router.push({ pathname, query });
              }}
              disabled={index === 5 && !isUserAdmin}
              flexBasis={0}
              flexGrow={1}
              maxWidth="100%"
            >
              <span>{tab.title}</span>
            </Tab>
          ))}
        </Tablist>
      </div>
        <div className="row settings__row">
          <div className="col-12 d-none d-lg-block">
            {currentTab === 0 && <CommentsSettingsBlock />}
            {currentTab === 1 && <AdvancedSettings />}
          </div>

          {/* Mobile block */}
          <div className="col-12 d-block d-lg-none">
            <div className="mb-4">
              <CommentsSettingsBlock />
            </div>
            <div className="mb-4">
              <AdvancedSettings />
            </div>
          </div>
        </div>
    </>
  );
};

export default CommentsSettings;
