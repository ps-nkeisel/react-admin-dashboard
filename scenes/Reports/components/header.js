import React from "react";
import Link from "next/link";

import ProfileDropdown from "@/components/ProfileDropdown";
import SiteListDropdown from "@/components/SiteListDropdown";
import HelpButtons from "@/components/HelpButtons";

const ReportsHeader = ( props ) => {
  return (
    <div className="content-header tx-11">
      <div className="mr-auto mt-1">
        <h5>Reports</h5>
        <span className="tx-gray-500">
          <Link href="/" prefetch={false}>
            <a className="text-muted mr-1">Home</a>
          </Link>
          <span className="brdcrmbs__separ px-1">></span>Reports
        </span>
      </div>
      <SiteListDropdown />
      <HelpButtons />
      <ProfileDropdown />
    </div>
  );
};

export default ReportsHeader;
