import React, { useEffect, useState, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useTableState
} from "react-table";
import TablePagination from "@/components/TablePagination";
import Loader from '@/components/Loader';
import { Pane } from "evergreen-ui";
import { Modal } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlt,
  faSearch,
  faLongArrowAltUp,
  faLongArrowAltDown,
  faLockOpenAlt,
  faTimes
} from "@fortawesome/pro-solid-svg-icons";

function FilterInput({ column: { filterValue, setFilter } }) {
  return (
    <div className="pos-relative">
      <input
        placeholder="Search..."
        className="search-input outline-none"
        value={filterValue || ""}
        onChange={e => {
          setFilter(e.target.value || undefined);
        }}
      />
      <FontAwesomeIcon icon={faSearch} className="pos-absolute" />
    </div>
  );
}

const InteractiveListTable = ({
  headerName,
  data,
  actionCallback,
  actionMessage,
  actionButtonText,
  nextPageOverride,
  nextPageCallback,
  showLoader
}) => {
  const memoizedData = useMemo(
    () => (data ? data.map(item => ({ [headerName]: item })) : []),
    [data]
  );
  const [showDialog, setShowDialog] = useState(false);
  const [shownValue, setShownValue] = useState("");

  const tableSetup = useMemo(
    () => [
      {
        Header: headerName,
        accessor: headerName,
        Filter: FilterInput,
        Cell: ({ row }) => (
          <div className="d-flex justify-content-between">
            <p className="align-self-center mb-0">{row.values[headerName]}</p>
            <button
              className="btn btn-link btn-sm pt-0 pb-0 pr-0"
              onClick={() => {
                setShownValue(row.values[headerName]);
                setShowDialog(true);
              }}
            >
              {actionButtonText === "Remove" ? (
                <FontAwesomeIcon icon={faTimes} className="mr-1" />
              ) : (
                <FontAwesomeIcon icon={faLockOpenAlt} className="mr-1" />
              )}
              {actionButtonText}
            </button>

            <Modal
              show={showDialog && shownValue === row.values[headerName]}
              onHide={() => setShowDialog(false)}
              className="vu-users-table__modal"
            >
              <Modal.Header className="pd-y-20 pd-x-20">
                <Modal.Title>Are you sure?</Modal.Title>
                <FontAwesomeIcon
                  onClick={() => setShowDialog(false)}
                  icon={faTimes}
                  className="svg-inline--fa fa-w-18"
                ></FontAwesomeIcon>
              </Modal.Header>
              <Modal.Body className="pd-b-10">
                <div>
                  {actionMessage} <strong>{row.values[headerName]}</strong>?
                </div>
              </Modal.Body>
              <Modal.Footer className="pd-x-20 pd-y-20">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => setShowDialog(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    actionCallback(row.values[headerName]);
                    setShowDialog(false);
                  }}
                >
                  {actionButtonText}
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        )
      }
    ],
    [showDialog]
  );

  const {
    getTableProps,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    prepareRow,
    columns,
    state: [{ pageIndex, pageSize }]
  } = useTable(
    {
      columns: tableSetup,                                                                                                            
      data: memoizedData,
      state: useTableState({ pageIndex: 0, pageSize: 10 })
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const headerColumn = columns.find(item => item.id === headerName);

  useEffect(() => {
    if (!showLoader && nextPageCallback) {
      nextPage();
    }
  }, [showLoader]);

  if (showLoader) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <Pane paddingBottom={12}>
        {headerColumn && headerColumn.render("Filter")}
      </Pane>
      <table
        {...getTableProps({
          className:
            "table vu-advanced-settings__table bg-white table-responsive-xs tx-nowrap mb-0"
        })}
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(
                    column.getSortByToggleProps({
                      className: "font-weight-bold"
                    })
                  )}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FontAwesomeIcon
                          icon={faLongArrowAltDown}
                          className="ml-1"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faLongArrowAltUp}
                          className="ml-1"
                        />
                      )
                    ) : (
                      <FontAwesomeIcon icon={faSortAlt} className="ml-1" />
                    )}
                  </span>
                  <span className="float-right">Options</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <TablePagination
        className="vu-advanced-settings__pagination"
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        pageIndex={pageIndex}
        pagesNumber={pageOptions.length}
        canNextPageOverride={nextPageOverride}
        nextPageCallback={nextPageCallback}
      />
    </>
  );
};

export default InteractiveListTable;
