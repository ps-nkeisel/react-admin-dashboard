import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faHourglassHalf,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/pro-solid-svg-icons";

import {
  setCommentStatus 
} from "@/services/actions/moderation";

const BulkButtons = () => {
  const dispatch = useDispatch();

  const moderationStore = useSelector(({ moderation }) => moderation);
  const { state, mod_selects } = moderationStore;

  const [showModal, setShowModal] = useState({ show: false, state: 0 });

  const renderSetButtons = () => {
    if (state == 2) {
      //  pending
      return (
        <>
          <button
            className="moderation-table__all-btn btn"
            onClick={() =>
              mod_selects.length >= 5
                ? setShowModal({ show: true, state: 0 })
                : dispatch(setCommentStatus(mod_selects, 0))
            }
          >
            <FontAwesomeIcon
              icon={faThumbsUp}
              className="svg-inline--fa fa-w-18 mr-1"
            ></FontAwesomeIcon>
            Approve all
          </button>
          <button
            className="moderation-table__all-btn btn"
            onClick={() =>
              mod_selects.length >= 5
                ? setShowModal({ show: true, state: 1 })
                : dispatch(setCommentStatus(mod_selects, 1))
            }
          >
            <FontAwesomeIcon
              icon={faThumbsDown}
              className="svg-inline--fa fa-w-18 mr-1"
            ></FontAwesomeIcon>
            Reject all
          </button>
        </>
      );
    } else if (state == 0) {
      // approved
      return (
        <>
          <button
            className="moderation-table__all-btn btn"
            onClick={() =>
              mod_selects.length >= 5
                ? setShowModal({ show: true, state: 2 })
                : dispatch(setCommentStatus(mod_selects, 2))
            }
          >
            <FontAwesomeIcon
              icon={faHourglassHalf}
              className="svg-inline--fa fa-w-18 mr-1"
            ></FontAwesomeIcon>
            Pending all
          </button>
          <button
            className="moderation-table__all-btn btn"
            onClick={() =>
              mod_selects.length >= 5
                ? setShowModal({ show: true, state: 1 })
                : dispatch(setCommentStatus(mod_selects, 1))
            }
          >
            <FontAwesomeIcon
              icon={faThumbsDown}
              className="svg-inline--fa fa-w-18 mr-1"
            ></FontAwesomeIcon>
            Reject all
          </button>
        </>
      );
    } else if (state == 1) {
      // rejected
      return (
        <>
          <button
            className="moderation-table__all-btn btn"
            onClick={() =>
              mod_selects.length >= 5
                ? setShowModal({ show: true, state: 0 })
                : dispatch(setCommentStatus(mod_selects, 0))
            }
          >
            <FontAwesomeIcon
              icon={faThumbsUp}
              className="svg-inline--fa fa-w-18 mr-1"
            ></FontAwesomeIcon>
            Approve all
          </button>
          <button
            className="moderation-table__all-btn btn"
            onClick={() =>
              mod_selects.length >= 5
                ? setShowModal({ show: true, state: 2 })
                : dispatch(setCommentStatus(mod_selects, 2))
            }
          >
            <FontAwesomeIcon
              icon={faHourglassHalf}
              className="svg-inline--fa fa-w-18 mr-1"
            ></FontAwesomeIcon>
            Pending all
          </button>
        </>
      );
    }
  }

  const renderConfirmationModal = () => {
    return (
      <Modal
        show={showModal.show}
        onHide={() => setShowModal({ show: false, state: showModal.state })}
        className="vu-users-table__modal"
      >
        <Modal.Header className="pd-y-20 pd-x-20">
          <Modal.Title>Are you sure?</Modal.Title>
          <FontAwesomeIcon
            onClick={() =>
              setShowModal({ show: false, state: showModal.state })
            }
            icon={faTimes}
            className="svg-inline--fa fa-w-18"
          ></FontAwesomeIcon>
        </Modal.Header>
        <Modal.Body className="pd-b-10">
          <div>
            {showModal.state === 0 &&
              `You're about to Approve - ${mod_selects.length} items`}
            {showModal.state === 1 &&
              `You're about to Reject - ${mod_selects.length} items`}
            {showModal.state === 2 &&
              `You're about to mark as "Pending" - ${mod_selects.length} items`}
          </div>
        </Modal.Body>
        <Modal.Footer className="pd-x-20 pd-y-20">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() =>
              setShowModal({ show: false, state: showModal.state })
            }
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              dispatch(setCommentStatus(mod_selects, showModal.state));
              setShowModal({ show: false, state: showModal.state });
            }}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    );
  };

  if (mod_selects.length > 0) {
    return (
      <>
        { renderSetButtons() }
        { renderConfirmationModal() }
      </>
    );
  } else {
    return <></>
  }
};

export default BulkButtons;
