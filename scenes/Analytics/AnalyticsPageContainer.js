import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import moment from "moment";

import {
  updateHostAndDateRange,
} from "@/services/actions/filter";
import { 
  adjustHost, 
  adjustDateRange, 
} from '@/utils';

const AnalyticsPageContainer = ( props ) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const pathname = router.pathname;
  const query = router.query;

  const { sites } = useSelector(({ session }) => session);
  const filterStore = useSelector(({ filter }) => filter);

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
    if ( host != filterStore.host || from != moment(filterStore.dateRange[0]).format('YYYY-MM-DD') || to != moment(filterStore.dateRange[1]).format('YYYY-MM-DD') ) {
      dispatch(updateHostAndDateRange(host, [new Date(from), new Date(to)]));
    }
  }, [query]);

  return props.children;
}

export default AnalyticsPageContainer;
