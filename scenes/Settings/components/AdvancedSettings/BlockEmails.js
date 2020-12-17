import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  advancedSettingsActionTypes,
  setBlockRequest
} from "../../ducks/settings";
import InteractiveListTable from "./InteractiveListTable";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLockAlt,
  faLockOpenAlt,
  faTimes
} from "@fortawesome/pro-solid-svg-icons";
import { Modal } from "react-bootstrap";

const BlockEmails = () => {
  const dispatch = useDispatch();
  const offensiveEmail = useSelector(
    ({ settingsPage }) => settingsPage.offensiveEmail
  );
  const [emails, setEmails] = useState("");
  const [invalidPattern, setInvalidPattern] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [allSites, setAllSites] = useState(false);
  const [validityClass, setValidityClass] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitBlockedEmails = () => {
    dispatch(
      setBlockRequest(
        advancedSettingsActionTypes.BLOCK_EMAIL_REQUEST,
        emails,
        2,
        "block",
        allSites
      )
    );
    setEmails("");
    setValidityClass("");
  };

  const unblockEmail = email => {
    dispatch(
      setBlockRequest(
        advancedSettingsActionTypes.UNBLOCK_EMAIL_REQUEST,
        email,
        2,
        "unblock",
        allSites
      )
    );
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
          <h3 className="tx-20 tx-spacing-1 mg-b-10 mg-lg-b-2">Block commenter(s) by Email ID</h3>
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
          Add the commenters' Email IDs which need to be blocked.
          For multiple Email IDs separate them by 'comma'
        </p>

        <div className="form-group vu-advanced-settings__row">
          <label htmlFor="blockEmail" className="bp3-label">
            Enter Email ID
          </label>
          <input
            className={`form-control ${validityClass}`}
            id="blockEmail"
            placeholder="example@mail.com"
            pattern="^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$|@[^\s,]+\.[^\s,]+"
            onChange={e => setInputState(e.target)}
            value={emails}
          />
          <button
            onClick={() => submitBlockedEmails()}
            className="btn btn-red btn-fill com-widget__btn mg-t-25 mg-b-15 tx-16"
            disabled={emails.length === 0 || invalidPattern}
          >
            Block
          </button>
          {offensiveEmail.length > 0 && (
            <button
              className="btn btn-link btn-sm pl-0 pr-0 ml-auto vu-advanced-settings__toggle w-100"
              onClick={handleShow}
            >
              <FontAwesomeIcon icon={collapsed ? faLockAlt : faLockOpenAlt} />
              See the {offensiveEmail.length} blocked Email ID
              {offensiveEmail.length !== 1 ? "s" : ""}
            </button>
          )}
        </div>
      </form>
      <Modal className="sett-modal" show={show} onHide={handleClose} centered>
        <Modal.Header>
          <h3 className="tx-20 tx-spacing-1 mg-b-10">Blocked Emails</h3>
          <FontAwesomeIcon
            onClick={handleClose}
            icon={faTimes}
            className="tx-color-05 svg-inline--fa fa-w-18"
          ></FontAwesomeIcon>
        </Modal.Header>
        <Modal.Body>
          <InteractiveListTable
            headerName="EMAIL"
            data={offensiveEmail}
            actionCallback={unblockEmail}
            actionMessage="Are you sure you want to unblock"
            actionButtonText="Unblock"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BlockEmails;
