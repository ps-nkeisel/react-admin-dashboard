import React from "react";
import AuthProtectedPage from "@/HOC/withAuthProtection";
import PermissionProtectedPage from "@/HOC/withPermissionProtection";
import AsideLayout from "@/layouts/AsideLayout";
import Integration from "@/scenes/Integration/Integration";
import PageHeader from "@/layouts/PageHeader";
import ProfileDropdown from "@/components/ProfileDropdown";

const IntegrationPage = () => {
  return (
    <AsideLayout>
      <PermissionProtectedPage
        page="Integration"
        message="We are sorry, but you do not have permission to view data from this domain"
        Header={
          <div className="content-header tx-11">
            <PageHeader breadcrumbs={["Integration"]} title="Integration" />
            <ProfileDropdown />
          </div>
        }
      >
        <Integration />
      </PermissionProtectedPage>
    </AsideLayout>
  );
};

export default AuthProtectedPage(IntegrationPage);
