import React from "react";
import { useSelector } from "react-redux";
import { Pane } from "evergreen-ui";
import { useTable, useSortBy } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlt } from "@fortawesome/pro-solid-svg-icons";
import classNames from "classnames";

import ExportToExcel from "@/components/ExportToExcel";
import { dollarFormat, kmFormat } from "@/utils";

const RevenueTable = () => {
  const tableData = useSelector(({ revenue }) => revenue.revenue);
  const host = useSelector(({ filter }) => filter.host);
  const apiKey = useSelector(({ session }) => filter.apiKey);

  const memoizedData = React.useMemo(() => tableData, [tableData]);

  const tableColumns = React.useMemo(
    () => [
      {
        Header: "DATE",
        accessor: "entryTimeStamp",
        Cell: ({ cell }) => {
          const date = new Date(cell.value * 1000);
          return date.toISOString().replace(/T.*/, "").split("-").join("-");
        },
      },
      {
        Header: "Viewable impressions",
        accessor: "pageViews",
        Cell: ({ cell }) => `${kmFormat.format(cell.value)}`,
      },
      {
        Header: "Net revenue",
        accessor: "revenueVal",
        Cell: ({ cell }) => `${dollarFormat.format(parseFloat(cell.value))}`,
      },
      {
        Header: "vCPM",
        accessor: "ecpm",
        Cell: ({ cell }) => `${cell.value.toFixed(2)}`,
      },
      {
        Header: "Viewable impressions",
        accessor: "bqPageViews",
        Cell: ({ cell }) => `${kmFormat.format(cell.value)}`,
      },
      {
        Header: "eCPM",
        accessor: "bQ_eCPM",
        Cell: ({ cell }) => `${cell.value.toFixed(2)}`,
      },
    ],
    []
  );

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns: tableColumns,
      data: memoizedData.reverse(),
    },
    useSortBy
  );

  const formattedDataForExcel = React.useMemo(() => {
    return tableData.map((item) => {
      return {
        Date: new Date(item.entryTimeStamp * 1000)
          .toISOString()
          .replace(/T.*/, "")
          .split("-")
          .join("-"),
        "Page Views": kmFormat.format(item.pageViews),
        Revenue: dollarFormat.format(parseFloat(item.revenueVal)),
        ECPM: item.ecpm.toFixed(2),
      };
    });
  }, [tableData]);

  const date = new Date().toISOString().replace(/T.*/, "").split("-").join("-");

  return (
    <>
      <Pane
        width="100%"
        paddingBottom={12}
        paddingTop={24}
        className="d-flex justify-content-between"
      >
        <p className="tx-20 tx-spacing-2 tx-normal mg-b-0">Revenue Table</p>
        <div>
          <ExportToExcel
            excelData={formattedDataForExcel}
            fileName={`revenue_${host || apiKey}_${date}`}
          />
        </div>
      </Pane>
      <Pane width="100%">
        <table
          {...getTableProps({
            className: "table table-borderless tx-nowrap",
          })}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(
                      column.getSortByToggleProps({
                        className: classNames(
                          "tx-spacing-1",
                          "font-weight-bold",
                          { "text-center": column.id !== "entryTimeStamp" }
                        ),
                        style:
                          column.id === "entryTimeStamp"
                            ? { width: "160px" }
                            : { width: "140px" },
                      })
                    )}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FontAwesomeIcon
                            style={{
                              transitionDuration: "125ms",
                              transitionProperty: "transform",
                            }}
                            icon={faSortAlt}
                            className="ml-1 tx-12 rotate-0"
                          />
                        ) : (
                          <FontAwesomeIcon
                            style={{
                              transitionDuration: "125ms",
                              transitionProperty: "transform",
                            }}
                            icon={faSortAlt}
                            className="ml-1 tx-12 rotate--180"
                          />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps({
                          className:
                            cell.column.id === "entryTimeStamp"
                              ? "tx-spacing-1"
                              : "text-center tx-spacing-1",
                          style:
                            cell.column.id === "entryTimeStamp"
                              ? { width: "160px" }
                              : { width: "140px" },
                        })}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Pane>
    </>
  );
};

export default RevenueTable;
