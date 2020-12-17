import React from "react";

import AuthProtectedPage from "@/HOC/withAuthProtection";
import PermissionProtectedPage from "@/HOC/withPermissionProtection";
import AsideLayout from "@/layouts/AsideLayout";
import AnalyticsPageContainer from "@/scenes/Analytics/AnalyticsPageContainer";
import CommentsAnalyticsScene from "@/scenes/Analytics/Comments";
import AnalyticsHeader from "@/scenes/Analytics/components/header";
import { useDispatch } from "react-redux";
import { updateTitle } from "@/services/actions/session";

const CommentsAnalyticsPage = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(updateTitle("Analytics - Comments"));
  }, []);

  return (
    <AsideLayout>
      <PermissionProtectedPage
        page="Analytics"
        message="We are sorry, but you do not have permission to view data from this domain"
        Header={<AnalyticsHeader title="Comment Analytics" subtitle="Comments" />}
      >
        <AnalyticsPageContainer>
          <CommentsAnalyticsScene />
        </AnalyticsPageContainer>
      </PermissionProtectedPage>
    </AsideLayout>
  );
};

export default AuthProtectedPage(CommentsAnalyticsPage);
