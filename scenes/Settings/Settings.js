import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Tablist, SidebarTab } from "evergreen-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAlt,
  faCreditCard,
  faCog,
  faCaretDown,
  faUserFriends,
  faCommentAltDots
} from "@fortawesome/pro-solid-svg-icons";

import PageHeader from "@/layouts/PageHeader";
import HelpButtons from "@/components/HelpButtons";
import SiteListDropdown from "@/components/SiteListDropdown";
import ProfileDropdown from "@/components/ProfileDropdown";
import ProfileSettings from "./containers/ProfileSettings";
import PaymentDetails from "./containers/PaymentDetails";
import GeneralSettings from "./containers/GeneralSettings";
import CommentsSettings from "./containers/CommentsSettings";
import UserManagement from "./containers/UserManagement";

import "./styles/index.scss";

import {
  getAdminProfileRequest,
  getUserRequest,
  whitelistGetRequest,
  whitelistCountRequest
} from "./ducks/settings";
import { updateTitle } from "@/services/actions/session";

const tabs = [
  { title: "Profile Settings", icon: faUserAlt },
  { title: "Payment Details", icon: faCreditCard },
  { title: "General Settings", icon: faCog },
  { title: "Comments Widget", icon: faCommentAltDots },
  { title: "User Management", icon: faUserFriends }
];

const Settings = () => {
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

  const host = useSelector(({ filter }) => filter.host);
  const token = useSelector(({ session }) => session.token);
  const whitelistedEmail = useSelector(
    ({ settingsPage }) => settingsPage.whitelistedEmail[host]
  );
  const { isUserAdmin, permissions } = useSelector(({ session }) => session);
  const dispatch = useDispatch();

  let userManagePermission = false;
  if (isUserAdmin) {
    userManagePermission = true;
  } else {
    _.map(permissions, perm => {
      if (
        host == perm.host &&
        perm.userPermissions.includes("UserManagement")
      ) {
        userManagePermission = true;
      }
    });
  }

  useEffect(() => {
    dispatch(getAdminProfileRequest());
  }, [host]);

  useEffect(() => {
    if (isUserAdmin) {
      dispatch(getUserRequest());
    }
  }, [token, isUserAdmin]);

  useEffect(() => {
    dispatch(updateTitle(tabs[currentTab].title));
    if (currentTab === 3 && !whitelistedEmail) {
      dispatch(whitelistGetRequest());
      dispatch(whitelistCountRequest(host));
    }
  }, [currentTab, host]);

  return (
    <>
      <div className="content-header tx-11">
        <div className="mr-auto">
          <PageHeader breadcrumbs={["Settings"]} title="Settings" />
        </div>
        <SiteListDropdown excludeAllSites />
        <HelpButtons />
        <ProfileDropdown />
      </div>
      <div className="content-body vu-settings-body bg-ui-06">
        <div className="row">
          <div className="col col-12 col-lg-3 col-lg-2.4">
            <div className="w-100 d-none d-lg-block">
              <Tablist>
                <div>
                  {tabs.map((tab, index) => (
                    <SidebarTab
                      color={
                        index === currentTab ? "#fff !important" : "#8192a4"
                      }
                      backgroundColor={
                        index === currentTab
                          ? "#3A84FF !important"
                          : "#fff !important"
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
                      disabled={index === 5 && !userManagePermission}
                    >
                      <FontAwesomeIcon
                        icon={tab.icon}
                        className="svg-inline--fa fa-w-18 mr-1 ht-auto"
                      />
                      <span>{tab.title}</span>
                    </SidebarTab>
                  ))}
                </div>
              </Tablist>
            </div>
            <div className="w-100 d-block d-lg-none mb-4">
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
          <div className="col col-12 col-lg-9 col-lg-9.6">
            <div
              className={`w-100 pd-y-15 pd-x-10 pd-xl-y-30 pd-xl-x-40 bg-white sett-list ${currentTab === 4 ?  "mx-wd-100p-f" : ""}`}
              style={{ borderRadius: "4px" }}
            >
              {currentTab === 0 && <ProfileSettings />}
              {currentTab === 1 && <PaymentDetails />}
              {currentTab === 2 && <GeneralSettings />}
              {currentTab === 3 && <CommentsSettings />}
              {currentTab === 4 && <UserManagement />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
