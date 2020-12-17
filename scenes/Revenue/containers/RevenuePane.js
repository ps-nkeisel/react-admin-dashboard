import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Pane, toaster } from "evergreen-ui";
import moment from "moment";

import Loader from "@/components/Loader";
import RevenueStats from "../components/RevenueStats";
import RevenueEcpmBarChart from "../components/RevenueCharts/RevenueEcpmBarChart";
import RevenuePageviewBarChart from "../components/RevenueCharts/RevenuePageviewBarChart";
import RevenuePieChart from "../components/RevenueCharts/RevenuePieChart";
import RevenueByDomainTable from "../components/RevenueTables/RevenueByDomainTable";
import RevenueBySingleDateTable from "../components/RevenueTables/RevenueBySingleDateTable";

import {
  clearError,
  loadRevenueByDomain,
  loadRevenueByDate,
} from "@/services/actions/revenue";

const RevenuePane = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { by } = router.query;

  const { host, dateRange, date } = useSelector(({ filter }) => filter);
  const revenueStore = useSelector(({ revenue }) => revenue);
  const { revenue_loading, error } = revenueStore;

  if (error) {
    console.log(error);
    if (error === "no_revenue_found") {
      toaster.warning(
        "No revenue data was found for the specified date range and site or contact support",
        {
          id: "revenue_error",
          description: "Please try selecting a different date range or site",
        }
      );
    } else {
      toaster.warning("Something went wrong with the data request", {
        id: "revenue_error",
      });
    }
    dispatch(clearError());
  }

  useEffect(() => {
    if (by === "domain") {
      if (
        host !== null &&
        moment(dateRange[0], "YYYY-MM-DD", true).isValid() &&
        moment(dateRange[1], "YYYY-MM-DD", true).isValid()
      ) {
        dispatch(loadRevenueByDomain(host, dateRange[0], dateRange[1]));
      }
    } else if (by === "date") {
      if (
        moment(dateRange[0], "YYYY-MM-DD", true).isValid() &&
        moment(dateRange[1], "YYYY-MM-DD", true).isValid()
      ) {
        dispatch(loadRevenueByDate(dateRange[0], dateRange[1]));
      }
    }
  }, [by, host, dateRange, date]);

  return (
    <>
      {revenue_loading ? (
        <Loader />
      ) : (
        <Pane>
          <RevenueStats />
          {by == "domain" && (
            <>
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <RevenueEcpmBarChart />
                </div>
                <div className="col-lg-6 col-md-12">
                  <RevenuePageviewBarChart />
                </div>
              </div>
              <RevenueByDomainTable />
            </>
          )}
          {by == "date" && (
            <>
              <div className="row">
                <div className="col-12">
                  <RevenuePieChart />
                </div>
              </div>
              <RevenueBySingleDateTable />
            </>
          )}
        </Pane>
      )}
    </>
  );
};

export default RevenuePane;
