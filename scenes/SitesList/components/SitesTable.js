import React, { useState } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useTableState
} from "react-table";
import { InputGroup } from "@blueprintjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSortAlt, faPlus } from "@fortawesome/pro-solid-svg-icons";
import classNames from "classnames";

import WidgetCard from "@/components/WidgetCard";
import { TooltipContainer } from "@/components/Tooltip";
import SiteItemDropDown from "./SiteItemDropDown";
import TablePagination from "@/components/TablePagination";
import AddNewSite from "./AddNewSite";

import { kmFormat, num2percent } from "@/utils";

function DefaultColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <div className="sites-filter wd-100p">
      <InputGroup
        leftIcon={
          <FontAwesomeIcon
            style={{ height: "auto" }}
            className="pos-absolute z-index-10 tx-color-05 sites-filter__icon"
            icon={faSearch}
          />
        }
        rightIcon=""
        placeholder="Search..."
        type="search"
        style={{}}
        value={filterValue || ""}
        onChange={e => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
      />
    </div>
  );
}

const SitesTable = ({ data, loading }) => {
  const [shown, setShown] = useState(false);

  const tableColumns = React.useMemo(() => [
    {
      Header: "Site",
      accessor: "host",
      Filter: DefaultColumnFilter,
      Cell: ({ cell }) => (
        <SiteItemDropDown
          host={cell.value}
          onSelect={(path, host) => console.log(path, host)}
        />
      ),
      tooltip: "Host or domain"
    },
    {
      Header: "Page Views",
      accessor: row => kmFormat.format(row.pageViews),
      tooltip: "Total number of article page views for yesterday."
    },
    {
      Header: "Comment Viewability",
      accessor: row => num2percent((row.pageViews > 0 ? row.commentViews / row.pageViews : 0), 1),
      tooltip: "The percentage of times users scrolled down to the comment section"
    },
    {
      Header: "Comments",
      accessor: row => kmFormat.format(row.comments + row.replies),
      tooltip: "Total number of comments posted for yesterday.",
      // className: "text-right",
      // headerClassName: "text-right",
      headerProps: {
        // className: "text-right"
      },
      props: {
        // className: "text-right"
      }
    },
    {
      Header: "Shares",
      accessor: row => kmFormat.format(row.shares),
      tooltip: "Total number of article and comment shares for yesterday."
    },
    {
      Header: "Emotes",
      accessor: row => kmFormat.format(row.emotes),
        tooltip: "Total number of emote clicks for yesterday."
    },
    {
      Header: "Recommendations",
      accessor: row => kmFormat.format(row.recommends),
      tooltip: "Total number likes from share bar"
    },
    {
      Header: "Pending Comments",
      accessor: row => kmFormat.format(row.pending),
      tooltip: "Total number of pending comments"
    }
  ]);

  const {
    getTableProps,
    headerGroups,
    page, // Instead of using 'rows', we'll use page
    prepareRow,
    columns,
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    state: [{ pageIndex, pageSize }]
  } = useTable(
    {
      columns: tableColumns,
      data,
      state: useTableState({ pageIndex: 1, pageSize: 10 })
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const hostColumn = columns.find(item => item.id === "host");

  return (
    <WidgetCard
      title="Your Sites"
      darkerHeader={true}
      className="mt-3"
    >
      <div className="d-md-flex justify-content-between align-items-center">
        <button
          className="order-md-2 
            btn btn-sm pd-x-25 pd-y-10 
            mg-b-20 mg-md-b-0 btn-primary t
            x-14 tx-spacing-1 wd-md-auto wd-100p flex-shrink-0"
          onClick={() => setShown(true)}
        >
          <FontAwesomeIcon
            style={{ height: "auto" }}
            icon={faPlus}
            className="valign-middle fa-w-16"
          />
          <span className="mg-l-8">Add New Site</span>
        </button>
        <div>
          {hostColumn && hostColumn.render("Filter")}
        </div>
      </div>
      <div className="table-overflow-container">
        <table
          {...getTableProps({
            className:
              "table table-borderless table-card-with-search tx-nowrap mg-b-0  mg-t-10"
          })}
        >
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(
                      column.getSortByToggleProps({
                        style: column.id === "host" ? { width: "35%" } : { width: "140px" },
                        className: classNames("tx-spacing-1", "font-weight-bold", {"text-center": column.id !== "host"})
                      })
                    )}
                  >
                    <TooltipContainer className="d-inline-block" tooltip={column.tooltip}>
                      {column.render("Header")}
                      <span>
                        {column.isSorted && (
                          column.isSortedDesc ? (
                            <FontAwesomeIcon
                              style={{
                                transitionDuration: "125ms",
                                transitionProperty: "transform"
                              }}
                              icon={faSortAlt}
                              className="ml-1 tx-12 rotate-0"
                            />
                          ) : (
                            <FontAwesomeIcon
                              style={{
                                transitionDuration: "125ms",
                                transitionProperty: "transform"
                              }}
                              icon={faSortAlt}
                              className="ml-1 tx-12 rotate--180"
                            />
                          )
                        )}
                      </span>
                    </TooltipContainer>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {page.map(
              (row, i) =>
                prepareRow(row) || (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td
                          {...cell.getCellProps({
                            className:
                              cell.column.id !== "host"
                                ? "text-center valign-middle-f"
                                : ""
                          })}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
      <TablePagination
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        pageIndex={pageIndex}
        pagesNumber={pageOptions.length}
      />
      <AddNewSite shown={shown} setShown={setShown} />
    </WidgetCard>
  );
};

export default SitesTable;
