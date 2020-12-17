import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  whitelistAddRequest,
  whitelistDeleteRequest,
  whitelistGetRequest
} from "../../ducks/settings";
import InteractiveListTable from "./InteractiveListTable";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockAlt, faLockOpenAlt } from "@fortawesome/pro-solid-svg-icons";

const WhitelistEmails = () => {
  const dispatch = useDispatch();
  const host = useSelector(({ filter }) => filter.host);
  const {
    whitelistedEmail,
    hasNextWhitelistPage,
    whiteListLoading,
    whitelistedEmailCount
  } = useSelector(({ settingsPage }) => ({
    whitelistedEmail: settingsPage.whitelistedEmail[host],
    whitelistedEmailCount: settingsPage.whitelistedEmailCounts[host],
    hasNextWhitelistPage: settingsPage.hasNextWhitelistPage,
    whiteListLoading: settingsPage.whiteListLoading,
  }));
  const [emails, setEmails] = useState("");
  const [invalidPattern, setInvalidPattern] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [allSites, setAllSites] = useState(false);
  const [validityClass, setValidityClass] = useState("");

  const submitWhiteListedEmails = () => {
    dispatch(whitelistAddRequest(emails, allSites));
    setEmails("");
    setValidityClass("");
  };

  const unwhitelistEmail = email => {
    dispatch(whitelistDeleteRequest(email, allSites));
  };

  const getNextWhitelistedEmails = () => {
    dispatch(whitelistGetRequest());
  };

  const setInputState = target => {
    setInvalidPattern(target.validity.patternMismatch);
    setEmails(target.value);
    setValidityIndicator(target.value, target.validity.patternMismatch);
  };

  const setValidityIndicator = (value, invalid) => {
    if (value.length === 0) {
      setValidityClass("");
    } else if (value.length > 0 && invalid) {
      setValidityClass("is-invalid");
    } else {
      setValidityClass("is-valid");
    }
  };

  return (
    <>
      <form onSubmit={e => e.preventDefault()}>
        <div className="d-flex justify-content-between mg-t-24">
          <h3 className="tx-20 tx-spacing-1 mg-b-10 mg-lg-b-2">
            Whitelist commenter(s) by Email ID
          </h3>
          <div className="custom-control custom-checkbox">
            <input
              className="form-check-input custom-control-input"
              type="checkbox"
              id="applyAllEmail"
              value={allSites}
              onChange={e => setAllSites(e.target.checked)}
            />
            <label
              className="custom-control-label tx-color-05"
              htmlFor="applyAllEmail"
            >
              Apply to all sites
            </label>
          </div>
        </div>
        <p className="tx-color-05 tx-16 mg-b-20">
          Add the commenters' Email ID which needs to be whitelisted.
        </p>

        <div className="form-group vu-advanced-settings__row">
          <label htmlFor="whitelistEmail" className="bp3-label">
            Enter Email ID
          </label>
          <input
            className={`form-control ${validityClass}`}
            id="whitelistEmail"
            placeholder="example@mail.com"
            pattern="([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,16}(?:\.[a-z]{2})?)$"
            onChange={e => setInputState(e.target)}
            value={emails}
          />
          <button
            onClick={() => submitWhiteListedEmails()}
            className="btn btn-red btn-fill com-widget__btn mg-t-25 tx-16"
            disabled={emails.length === 0 || invalidPattern}
          >
            Whitelist
          </button>
          {whitelistedEmailCount > 0 && (
            <button
              className="btn btn-link btn-sm pl-0 pr-0 ml-auto vu-advanced-settings__toggle w-100"
              onClick={() => setCollapsed(!collapsed)}
            >
              <FontAwesomeIcon icon={collapsed ? faLockAlt : faLockOpenAlt} />
              See the {whitelistedEmailCount} whitelisted Email ID
              {whitelistedEmailCount && whitelistedEmailCount !== 1 ? "s" : ""}
            </button>
          )}
        </div>
      </form>

      <div
        className={collapsed || !whitelistedEmail ? "d-none" : ""}
      >
        <InteractiveListTable
          headerName="EMAIL"
          data={whitelistedEmail}
          actionCallback={unwhitelistEmail}
          actionMessage="Are you sure you want to remove the following email from whitelist -"
          actionButtonText="Remove"
          nextPageOverride={hasNextWhitelistPage}
          nextPageCallback={getNextWhitelistedEmails}
          showLoader={whiteListLoading}
        />
      </div>
    </>
  );
};

export default WhitelistEmails;
