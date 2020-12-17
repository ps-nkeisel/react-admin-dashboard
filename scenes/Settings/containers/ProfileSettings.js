import React, { useState } from "react";
import { useRouter } from "next/router";
import { Tablist, Tab } from "evergreen-ui";

import ProfileForm from "../components/ProfileSettings/ProfileForm";
import LoginEmailForm from "../components/ProfileSettings/LoginEmailForm";
import ChangePasswordForm from "../components/ProfileSettings/ChangePasswordForm";

const tabs = [
  { title: "Profile" },
  { title: "Login Email" },
  { title: "Password" }
];

const ProfileSettings = () => {
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
      <div>
        <div className="row settings__row">
          <div className="col-12 d-none d-lg-block">
            {currentTab === 0 && <ProfileForm />}
            {currentTab === 1 && <LoginEmailForm />}
            {currentTab === 2 && <ChangePasswordForm />}
          </div>

          {/* Mobile block */}
          <div className="col-12 d-block d-lg-none">
            <div className="mb-4">
              <ProfileForm />
            </div>
            <div className="mb-4">
              <LoginEmailForm />
            </div>
            <div className="mb-4">
              <ChangePasswordForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
