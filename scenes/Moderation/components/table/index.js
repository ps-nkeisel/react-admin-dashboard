import React from "react";

import "../../styles/table.scss";
import TableHeader from "./header";
import TableBody from "./body";
import TableFooter from "./footer";

const ModerationTable = () => {
  return (
    <div className="table-responsive">
      <TableHeader />
      <div className="table moderation-table w-100" cellPadding={10}>
        <TableBody />
        <TableFooter />
      </div>
    </div>
  );
};

export default ModerationTable;
