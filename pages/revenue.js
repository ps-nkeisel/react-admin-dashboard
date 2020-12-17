import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import moment from "moment";

import AuthProtectedPage from "@/HOC/withAuthProtection";
import PermissionProtectedPage from "@/HOC/withPermissionProtection";
import AsideLayout from "@/layouts/AsideLayout";
import RevenueScene from "@/scenes/Revenue";
import RevenueHeader from "@/scenes/Revenue/components/header";

import { updateFilter } from "@/services/actions/filter";
import { updateTitle } from "@/services/actions/session";
import { adjustHost, adjustDateRange } from "@/utils";

const RevenuePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const pathname = router.pathname;
  const query = router.query;

  const { sites } = useSelector(({ session }) => session);
  const filterStore = useSelector(({ filter }) => filter);

  React.useEffect(() => {
    dispatch(updateTitle("Revenue"));
  }, []);

  React.useEffect(() => {
    const by = _.find([query.by, "domain"], (b) =>
      _.includes(["domain", "date"], b)
    );
    const host = adjustHost(query.host, filterStore.host, sites);
    const { from, to } = adjustDateRange(
      [query.from, query.to],
      [filterStore.dateRange[0], filterStore.dateRange[1]],
      30
    );
    const date = _.find(
      [query.date, moment().subtract(1, "days").format("YYYY-MM-DD")],
      (d) => moment(d, "YYYY-MM-DD", true).isValid()
    );

    if (by == "domain") {
      if (
        by != query.by ||
        host != query.host ||
        from != query.from ||
        to != query.to
      ) {
        query.by = by;
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
        dispatch(
          updateFilter({
            host,
            dateRange: [new Date(from), new Date(to)],
          })
        );
      }
    } else if (by == "date") {
      if (by != query.by || from != query.from || to != query.to) {
        query.by = by;
        query.from = from;
        query.to = to;
        router.replace({ pathname, query });
      }
      if (
        from != moment(filterStore.dateRange[0]).format("YYYY-MM-DD") ||
        to != moment(filterStore.dateRange[1]).format("YYYY-MM-DD")
      ) {
        dispatch(
          updateFilter({
            dateRange: [new Date(from), new Date(to)],
          })
        );
      }
    }
  }, [query]);

  return (
    <AsideLayout>
      <PermissionProtectedPage
        page="Revenue"
        message="We are sorry, but you do not have permission to view data from this domain"
        Header={RevenueHeader}
      >
        <RevenueScene />
      </PermissionProtectedPage>
    </AsideLayout>
  );
};

export default AuthProtectedPage(RevenuePage);
