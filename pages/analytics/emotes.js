import React from "react";

import AuthProtectedPage from "@/HOC/withAuthProtection";
import PermissionProtectedPage from "@/HOC/withPermissionProtection";
import AsideLayout from "@/layouts/AsideLayout";
import AnalyticsPageContainer from "@/scenes/Analytics/AnalyticsPageContainer";
import EmotesAnalyticsScene from "@/scenes/Analytics/Emotes";
import AnalyticsHeader from "@/scenes/Analytics/components/header";
import { useDispatch } from "react-redux";
import { updateTitle } from "@/services/actions/session";

const EmotesAnalyticsPage = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(updateTitle("Analytics - Emotes"));
  }, []);

  return (
    <AsideLayout>
      <PermissionProtectedPage
        page="Analytics"
        message="We are sorry, but you do not have permission to view data from this domain"
        Header={<AnalyticsHeader title="Emote" subtitle="Emotes" />}
      >
        <AnalyticsPageContainer>
          <EmotesAnalyticsScene />
        </AnalyticsPageContainer>
      </PermissionProtectedPage>
    </AsideLayout>
  );
};

export default AuthProtectedPage(EmotesAnalyticsPage);
