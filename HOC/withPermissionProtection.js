import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

import PermissionErrorScene from "@/scenes/Errors/PermissionError";

const PermissionProtectedPage = props => {
  const { page, Header } = props;

  const { isUserAdmin, permissions, isRevenueEnabled } = useSelector(
    ({ session }) => session
  );
  const { host } = useSelector(({ filter }) => filter);


  let pagePermission = false;
  if (isUserAdmin || ((!host || host == "") && page !== "Integration") || permissions.length == 0) {
    pagePermission = true;
  } else {
    _.map(permissions, perm => {
      if (host == perm.host && perm.userPermissions.includes(page)) {
        pagePermission = true;
      }
    });
  }

  if (page === "Revenue" && !isRevenueEnabled) {
    pagePermission = false;
  }

  if (pagePermission) {
    return props.children;
  } else {
    return (
      <>
        {typeof Header !== 'object' &&  <Header />}
        {typeof Header === 'object' && Header}
        <PermissionErrorScene {...props} />
      </>
    );
  }
};

export default PermissionProtectedPage;
