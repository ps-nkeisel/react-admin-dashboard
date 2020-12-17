import React from "react";
import { Modal } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
} from "@fortawesome/pro-solid-svg-icons";

import ReplyThread from "./thread";

const ReplyThreadModal = ( props ) => {
  const { show, commentThread, loadingThread } = props;

  return (
    <>
      <Modal show={show} onHide={props.onClose}>
        <Modal.Header className="pd-y-20 pd-x-20 pd-sm-x-30">
          <Modal.Title>Reply Thread</Modal.Title>
          <FontAwesomeIcon onClick={props.onClose} icon={faTimes} className="svg-inline--fa fa-w-18"></FontAwesomeIcon>
        </Modal.Header>
        <Modal.Body>
          { commentThread && !loadingThread ? (
            <ReplyThread commentThread={commentThread} />
          ):(
            <span>Loading...</span>
          )}
        </Modal.Body>
        <Modal.Footer className="pd-x-20 pd-y-15">
          <button type="button" className="btn btn-outline-primary" onClick={props.onClose}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReplyThreadModal;
