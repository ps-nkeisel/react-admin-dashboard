import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AddReportContainer from "./components/AddReportContainer";
import ReportsHeader from "./components/header";
import SchedulesListContainer from "./components/SchedulesListContainer";

import { updateTitle } from '@/services/actions/session';

const ReportsScene = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateTitle('Reports'));
  }, [])

  return (
    <>
      <ReportsHeader />
      <div className="content-body vu-settings-body bg-ui-06">
        <div className="pd-b-40 pd-lg-b-0 d-lg-flex">
          <AddReportContainer />
          <div className="w-100 pd-lg-l-30">
            <SchedulesListContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportsScene;
