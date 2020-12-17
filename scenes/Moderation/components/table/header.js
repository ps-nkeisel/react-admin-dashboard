import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faTimes,
  faTag,
  faRedoAlt,
  faSlidersH
} from "@fortawesome/pro-solid-svg-icons";

import ModerationSearch from "../search";
import BulkButtons from "./bulkButtons";
import Loader from "@/components/Loader";

import {
  updateTag,
  updateSortDir,
  updatePageSize,
  updateSearchType,
  updateSearchParam,
  updateSearchTypeAndParam,
  selectModAll
} from "@/services/actions/moderation";
import { pageSizes, searchTypes } from '../../constants';

import { updateTitle } from "@/services/actions/session";
import { kmFormat } from '@/utils';

const TableHeader = () => {
  const dispatch = useDispatch();

  const [isShown, setIsShown] = useState(false);
  const moderationStore = useSelector(({ moderation }) => moderation);
  const { moderations, search_type, state, mod_selects, commentsCount } = moderationStore;
  const allSelected = mod_selects.length == moderations.length;

  const clearParams = () => {
    dispatch(updateTag(""));
    updateSearchTypeAndParam('', '');
    dispatch(updatePageSize(25));
    dispatch(updateSortDir(1));
  };

  useEffect(() => {
    if (state === 0) {
      dispatch(updateTitle(`Moderation - Approved - ${kmFormat.format(commentsCount.approved)}`));
    } else if (state === 1) {
      dispatch(updateTitle(`Moderation - Rejected - ${kmFormat.format(commentsCount.rejected)}`));
    } else if (state === 2) {
      dispatch(updateTitle(`Moderation - Pending - ${kmFormat.format(commentsCount.pending)}`));
    } else if (state === 3) {
      dispatch(updateTitle(`Moderation - Flagged - ${kmFormat.format(commentsCount.flagged)}`));
    } else {
      dispatch(updateTitle('Moderation'));
    }
  }, [commentsCount, state]);

  const renderFilters = () => {
    return (
      <>
        <div className="moderation-filters__item d-flex">
          <select
            id="pageSize"
            className="form-control"
            value={moderationStore.pageSize}
            onChange={event => dispatch(updatePageSize(event.target.value))}
          >
          {pageSizes.map((item, index) => (
            <option key={index} value={item}>{item} items</option>
          ))}
          </select>
          <FontAwesomeIcon
            icon={faCaretDown}
            className="svg-inline--fa fa-w-18 mr-1"
          ></FontAwesomeIcon>
        </div>
        <div className="moderation-filters__item d-flex">
          <select
            className="form-control"
            value={moderationStore.sort_dir}
            onChange={event =>
              dispatch(updateSortDir(event.target.value))
            }
          >
            <option value="1">Most recent</option>
            <option value="-1">Oldest</option>
          </select>
          <FontAwesomeIcon
            icon={faCaretDown}
            className="svg-inline--fa fa-w-18 mr-1"
          ></FontAwesomeIcon>
        </div>

        <div className="moderation-filters__item d-flex">
          <select
            className="form-control"
            value={moderationStore.tag}
            onChange={event => dispatch(updateTag(event.target.value))}
          >
            <option value="">Tags</option>
            {moderationStore.tags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <FontAwesomeIcon
            icon={faCaretDown}
            className="svg-inline--fa fa-w-18 mr-1"
          ></FontAwesomeIcon>
        </div>
        <div className="moderation-filters__item d-flex">
          <select
            className="form-control"
            value={search_type}
            onChange={event => dispatch(updateSearchType(event.target.value))}
          >
          { searchTypes.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
          </select>
          <FontAwesomeIcon
            icon={faCaretDown}
            className="svg-inline--fa fa-w-18 mr-1"
          ></FontAwesomeIcon>
        </div>
      </>
    );
  };

  const renderActiveFilters = () => {
    if (
      moderationStore.tag ||
      moderationStore.search_type ||
      moderationStore.search_param
    ) {
      return (
        <div className="moderation-table__active-filters border-bottom d-none d-lg-flex">
          {moderationStore.tag && (
            <button className="btn btn-white">
              <FontAwesomeIcon
                icon={faTag}
                className="svg-inline--fa fa-w-18 mr-1"
              ></FontAwesomeIcon>
              <span>{moderationStore.tag}</span>
              <FontAwesomeIcon
                icon={faTimes}
                className="svg-inline--fa fa-w-18"
                onClick={() => dispatch(updateTag(""))}
              ></FontAwesomeIcon>
            </button>
          )}

          { moderationStore.search_param && (
            <button className="btn btn-white">
              { moderationStore.search_type && (
                <>
                  <span>{moderationStore.search_type}</span>
                  { moderationStore.search_type == 'SpamValue' ? '>=' : '=' }
                </>
              ) }
              { moderationStore.search_param && (
                <span>{moderationStore.search_param}</span>
              )}
              <FontAwesomeIcon
                icon={faTimes}
                className="svg-inline--fa fa-w-18"
                onClick={() => dispatch(updateSearchTypeAndParam('', ''))}
              ></FontAwesomeIcon>
            </button>
          ) }
        </div>
      );
    }
  };

  const renderSelectAllBox = () => (
    <div className="custom-control custom-checkbox pd-l-15">
      <input
        type="checkbox"
        className="custom-control-input"
        id="check-0"
        checked={allSelected}
        onChange={event => dispatch(selectModAll(event.target.checked))}
      />
      <label className="custom-control-label" htmlFor="check-0" />
    </div>
  )

  return (
    <div>
      <div className="d-flex align-items-start">
        <div className="moderation-table__head">
          {renderActiveFilters()}
          <div className="text-uppercase text-secondary tx-13 d-flex align-items-center justify-content-between">
            <div className="d-none d-lg-block">
            {moderations.length > 0 && 
              renderSelectAllBox()
            }
            </div>
            <div className="form-group moderation-filters">
              <div className="d-flex">
                <div className="d-none d-lg-flex">{renderFilters()}</div>
                <ModerationSearch />
              </div>
            </div>
            <div>
              <button
                className="btn btn-outline-primary moderation-filters__clear d-none d-lg-block"
                onClick={() => clearParams()}
              >
                <FontAwesomeIcon
                  icon={faRedoAlt}
                  className="svg-inline--fa fa-w-18"
                ></FontAwesomeIcon>
              </button>
            </div>
            <div className="d-none d-lg-flex">
              <BulkButtons />
            </div>
          </div>
        </div>
        <button
          className="btn btn-outline-primary moderation-filters__toggle d-block d-lg-none"
          onClick={() => setIsShown(true)}
        >
          <FontAwesomeIcon
            icon={faSlidersH}
            className="svg-inline--fa fa-w-18"
          ></FontAwesomeIcon>
        </button>

        <Modal show={isShown} onHide={() => setIsShown(false)}>
          <Modal.Header className="pd-20">
            <Modal.Title>Search Filters</Modal.Title>
            <FontAwesomeIcon
              onClick={() => setIsShown(false)}
              icon={faTimes}
              className="svg-inline--fa fa-w-18"
            ></FontAwesomeIcon>
          </Modal.Header>
          <Modal.Body className="pd-x-20 pd-y-0">{renderFilters()}</Modal.Body>
          <Modal.Footer className="pd-20">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => clearParams()}
            >
              Reset Filters
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsShown(false)}
            >
              Save Filters
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="d-flex d-lg-none justify-content-between mb-2 pb-1">
        {moderations.length > 0 && 
          renderSelectAllBox()
        }
        <div className="d-flex d-lg-none justify-content-between">
          <BulkButtons />
        </div>
      </div>
      {moderationStore.loading && <Loader />}
    </div>
  );
};

export default TableHeader;
