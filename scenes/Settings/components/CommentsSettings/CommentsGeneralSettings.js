import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentsSettingsActions } from "../../ducks/settings";

import ToTCount from "./ToTCount";
import ToTInterval from "./ToTInterval";
import DefaultSorting from "./DefaultSorting";
import ExternalSearch from "./ExternalSearch";

const CommentsGeneralSettings = () => {
  const dispatch = useDispatch();
  const {
    defaultTotCount,
    defaultTotInterval,
    defaultCommentSorting,
    searchOptions
  } = useSelector(({ settingsPage }) => ({
    defaultTotCount: settingsPage.defaultTotCount,
    defaultTotInterval: settingsPage.defaultTotInterval,
    defaultCommentSorting: settingsPage.defaultCommentSorting,
    searchOptions: settingsPage.searchOptions
  }));
  const [allSites, setAllSites] = useState(false);

  const updateTot = (totCount, e) => {
    if (e && e.target.validity.valid) {
      e.preventDefault();
      dispatch(commentsSettingsActions.updateTotRequest(totCount, allSites));
    }

    if (!e && totCount >= 0 && totCount <= 12) {
      dispatch(commentsSettingsActions.updateTotRequest(totCount, allSites));
    }
  };

  const updateTotInterval = (totIntervalCount, e) => {
    if (e && e.target.validity.valid) {
      e.preventDefault();
      dispatch(
        commentsSettingsActions.updateTotIntervalRequest(
          totIntervalCount,
          allSites
        )
      );
    }

    if (!e && totIntervalCount >= 0 && totIntervalCount <= 12) {
      dispatch(
        commentsSettingsActions.updateTotIntervalRequest(
          totIntervalCount,
          allSites
        )
      );
    }
  };

  const updateDefaultSorting = sortingOption => {
    dispatch(
      commentsSettingsActions.updateDefaultSortingRequest(
        sortingOption,
        allSites
      )
    );
  };

  const updateExternalSearch = searchOptions => {
    dispatch(
      commentsSettingsActions.updateExternalSearchRequest(
        searchOptions,
        allSites
      )
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between mg-t-30">
        <h3 className="tx-20 tx-spacing-1 mg-b-10">General Settings</h3>
        <div className="custom-control custom-checkbox">
          <input
            className="form-check-input custom-control-input"
            type="checkbox"
            id="applyAllTotCount"
            value={allSites}
            onChange={e => setAllSites(e.target.checked)}
          />
          <label
            className="custom-control-label tx-color-05"
            htmlFor="applyAllTotCount"
          >
            Apply to all sites
          </label>
        </div>
      </div>
      <p className="tx-color-05 tx-16 mg-b-20">
        Customize some aspects of Vuukle comments widget
      </p>
      <div className="row settings__row">
        <ToTCount
          updateTot={updateTot}
          defaultTotCount={defaultTotCount}
        />
        <ToTInterval
          updateTotInterval={updateTotInterval}
          defaultTotInterval={defaultTotInterval}
        />
        <DefaultSorting
          defaultSorting={defaultCommentSorting}
          updateSorting={updateDefaultSorting}
        />
        <ExternalSearch
          defaultSearch={searchOptions}
          updateSearch={updateExternalSearch}
        />
      </div>
    </>
  );
};

export default CommentsGeneralSettings;
