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

const ModerationHeader = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const pathname = router.pathname;
  const query = router.query;

  const ranges = {
    'Last 24 Hours': [
      moment().subtract(24, "hours"), 
      moment()
    ],
    'Yesterday': [
      moment().subtract(1, "days").startOf("day"),
      moment().subtract(1, "days").endOf("day")
    ],
    'Last 7 Days': [
      moment().subtract(1, "weeks"),
      moment()
    ],
    'Last 2 weeks': [
      moment().subtract(2, "weeks"),
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
        <h5>Moderation</h5>
        <span className="tx-color-05">
          <Link href="/" prefetch={false}>
            <a className="text-muted mr-1">Home</a>
          </Link>
          <span className="brdcrmbs__separ px-1">></span>Moderation
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

export default ModerationHeader;
