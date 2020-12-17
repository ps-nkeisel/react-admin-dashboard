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

const BlockIPs = () => {
  const dispatch = useDispatch();
  const offensiveIp = useSelector(
    ({ settingsPage }) => settingsPage.offensiveIp
  );
  const [ips, setIPs] = useState("");
  const [invalidPattern, setInvalidPattern] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [allSites, setAllSites] = useState(false);
  const [validityClass, setValidityClass] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitBlockedIPs = () => {
    dispatch(
      setBlockRequest(
        advancedSettingsActionTypes.BLOCK_IP_REQUEST,
        ips,
        1,
        "block",
        allSites
      )
    );
    setIPs("");
    setValidityClass("");
  };

  const unblockIP = ip => {
    dispatch(
      setBlockRequest(
        advancedSettingsActionTypes.UNBLOCK_IP_REQUEST,
        ip,
        1,
        "unblock",
        allSites
      )
    );
  };

  const setInputState = target => {
    setInvalidPattern(target.validity.patternMismatch);
    setIPs(target.value);
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
          <h3 className="tx-20 tx-spacing-1 mg-b-10 mg-lg-b-2">Block commenter(s)</h3>
          <div className="custom-control custom-checkbox">
            <input
              className="form-check-input custom-control-input"
              type="checkbox"
              id="applyAllIp"
              value={allSites}
              onChange={e => setAllSites(e.target.checked)}
            />
            <label
              className="custom-control-label tx-color-05"
              htmlFor="applyAllIp"
            >
              Apply to all sites
            </label>
          </div>
        </div>
        <p className="tx-color-05 tx-16 mg-b-20">
          Add the commenters' IP Address which need to be blocked.
          For multiple addresses separate them by 'comma'
        </p>

        <div className="form-group vu-advanced-settings__row">
          <label htmlFor="blockIP" className="bp3-label">
            Enter IP
          </label>
            <input
              className={`form-control ${validityClass}`}
              id="blockIP"
              placeholder="127.0.0.1,127.0.0.3-127.0.0.8"
              pattern="(?:[0-9]{1,3}\.){3}[0-9]{1,3}(((\s*,\s*|-)(?:[0-9]{1,3}\.){3}[0-9]{1,3}){1,})?|^([0-9a-fA-F]{4}:){7}[0-9a-fA-F]{4}$|^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^(([0-9a-fA-F]{1}|[1-9a-fA-F]{1}[0-9a-fA-F]{1,3}):){7}([0-9a-fA-F]{1}|[1-9a-fA-F]{1}[0-9a-fA-F]{1,3})$|(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))"
              onChange={e => setInputState(e.target)}
              value={ips}
            />
            <button
              className="btn btn-red btn-fill com-widget__btn mg-t-25 tx-16 mg-b-15"
              disabled={ips.length === 0 || invalidPattern}
              onClick={submitBlockedIPs}
            >
              Block
            </button>
            {offensiveIp.length > 0 && (
              <button
                className="btn btn-link btn-sm pl-0 pr-0 ml-auto w-100 vu-advanced-settings__toggle"
                  onClick={handleShow}
              >
                <FontAwesomeIcon icon={collapsed ? faLockAlt: faLockOpenAlt} />
                See the {offensiveIp.length} blocked IP address
                {offensiveIp.length !== 1 ? "es" : ""}
              </button>
            )}
          
        </div>
      </form>
      <Modal className="sett-modal" show={show} onHide={handleClose} centered>
        <Modal.Header>
          <h3 className="tx-20 tx-spacing-1 mg-b-10">Blocked Commenters</h3>
          <FontAwesomeIcon
            onClick={handleClose}
            icon={faTimes}
            className="tx-color-05 svg-inline--fa fa-w-18"
          ></FontAwesomeIcon>
        </Modal.Header>
        <Modal.Body>
          <InteractiveListTable
            headerName="IP"
            data={offensiveIp}
            actionCallback={unblockIP}
            actionMessage="Are you sure you want to unblock"
            actionButtonText="Unblock"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BlockIPs;
