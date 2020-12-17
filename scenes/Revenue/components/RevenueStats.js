import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RevenueStat from "./RevenueStat";
import { dollarFormat, kmFormat } from "@/utils";
import {
  faDollarSign,
  faEye,
  faHandHoldingUsd,
  faSortCircle
} from "@fortawesome/pro-solid-svg-icons";

import { updateTitle } from '@/services/actions/session';

const RevenueStats = () => {
  const dispatch = useDispatch();
  const data = useSelector(({ revenue }) => revenue.revenue);

  const revenueVal = data.reduce((a, b) => a + b.revenueVal, 0);
  const pageViews = data.reduce((a, b) => a + b.pageViews, 0);
  const vcpm = pageViews > 0 ? (revenueVal / pageViews) * 1000 : 0;
  const bqPageViews = data.reduce((a, b) => a + b.bqPageViews, 0);
  const ecpm = bqPageViews > 0 ? (revenueVal / bqPageViews) * 1000 : 0;
  const viewability = pageViews / bqPageViews * 100;

  React.useEffect(() => {
    dispatch(updateTitle(`Revenue - ${dollarFormat.format(revenueVal)}`));
  }, [data]);

  return (
    <div className="row mg-x--5 mg-lg-x--10">
      <RevenueStat
        icon={faDollarSign}
        borderColor="bd-ui-08-2"
        background="bg-ui-08"
        title="Net Revenue"
        amount={dollarFormat.format(revenueVal)}
      />
      <RevenueStat
        icon={faEye}
        borderColor="bd-ui-09-2"
        background="bg-ui-09"
        title="Viewable impressions"
        amount={kmFormat.format(pageViews)}
      />
      <RevenueStat
        icon={faHandHoldingUsd}
        borderColor="bd-ui-12-2"
        background="bg-ui-12"
        title="vCPM"
        amount={`$${vcpm.toFixed(2)}`}
      />
      <RevenueStat
        icon={faEye}
        borderColor="bd-ui-09-2"
        background="bg-ui-09"
        title="Page Views"
        amount={kmFormat.format(bqPageViews)}
      />
      <RevenueStat
        icon={faHandHoldingUsd}
        borderColor="bd-ui-12-2"
        background="bg-ui-12"
        title="eCPM"
        amount={`$${ecpm.toFixed(2)}`}
      />
      <RevenueStat
        icon={faSortCircle}
        borderColor="bd-ui-11-2"
        background="bg-ui-11"
        title="Viewability"
        amount={`${viewability.toFixed(2)}%`}
      />
    </div>
  );
};

export default RevenueStats;
