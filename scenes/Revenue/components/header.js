import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import moment from "moment";

import PageHeader from "@/layouts/PageHeader";
import DateRangePicker from "@/components/DateRangePicker";
import ProfileDropdown from "@/components/ProfileDropdown";
import SiteListDropdown from "@/components/SiteListDropdown";
import HelpButtons from "@/components/HelpButtons";

import { updateDateRange } from "@/services/actions/filter";

const RevenueHeader = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const pathname = router.pathname;
  const query = router.query;

  const ranges = {
    'Last 7 Days': [
      moment().subtract(7, "days"), 
      moment()
    ],
    'Last 14 Days': [
      moment().subtract(14, "days"), 
      moment()
    ],
    'Last 30 Days': [
      moment().subtract(30, "days"),
      moment()
    ],
    'This Month': [
      moment().startOf("month"),
      moment()
    ],
    'Last Month': [
      moment().subtract(1, "months").startOf("month"),
      moment().subtract(1, "months").endOf("month")
    ]
  };

  return (
    <div className="content-header tx-11">
      <div className="mr-auto">
        <PageHeader breadcrumbs={["Revenue"]} title="Revenue" />
      </div>
      <div className="mr-1 date-range">
        <DateRangePicker
          ranges={ranges}
          onChange={selectedRange => {
            dispatch(updateDateRange(selectedRange));
            query.from = moment(selectedRange[0]).format("YYYY-MM-DD");
            query.to = moment(selectedRange[1]).format("YYYY-MM-DD");
            router.push({ pathname, query });
          }}
        />
      </div>
      {router.query.by !== 'date' && <SiteListDropdown />}
      <HelpButtons />
      <ProfileDropdown />
    </div>
  );
};

export default RevenueHeader;