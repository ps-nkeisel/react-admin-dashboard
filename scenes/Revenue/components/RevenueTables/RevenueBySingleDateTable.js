import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Pane } from "evergreen-ui";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlt } from "@fortawesome/pro-solid-svg-icons";
import moment from "moment";

import Loader from "@/components/Loader";
import customStyles from "@/scenes/commonSettings";
import ExportToExcel from "@/components/ExportToExcel";
import { TooltipContainer } from "@/components/Tooltip";

import { kmFormat, num2percent } from "@/utils";

const dollarFormat2Decimals = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const numberFormat = new Intl.NumberFormat();

const RevenueBySingleDateTable = () => {
  const filterStore = useSelector(({ filter }) => filter);
  const sessionStore = useSelector(({ session }) => session);
  const revenueStore = useSelector(({ revenue }) => revenue);
  const { revenue, revenue_loading } = revenueStore;

  const columns = [
    {
      name: (
        <TooltipContainer className="text-center" tooltip="Domain">
          Domain
        </TooltipContainer>
      ),
      sortable: true,
      width: "650px",
      cell: (row) => (
        <Link href={`/revenue?by=domain&host=${row.host}`} prefetch={false}>
          <a>{row.host}</a>
        </Link>
      ),
    },
    {
      name: (
        <TooltipContainer
          className="text-center"
          tooltip="The number impressions that came in to users view"
        >
          Viewable impressions
        </TooltipContainer>
      ),
      sortable: true,
      center: true,
      cell: (row) => `${kmFormat.format(row.pageViews)}`,
    },
    {
      name: (
        <TooltipContainer
          className="text-center"
          tooltip="The NET revenue due to the publisher"
        >
          Net revenue
        </TooltipContainer>
      ),
      sortable: true,
      center: true,
      cell: (row) =>
        `${dollarFormat2Decimals.format(parseFloat(row.revenueVal))}`,
    },
    {
      name: (
        <TooltipContainer className="text-center" tooltip="Viewable CPM">
          vCPM
        </TooltipContainer>
      ),
      sortable: true,
      center: true,
      cell: (row) => `$${row.vcpm.toFixed(2)}`,
    },
    {
      name: (
        <TooltipContainer
          className="text-center"
          tooltip="Total article page views"
        >
          Page Views
        </TooltipContainer>
      ),
      sortable: true,
      center: true,
      cell: (row) => `${kmFormat.format(row.bqPageViews)}`,
    },
    {
      name: (
        <TooltipContainer
          className="text-center"
          tooltip="eCPM calculated on page load"
        >
          eCPM
        </TooltipContainer>
      ),
      sortable: true,
      center: true,
      cell: (row) => `$${row.bQ_eCPM.toFixed(2)}`,
    },
    {
      name: (
        <TooltipContainer
          className="text-center"
          tooltip="The percentage of viewable impressions"
        >
          Viewability
        </TooltipContainer>
      ),
      sortable: true,
      center: true,
      cell: (row) => `${num2percent(row.viewability)}`,
    },
  ];

  const formattedData = React.useMemo(() => {
    return revenue.map((item) => {
      return {
        Domain: item.host,
        "Viewable impressions": numberFormat.format(item.pageViews),
        "Net revenue": dollarFormat2Decimals.format(
          parseFloat(item.revenueVal)
        ),
        vCPM: item.vcpm.toFixed(2),
        "Page Views": kmFormat.format(item.bqPageViews),
        eCPM: item.bQ_eCPM.toFixed(2),
        Viewability: num2percent(item.viewability),
      };
    });
  }, [revenue]);

  return (
    <>
      <Pane
        width="100%"
        paddingBottom={12}
        paddingTop={24}
        className="d-flex justify-content-between"
      >
        <p className="tx-20 tx-spacing-2 tx-normal mg-b-0">
          Revenue Table By Date
        </p>
        <div>
          <ExportToExcel
            excelData={formattedData}
            fileName={`revenue_${sessionStore.apiKey}_${moment(
              filterStore.date
            ).format("YYYY-MM-DD")}`}
          />
        </div>
      </Pane>
      <DataTable
        sortIcon={<FontAwesomeIcon icon={faSortAlt} />}
        customStyles={customStyles}
        columns={columns}
        data={revenue}
        noHeader={true}
        defaultSortField="revenueVal"
        defaultSortAsc={false}
        striped={true}
        dense={true}
        progressPending={revenue_loading}
        progressComponent={<Loader />}
      />
    </>
  );
};

export default RevenueBySingleDateTable;
