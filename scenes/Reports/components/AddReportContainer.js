import React from "react";

import ReportForm from './ReportForm';

const AddReportContainer = () => {
  return (
    <div className="vu-reports__add-container">
      <h3 className="tx-20 tx-spacing-1 mb-4">Create new report</h3>
      <ReportForm />
    </div>
  );
};

export default AddReportContainer;
