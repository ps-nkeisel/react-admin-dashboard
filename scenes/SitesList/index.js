import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TotalStats from "./components/TotalStats";
import { loadSiteStats } from "@/services/actions/sites";
import SitesTable from "./components/SitesTable";

export const SitesListScene = () => {
  const dispatch = useDispatch();
  const sitesStore = useSelector(({ sites }) => sites);

  useEffect(() => {
    dispatch(loadSiteStats());
  }, []);

  return (
    <>
      {/* <div className="d-flex justify-content-between align-items-start mg-b-20 mg-lg-b-25 mg-xl-b-25 pd-xl-b-3">
        {sessionStore && !sessionStore.isisEmailVerified && (
          <div className="alert alert-warning mb-0" role="alert">
            Please, confirm your email
          </div>
        )}
      </div> */}
      <TotalStats
        loading={sitesStore.loading}
        stats={sitesStore.totalStats}
      />
      <SitesTable data={sitesStore.site_stats} loading={sitesStore.loading} />
    </>
  );
};

export default SitesListScene;
