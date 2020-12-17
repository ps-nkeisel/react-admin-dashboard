import React from "react";

import AuthProtectedPage from "@/HOC/withAuthProtection";
import PermissionProtectedPage from "@/HOC/withPermissionProtection";
import AsideLayout from "@/layouts/AsideLayout";
import AnalyticsPageContainer from "@/scenes/Analytics/AnalyticsPageContainer";
import RecommendationsAnalyticsScene from "@/scenes/Analytics/Recommendations";
import AnalyticsHeader from "@/scenes/Analytics/components/header";
import { useDispatch } from "react-redux";
import { updateTitle } from "@/services/actions/session";

const RecommendationsAnalyticsPage = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(updateTitle("Analytics - Recommendations"));
  }, []);

  return (
    <AsideLayout>
      <PermissionProtectedPage
        page="Analytics"
        message="We are sorry, but you do not have permission to view data from this domain"
        Header={AnalyticsHeader}
      >
        <AnalyticsPageContainer>
          <RecommendationsAnalyticsScene />
        </AnalyticsPageContainer>
      </PermissionProtectedPage>
    </AsideLayout>
  );
};

export default AuthProtectedPage(RecommendationsAnalyticsPage);
