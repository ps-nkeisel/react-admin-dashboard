import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import AuthProtectedPage from "@/HOC/withAuthProtection";
import AsideLayout from "@/layouts/AsideLayout";
import Settings from "@/scenes/Settings/Settings";

import { updateHost } from "@/services/actions/filter";
import { adjustHost } from "@/utils";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const pathname = router.pathname;
  const query = router.query;

  const { sites } = useSelector(({ session }) => session);
  const filterStore = useSelector(({ filter }) => filter);

  React.useEffect(() => {
    const host = adjustHost(query.host, filterStore.host || sites[0], sites);

    if (host != query.host) {
      query.host = host;
      router.replace({ pathname, query });
    }
    if (host != filterStore.host) {
      dispatch(updateHost(host));
    }
  }, [query]);

  return (
    <AsideLayout>
      <Settings />
    </AsideLayout>
  );
};

export default AuthProtectedPage(SettingsPage);
