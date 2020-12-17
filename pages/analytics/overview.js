import React from "react";

import AuthProtectedPage from "@/HOC/withAuthProtection";
import PermissionProtectedPage from "@/HOC/withPermissionProtection";
import AsideLayout from "@/layouts/AsideLayout";
import AnalyticsPageContainer from "@/scenes/Analytics/AnalyticsPageContainer";
import AnalyticsOverviewScene from "@/scenes/Analytics/Overview";
import AnalyticsHeader from "@/scenes/Analytics/components/header";
import { useDispatch } from "react-redux";
import { updateTitle } from "@/services/actions/session";

const AnalyticsOverviewPage = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(updateTitle("Analytics - Overview"));
  }, []);

  return (
    <AsideLayout>
      <PermissionProtectedPage
        page="Analytics"
        message="We are sorry, but you do not have permission to view data from this domain"
        Header={<AnalyticsHeader title="Analytics" subtitle="Overview" />}
      >
        <AnalyticsPageContainer>
          <AnalyticsOverviewScene />
        </AnalyticsPageContainer>
      </PermissionProtectedPage>
    </AsideLayout>
  );
};

export default AuthProtectedPage(AnalyticsOverviewPage);
