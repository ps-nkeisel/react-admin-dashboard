import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
} from "@fortawesome/pro-solid-svg-icons";

import {
  setArticleMeta,
} from "@/services/actions/moderation";

const MetaModal = ( props ) => {
  const dispatch = useDispatch();

  const { rowData, show } = props;

  const [title, setTitle] = useState(rowData.title);
  const [uri, setUri] = useState(rowData.uri);
  const [avatar, setAvatar] = useState(rowData.articleAvatar);
  const [tags, setTags] = useState('');

  useEffect(() => {
    setTitle(rowData.title);
    setUri(rowData.uri);
    setAvatar(rowData.articleAvatar);
    setTags('');
  }, [rowData, show]);

  const onChangeMeta = () => {
    dispatch(setArticleMeta(rowData.articleId, title, uri, avatar, tags));
    // props.onClose();
  }

  return (
    <>
      <Modal show={show} onHide={props.onClose}>
        <Modal.Header className="pd-20">
          <Modal.Title>Change Meta</Modal.Title>
          <FontAwesomeIcon onClick={props.onClose} icon={faTimes} className="svg-inline--fa fa-w-18"></FontAwesomeIcon>
        </Modal.Header>
        <Modal.Body className="pd-x-20 pd-y-0">
          <div className="form-group">
            <label className="tx-13 tx-medium tx-spacing-1 mg-b-5 tx-color-03">Article Title</label>
            <input type="text" className="form-control" placeholder="Title" 
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="tx-13 tx-medium tx-spacing-1 mg-b-5 tx-color-03">Url</label>
            <input type="text" className="form-control" placeholder="Url"
              value={uri}
              onChange={(event) => setUri(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="tx-13 tx-medium tx-spacing-1 mg-b-5 tx-color-03">Article Image</label>
            <input type="text" className="form-control" placeholder="Url"
              value={avatar}
              onChange={(event) => setAvatar(event.target.value)}
            />
          </div>

          <div className="form-group mb-1">
            <label className="tx-13 tx-medium tx-spacing-1 mg-b-5 tx-color-03">Tags</label>
            <input type="text" className="form-control" placeholder="Tags"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="pd-20">
          <button type="button" className="btn btn-primary"
            onClick={() => onChangeMeta()}
          >Save</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MetaModal;
