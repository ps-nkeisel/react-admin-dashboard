import React from "react";
import PropTypes from "prop-types";
import { ButtonGroup, Button } from "@blueprintjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faChevronDoubleLeft,
  faChevronDoubleRight
} from "@fortawesome/pro-solid-svg-icons";

const TablePagination = ({
  gotoPage,
  canPreviousPage,
  canNextPage,
  canNextPageOverride,
  nextPage,
  nextPageCallback,
  previousPage,
  pagesNumber,
  pageIndex
}) => {
  return (
    <div className="p-3 pr-4 tx-12 tx-medium text-right tx-color-05">
      <div className="d-inline-block mg-r-20">
        Page <strong className="tx-bold">{pageIndex + 1}</strong>
        <span> {canNextPageOverride ? "" : "of"}</span>{" "}
        <strong className="tx-bold">
          {canNextPageOverride ? "" : pagesNumber}
        </strong>
      </div>
      <ButtonGroup minimal={true}>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <FontAwesomeIcon
            className={!canPreviousPage ? "" : "tx-color-05"}
            icon={faChevronDoubleLeft}
          />
        </Button>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <FontAwesomeIcon
            className={!canPreviousPage ? "" : "tx-color-05"}
            icon={faChevronLeft}
          />
        </Button>
        <Button style={{ pointerEvents: "none" }}>{pageIndex + 1}</Button>
        <Button
          onClick={() => {
            if (nextPageCallback && canNextPageOverride && pageIndex + 1 === pagesNumber) {
              nextPageCallback();
            }
            nextPage();
          }}
          disabled={canNextPageOverride ? !canNextPageOverride : !canNextPage}
        >
          <FontAwesomeIcon
            className={
              canNextPageOverride
                ? !canNextPageOverride
                  ? ""
                  : "tx-color-05"
                : !canNextPage
                ? ""
                : "tx-color-05"
            }
            icon={faChevronRight}
          />
        </Button>
        <Button
          onClick={() => gotoPage(pagesNumber - 1)}
          disabled={canNextPageOverride ? !canNextPageOverride : !canNextPage}
        >
          <FontAwesomeIcon
            className={
              canNextPageOverride
                ? !canNextPageOverride
                  ? ""
                  : "tx-color-05"
                : !canNextPage
                ? ""
                : "tx-color-05"
            }
            icon={faChevronDoubleRight}
          />
        </Button>
      </ButtonGroup>
    </div>
  );
};

TablePagination.propTypes = {
  gotoPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  canNextPage: PropTypes.bool.isRequired,
  canNextPageOverride: PropTypes.bool,
  canPreviousPage: PropTypes.bool.isRequired,
  pageIndex: PropTypes.number.isRequired,
  pagesNumber: PropTypes.number.isRequired,
  nextPageCallback: PropTypes.func
};

export default TablePagination;
