import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
} from "@fortawesome/pro-solid-svg-icons";

import { addNewSite } from "@/services/actions/sites";

const AddNewSite = ({ shown, setShown }) => {
  const dispatch = useDispatch();
  const [siteName, setSiteName] = useState("");
  const [validityClass, setValidityClass] = useState("");

  const setValidityIndicator = (value, invalid) => {
    if (value.length === 0) {
      setValidityClass("");
    } else if (value.length > 0 && invalid) {
      setValidityClass("is-invalid");
    } else {
      setValidityClass("is-valid");
    }
  };

  const updateInputState = target => {
    setValidityIndicator(target.value, !target.validity.valid);
    setSiteName(target.value);
  };

  return (
    <Modal show={shown} onHide={() => setShown(false)}>
      <Modal.Header className="pd-y-20 pd-x-20 pd-sm-x-20">
        <Modal.Title>Add Site</Modal.Title>
        <FontAwesomeIcon onClick={() => setShown(false)} icon={faTimes} className="svg-inline--fa fa-w-18"></FontAwesomeIcon>
      </Modal.Header>
      <Modal.Body className="pd-sm-x-20">
        <form onSubmit={e => e.preventDefault()}>
          <div className="form-group mb-0">
            <label htmlFor="siteNameInput" className="tx-14 tx-medium tx-spacing-1 mg-b-5 tx-color-03">
              Add site to Vuukle Admin, e.g. http://mysite.com
            </label>
            <input
              type="text"
              className={`form-control ${validityClass}`}
              id="siteNameInput"
              placeholder="http://example.com"
              pattern="^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
              value={siteName}
              autoComplete="off"
              onChange={e => updateInputState(e.target)}
              required
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="pd-x-20 pd-b-20">
        <button type="button" className="btn btn-outline-primary" onClick={() => setShown(false)}>Cancel</button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={validityClass !== "is-valid"}
          onClick={() => {
            dispatch(addNewSite(siteName));
            setValidityClass("");
            setSiteName("");
            setShown(false);
          }}
        >
          Add Site
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewSite;
