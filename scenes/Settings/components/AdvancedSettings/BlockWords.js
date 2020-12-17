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

const BlockWords = () => {
  const dispatch = useDispatch();
  const offensiveKeywords = useSelector(
    ({ settingsPage }) => settingsPage.offensiveKeywords
  );
  const [words, setWords] = useState("");
  const [invalidPattern, setInvalidPattern] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [allSites, setAllSites] = useState(false);
  const [validityClass, setValidityClass] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitBlockedWords = () => {
    dispatch(
      setBlockRequest(
        advancedSettingsActionTypes.BLOCK_WORD_REQUEST,
        words,
        0,
        "block",
        allSites
      )
    );
    setWords("");
    setValidityClass("");
  };

  const unblockWord = word => {
    dispatch(
      setBlockRequest(
        advancedSettingsActionTypes.UNBLOCK_WORD_REQUEST,
        word,
        0,
        "unblock",
        allSites
      )
    );
  };

  const setInputState = target => {
    setInvalidPattern(target.validity.patternMismatch);
    setWords(target.value);
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
        <div className="d-flex justify-content-between">
          <h3 className="tx-20 tx-spacing-1 mg-b-10 mg-lg-b-2">Block word(s)</h3>
          <div className="custom-control custom-checkbox">
            <input
              className="form-check-input custom-control-input"
              type="checkbox"
              id="applyAllWord"
              value={allSites}
              onChange={e => setAllSites(e.target.checked)}
            />
            <label
              className="custom-control-label tx-color-05"
              htmlFor="applyAllWord"
            >
              Apply to all sites
            </label>
          </div>
        </div>
        <p className="tx-color-05 tx-16 mg-b-20">
          Add the offensive words which needs to be blocked. For multiple words
          separate them by 'comma'.
        </p>

        <div className="form-group vu-advanced-settings__row">
          <label htmlFor="blockWord" className="bp3-label">
            Enter Word
          </label>
          <input
            onChange={e => setInputState(e.target)}
            className={`form-control ${validityClass}`}
            id="blockWord"
            placeholder="Example"
            pattern="(.+[^\s,])(,\s*.+[^,])*"
            value={words}
          />
          <button
            className="btn btn-red btn-fill com-widget__btn mg-t-25 mg-b-15 tx-16"
            onClick={submitBlockedWords}
            disabled={words.length === 0 || invalidPattern}
          >
            Block
          </button>
          {offensiveKeywords.length > 0 && (
            <button
              className="btn btn-link btn-sm pl-0 pr-0 ml-auto vu-advanced-settings__toggle w-100"
              onClick={handleShow}
            >
              <FontAwesomeIcon icon={collapsed ? faLockAlt : faLockOpenAlt} />
              Show {offensiveKeywords.length} blocked word
              {offensiveKeywords.length !== 1 ? "s" : ""}
            </button>
          )}
        </div>
      </form>
      <Modal className="sett-modal" show={show} onHide={handleClose} centered>
        <Modal.Header>
          <h3 className="tx-20 tx-spacing-1 mg-b-10">Blocked Words</h3>
          <FontAwesomeIcon
            onClick={handleClose}
            icon={faTimes}
            className="tx-color-05 svg-inline--fa fa-w-18"
          ></FontAwesomeIcon>
        </Modal.Header>
        <Modal.Body>
          <InteractiveListTable
            headerName="WORD"
            data={offensiveKeywords}
            actionCallback={unblockWord}
            actionMessage="Are you sure you want to unblock"
            actionButtonText="Unblock" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BlockWords;
