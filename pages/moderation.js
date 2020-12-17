import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import moment from "moment";

import AuthProtectedPage from "@/HOC/withAuthProtection";
import PermissionProtectedPage from "@/HOC/withPermissionProtection";
import AsideLayout from "@/layouts/AsideLayout";
import ModerationScene from "@/scenes/Moderation";
import ModerationHeader from "@/scenes/Moderation/components/header";

import { updateHostAndDateRange } from "@/services/actions/filter";
import { updateTitle } from "@/services/actions/session";
import { adjustHost, adjustDateRange } from "@/utils";

const ModerationPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const pathname = router.pathname;
  const query = router.query;

  const sessionStore = useSelector(({ session }) => session);
  const { sites, fontSize } = sessionStore;
  const filterStore = useSelector(({ filter }) => filter);

  React.useEffect(() => {
    dispatch(updateTitle('Moderation'));
  }, []);

  React.useEffect(() => {
    const host = adjustHost(query.host, filterStore.host, sites);
    const { from, to } = adjustDateRange(
      [query.from, query.to],
      [filterStore.dateRange[0], filterStore.dateRange[1]],
      14
    );

    if (host != query.host || from != query.from || to != query.to) {
      query.host = host;
      query.from = from;
      query.to = to;
      router.replace({ pathname, query });
    }
    if (
      host != filterStore.host ||
      from != moment(filterStore.dateRange[0]).format("YYYY-MM-DD") ||
      to != moment(filterStore.dateRange[1]).format("YYYY-MM-DD")
    ) {
      dispatch(updateHostAndDateRange(host, [new Date(from), new Date(to)]));
    }
  }, [query]);

  return (
    <div style={{ fontSize: `${fontSize}px` }}>
      <AsideLayout>
        <PermissionProtectedPage
          page="Moderation"
          message="We are sorry, but you do not have permission to view data from this domain"
          Header={ModerationHeader}
        >
          <ModerationScene />
        </PermissionProtectedPage>
      </AsideLayout>
    </div>
  );
};

export default AuthProtectedPage(ModerationPage);
