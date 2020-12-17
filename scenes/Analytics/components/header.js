import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import moment from "moment";

import ProfileDropdown from "@/components/ProfileDropdown";
import DateRangePicker from "@/components/DateRangePicker";
import HelpButtons from "@/components/HelpButtons";
import SiteListDropdown from "@/components/SiteListDropdown";

import { updateDateRange } from "@/services/actions/filter";

const AnalyticsHeader = props => {
  const { title, subtitle } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  const pathname = router.pathname;
  const query = router.query;

  const ranges = {
    'Yesterday': [
      moment().subtract(1, "days").startOf("day"),
      moment().subtract(1, "days").endOf("day")
    ],
    'Last 2 Weeks': [
      moment().subtract(2, "weeks"),
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
      <div className="mr-auto mt-1">
        <h5>{title}</h5>
        <span className="tx-gray-500">
          <Link href="/" prefetch={false}>
            <a className="text-muted mr-1">Home</a>
          </Link>
          <span className="brdcrmbs__separ px-1">></span>Analytics
          <span className="brdcrmbs__separ px-1">></span> {subtitle}
        </span>
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
      <SiteListDropdown />
      <HelpButtons />
      <ProfileDropdown />
    </div>
  );
};

export default AnalyticsHeader;
