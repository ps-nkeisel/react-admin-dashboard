import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch } from "@blueprintjs/core";
import {
  generalSettingsActionTypes,
  setFlagRequest
} from "../../ducks/settings";

const BlockWordSwitches = () => {
  const dispatch = useDispatch();
  const objKeywordExactMatch = useSelector(
    ({ settingsPage }) => settingsPage.objKeywordExactMatch
  );
  const [checked, setChecked] = useState(false);
  const [allSites, setAllSites] = useState(false);

  useEffect(() => {
    setChecked(objKeywordExactMatch);
  }, [objKeywordExactMatch]);

  const toggleExactMatching = value => {
    setChecked(value);
    dispatch(
      setFlagRequest(
        generalSettingsActionTypes.SET_EXACT_BLOCK_WORD_MATCH_REQUEST,
        value,
        4,
        allSites
      )
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h4 className="mg-b-10 pd-b-2">Block words exact match</h4>
        <div className="custom-control flex-shrink-0 custom-checkbox">
          <input
            className="form-check-input custom-control-input"
            type="checkbox"
            id="applyAllBlockWord"
            value={allSites}
            onChange={e => setAllSites(e.target.checked)}
          />
          <label
            className="custom-control-label tx-color-05"
            htmlFor="applyAllBlockWord"
          >
            Apply to all sites
          </label>
        </div>
      </div>
      <div className="bg-white pd-t-12 pd-b-2 mg-b-15 rounded-4">
        <Switch
          checked={checked}
          onChange={e => toggleExactMatching(e.target.checked)}
          label="Block words exact match"
        />
      </div>
    </>
  );
};

export default BlockWordSwitches;
