import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
} from "@fortawesome/pro-solid-svg-icons";

import {
  postComment,
} from "@/services/actions/moderation";

const ReplyModal = ( props ) => {
  const dispatch = useDispatch();

  const { rowData, show } = props;

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    setCommentText('');
  }, [rowData, show]);

  const onReply = () => {
    const { apiKey, articleAvatar, articleId, authorType, host, lang, spamValue, tag, title, topComment, toxicity} = rowData;

    const comment = {
      apiKey, articleAvatar, articleId, authorType, host, lang, spamValue, tag, title, topComment, toxicity,
      commentText,
      parentId: rowData.id,
      parentTimestamp: rowData.createdTimestamp,
      uri: `https://${host}/`,
    }

    dispatch(postComment(comment));

    props.onClose();
  }

  return (
    <>
      <Modal show={show} onHide={props.onClose}>
        <Modal.Header className="pd-y-20 pd-x-20">
          <Modal.Title>Your comment:</Modal.Title>
          <FontAwesomeIcon onClick={props.onClose} icon={faTimes} className="svg-inline--fa fa-w-18"></FontAwesomeIcon>
        </Modal.Header>
        <Modal.Body>
          <div>
            <textarea className="form-control" placeholder="" rows={4}
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="pd-x-20 pd-y-15">
          <button type="button" className="btn btn-outline-primary" onClick={props.onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={onReply}>Send</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReplyModal;
