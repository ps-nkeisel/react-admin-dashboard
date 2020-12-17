import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';

import AuthProtectedPage from "@/HOC/withAuthProtection";
import AsideLayout from "@/layouts/AsideLayout";
import ReportsScene from "@/scenes/Reports";

import {
  updateHost,
} from "@/services/actions/filter";
import { 
  adjustHost, 
} from '@/utils';

const ReportsPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const pathname = router.pathname;
  const query = router.query;

  const { sites } = useSelector(({ session }) => session);
  const filterStore = useSelector(({ filter }) => filter);

  React.useEffect(() => {
    const host = adjustHost(query.host, filterStore.host, sites);
  
    if (host != query.host) {
      query.host = host;
      router.replace({ pathname, query });
      dispatch(updateHost(host));
    } 
  }, [query]);

  return (
    <AsideLayout>
      <ReportsScene />
    </AsideLayout>
  );
}

export default AuthProtectedPage(ReportsPage);
