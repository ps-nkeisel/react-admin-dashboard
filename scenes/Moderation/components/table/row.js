import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { Icon, Popover, Menu, Position } from "evergreen-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faReply, 
  faShare,
  faEdit,
  faCommentAlt,
  faExternalLink,
  faUserAlt,
  faUserClock,
  faTag,
  faThumbsUp,
  faThumbsDown,
  faHourglassHalf
} from "@fortawesome/pro-solid-svg-icons";

import moment from "moment";
import classNames from "classnames";

import MetaModal from "../modals/meta";
import ReplyModal from "../modals/reply";

import {
  updateTag,
  blockIP,
  blockEmail,
  updateCommentText,
  updateSearchTypeAndParam,
  setArticleStatus,
  setCommentStatus,
  loadCommentThread,
  selectMod,
  whiteListEmail
} from "@/services/actions/moderation";
import {
  updateHost
} from "@/services/actions/filter";
import {
  getArticleStatus
} from "@/services/api/moderation";
import { COMMENT_MAX_LENGTH } from '../../constants';

import { stripHtml } from '@/utils';

const TableRow = ( props ) => {
  const dispatch = useDispatch();

  const sessionStore = useSelector(({ session }) => session);
  const { token } = sessionStore;

  const filterStore = useSelector(({ filter }) => filter);

  const moderationStore = useSelector(({ moderation }) => moderation);

  const { rowData, selected } = props;
  const { id } = rowData;

  const [isEdit, setIsEdit] = useState(false);
  const [commentText, setCommentText] = useState(rowData.commentText);
  const [newCommentText, setNewCommentText] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [apiArticleStatus, setApiArticleStatus] = useState(0);
  const [readmore, setReadMore] = useState(false);
  const [metaModal, showMetaModal] = useState(false);
  const [replyModal, showReplyModal] = useState(false);
  // const [isArticlePopShow, setArticlePopShow] = useState(true);

  const curretStyle = { cursor: 'pointer', color: '#8192A4', width: '18px', height: '18px' };

  const renderSetButtons = () => {
    const { state } = rowData;

    if (state == 2) {           // pending
      return (
        <>
          <button className="btn btn-simple text-nowrap"
            onClick={() => dispatch(setCommentStatus([id], 0))}
          >
            <FontAwesomeIcon icon={faThumbsUp}  className="mr-2" />
            Approve
          </button>
          <button className="btn text-nowrap btn-simple"
            onClick={() => dispatch(setCommentStatus([id], 1))}
          >
            <FontAwesomeIcon icon={faThumbsDown}  className="mr-2" />
            Reject
          </button>
        </>
      )
    } else if (state == 0) {    // approved
      return (
        <>
          <button className="btn text-nowrap btn-simple"
            onClick={() => dispatch(setCommentStatus([id], 2))}
          >
            <FontAwesomeIcon icon={faHourglassHalf}  className="mr-2" />
            Pending
          </button>
          <button className="btn text-nowrap btn-simple"
            onClick={() => dispatch(setCommentStatus([id], 1))}
          >
            <FontAwesomeIcon icon={faThumbsDown}  className="mr-2" />
            Reject
          </button>
        </>
      )
    } else if (state == 1) {    // rejected
      return (
        <>
          <button className="btn btn-simple text-nowrap"
            onClick={() => dispatch(setCommentStatus([id], 0))}
          >
            <FontAwesomeIcon icon={faThumbsUp}  className="mr-2" />
            Approve
          </button>
          <button className="btn text-nowrap btn-simple"
            onClick={() => dispatch(setCommentStatus([id], 2))}
          >
            <FontAwesomeIcon icon={faHourglassHalf}  className="mr-2" />
            Pending
          </button>
        </>
      )
    } else if (state == 3) {    // flagged
      return (
        <>
          <button className="btn btn-simple text-nowrap"
            onClick={() => dispatch(setCommentStatus([id], 0))}
          >
            <FontAwesomeIcon icon={faThumbsUp}  className="mr-2" />
            Approve</button>
          <button className="btn text-nowrap btn-simple"
            onClick={() => dispatch(setCommentStatus([id], 1))}
          >
            <FontAwesomeIcon icon={faThumbsDown}  className="mr-2" />
            Reject
          </button>
        </>
      )
    }
  }

  const renderBlockMenu = (close) => (
    <Menu>
      <Menu.Group>
        <Menu.Item color="#8192A4" onSelect={() => {
          dispatch(whiteListEmail(rowData.email));
          close();
        }} >
          Whitelist Email
        </Menu.Item>
        <Menu.Item color="#8192A4" onSelect={() => {
          dispatch(blockEmail(rowData.email));
          close();
        }} >
          Block Email
        </Menu.Item>
        <Menu.Item color="#8192A4" onSelect={() => {
          dispatch(blockIP(rowData.ip));
          close();
        }} >
          Block IP Address | {rowData.ip}
        </Menu.Item>
      </Menu.Group>
    </Menu>
  )

  const renderArticleMenu = ({close}) => {
    const { host, articleId } = rowData;

    if (apiArticleStatus == 0) {
      setApiArticleStatus(1);

      (async () => {
        try {
          const response = await getArticleStatus(token, host, articleId);
          setDisabled(response.disabled);
          setApiArticleStatus(2);
        } catch (err) {
          setApiArticleStatus(0);
        } finally {
        }
      })();
    }

    if (apiArticleStatus == 2) {
      return (
        <Menu>
          <Menu.Group>
            <Menu.Item color="#8192A4" onSelect={() => {
              dispatch(setArticleStatus(rowData.articleId, !disabled));
              setDisabled(!disabled);
              close();
            }} >
              { disabled ? 'Enable comments' : 'Disable comments' }
            </Menu.Item>
            <Menu.Item color="#8192A4" onSelect={() => {
              dispatch(updateSearchTypeAndParam('ArticleId', rowData.articleId));
              close();
            }} >
              Article ID: {rowData.articleId}
            </Menu.Item>
            <Menu.Item color="#8192A4" onSelect={() => {
              showMetaModal(true);
              close();
            }} >
              Change Article Meta
            </Menu.Item>
          </Menu.Group>
        </Menu>
      )
    } else {
      return <></>
    }
  }

  const renderCommentText = () => {
    if (commentText.length > COMMENT_MAX_LENGTH) {
      if (readmore) {
        return (
          <div className="text-break">
            <span dangerouslySetInnerHTML={{ __html: commentText }} />
            <span className="read-more" onClick={() => setReadMore(false)}>
              {"read less"}
            </span>
          </div>
        )
      } else {
        return (
          <div className="text-break">
            <span dangerouslySetInnerHTML={{ __html: commentText.substr(0, COMMENT_MAX_LENGTH) }} />
            {"... "}
            <span className="read-more" onClick={() => setReadMore(true)}>
              {"read more"}
            </span>
          </div>
        )
      }
    } else {
      return (
        <div className="text-break" dangerouslySetInnerHTML={{ __html: commentText }} />
      );
    }
  }

  const renderTags = () => {
    const tags = rowData.tag.split(',');
    if (rowData.tag.length > 0 && tags.length > 0) {
      return (
        <>
          <FontAwesomeIcon icon={faTag}  className="mr-1" />
          {tags.map((tag, index) => {
            if (tag.length > 0) {
              return (
                <div key={index} className="nav-link p-0 mr-2 lh-1" style={{ lineHeight: '1rem' }}>
                  <span style={{ cursor: 'pointer' }}
                    onClick={() => dispatch(updateTag(tag))}
                  >{tag}</span>
                </div>
              )
            }
          })}
        </>
      )
    }
  }

  return (
    <div className={`${classNames({ "bg-light": selected })} d-lg-flex moderation-table__row`}>
      <div className="moderation-table__body-cell moderation-table__body-cell-left" colSpan={1} style={{ verticalAlign: "top" }}>
        <div className="custom-control custom-checkbox pd-l-15">
          <input type="checkbox" className="custom-control-input" id={`rowCheck-${rowData.id}`}
            checked={selected}
            onChange={(event) => dispatch(selectMod([rowData.id], event.target.checked))}
          />
          <label className="custom-control-label" htmlFor={`rowCheck-${rowData.id}`} />
        </div>
      </div>
      <div className="moderation-table__body-cell moderation-table__body-cell-right">
        <div className="d-lg-flex justify-content-between">
          <div className="w-100">
            <div>
              <a className="moderation-table__body-title"
                onClick={() => dispatch(updateSearchTypeAndParam('ArticleId', rowData.articleId))} >
                {rowData.title}
              </a>
              <Popover
                content={renderArticleMenu}
                position={Position.BOTTOM_LEFT}
                minimal={false}
              >
                <Icon icon="caret-down" className="ml-1 moderation-table__curet" style={curretStyle} />
              </Popover>
              <MetaModal rowData={rowData} show={metaModal}
                onClose={() => showMetaModal(false)}
              />
            </div>

            <div className="d-flex justify-content-between text-secondary tx-13">
              <div className="d-flex flex-wrap align-items-center">
                <div className="moderation-table__user">
                  <FontAwesomeIcon icon={faUserAlt}  className="mr-1" />
                  <span className="mr-2">{ rowData.name }</span>
                  <a className="text-secondary mr-1"
                    onClick={() => dispatch(updateSearchTypeAndParam('email', rowData.email))}
                  >({ rowData.email })</a>
                  <Popover
                    content={({close}) => (renderBlockMenu(close))}
                    position={Position.BOTTOM_LEFT}
                    minimal={true}
                  >
                    <Icon icon="caret-down" style={curretStyle} className="mr-4 moderation-table__curet" />
                  </Popover>
                </div>

                { renderTags() }

              </div>
            </div>

            <div className="d-flex flex-wrap mg-t-5">
              {(rowData.toxicity > 80) && (
                <div className="vu-filter-label cursor-pointer mg-t-4"
                  style={{ cursor: 'pointer' }} 
                  onClick={() => dispatch(updateSearchTypeAndParam('Toxicity', rowData.toxicity))}
                >
                  Toxicity {rowData.toxicity}
                </div>
              )}
              {(rowData.spamValue > 90) && (
                <div className="vu-filter-label mg-t-4"
                  style={{ cursor: 'pointer' }}
                  onClick={() => dispatch(updateSearchTypeAndParam('SpamValue', rowData.spamValue))}
                >
                  Spam Value {rowData.spamValue}
                </div>
              )}
              {rowData.os && (
                <div className="vu-filter-label mg-t-4"
                  style={{ cursor: 'pointer' }}
                  onClick={() => dispatch(updateSearchTypeAndParam('Os', rowData.os))}
                >
                  {rowData.os}
                </div>
              )}
              {rowData.device && (
                <div className="vu-filter-label mg-t-4"
                  style={{ cursor: 'pointer' }}
                  onClick={() => dispatch(updateSearchTypeAndParam('Device', rowData.device))}
                >
                  {rowData.device}
                </div>
              )}
              {rowData.browser && (
                <div className="vu-filter-label mg-t-4"
                  style={{ cursor: 'pointer' }}
                  onClick={() => dispatch(updateSearchTypeAndParam('Browser', rowData.browser))}
                >
                  {rowData.browser}
                </div>
              )}
              {rowData.country && (
                <div className="vu-filter-label mg-t-4"
                  style={{ cursor: 'pointer' }}
                  onClick={() => dispatch(updateSearchTypeAndParam('Country', rowData.country))}
                >
                  {rowData.country}
                </div>
              )}
            </div>

            <div className="moderation-table__body-content">
            {isEdit ? (
              <>
                <textarea className="form-control mb-4" value={newCommentText} rows={5} required
                  onChange={(event) => setNewCommentText(event.target.value)} />
                <div className="text-right">
                  <button className="btn btn-outline-primary pd-x-15 pd-y-10"
                    onClick={() => setIsEdit(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary"
                    onClick={() => {
                      if (newCommentText.trim() == '') {
                        alert('Comment can not be empty');
                        return;
                      }
                      dispatch(updateCommentText([rowData.id], newCommentText));
                      setIsEdit(false);
                      setCommentText(newCommentText);
                    }}
                  > 
                    Save
                  </button>
                </div>
              </>
            ) : (
              renderCommentText()
            )}
            </div>
          </div>
          <div className="d-flex d-lg-block">
            <div className="d-flex justify-content-end order-2 mt-2 mb-3 mt-lg-0 mb-lg-0 ml-auto">
              <div className="text-center text-secondary text-nowrap align-bottom moderation-table__body-timestamp">
                <FontAwesomeIcon icon={faUserClock}  className="mr-1" />
                { moment.unix(rowData.createdTimestamp).fromNow() }
              </div>
            </div>

            { (moderationStore.state == 0 || moderationStore.state == 1) && rowData.moderatorEmail &&
              <div className="text-lg-right tx-12 tx-color-05 mt-2 mb-3 order-1">
                <a className="text-secondary vu-moderatoremail-block"
                  onClick={() => dispatch(updateSearchTypeAndParam('moderatoremail', rowData.moderatorEmail))}
                >moderator: { rowData.moderatorEmail }</a>
                <div>({ moment.unix(rowData.moderatorTimeStamp).format('DD/MM/YY HH:mm') })</div>
              </div>
            }

            { !filterStore.host && (
              <div className="vu-filter-label cursor-pointer mg-t-4"
                style={{ cursor: 'pointer' }} 
                onClick={() => dispatch(updateHost(rowData.host))}
              >
                { rowData.host }
              </div>
            ) }
          </div>
        </div>

        <div className="d-flex align-items-center moderation-table__body-footer">
          <Link href={`//${rowData.host}${rowData.uri}`} prefetch={false}>
            <a className="btn btn-sm text-nowrap btn-simple" target="_blank">
              <FontAwesomeIcon icon={faExternalLink} size="sm" className="mr-1" />
              <span className="d-none d-lg-inline-block">Go to article</span>
            </a>
          </Link>
          <button className="btn btn-sm text-nowrap btn-simple"
            onClick={() => showReplyModal(true)}
          >
            <FontAwesomeIcon icon={faReply} size="sm" className="mr-1" />
            <span className="d-none d-lg-inline-block">Reply</span>
          </button>

          <ReplyModal rowData={rowData} show={replyModal}
            onClose={() => showReplyModal(false)}/>

          <a className="btn btn-sm text-nowrap btn-simple"
            href={`mailto:?subject="[Vuukle] Comment details"&body=Article: ${rowData.title}%0D%0AArticle URL: https://${rowData.host}/%0D%0AComment: ${stripHtml(rowData.commentText)}%0D%0AAuthor: ${rowData.name}(${rowData.email})%0D%0ATags: ${rowData.tag}`}
          >
            <FontAwesomeIcon icon={faShare} size="sm" className="mr-1" />
            <span className="d-none d-lg-inline-block">Forward</span>
          </a>

          {rowData.parentId && (
            <button className="btn btn-sm text-nowrap btn-simple"
              onClick={() => {
                dispatch(loadCommentThread(rowData.parentId));
                props.onShowReplyThread();
              }}
            >
              <FontAwesomeIcon icon={faCommentAlt} size="sm" className="mr-1" />
              <span className="d-none d-lg-inline-block">Reply Thread</span>
            </button>
          )}

          <button className="text-right btn btn-sm btn-simple" style={{ cursor: 'pointer' }}
            onClick={() => {
              setIsEdit(true);
              const regex = /(<([^>]+)>)/ig;
              setNewCommentText(commentText.replace(regex, ''));
            }}
          >
            <FontAwesomeIcon icon={faEdit} size="sm" className="mr-1" />
            <span className="d-none d-lg-inline-block">Edit</span>
          </button>

          <div className="ml-auto d-flex">
            <div className="moderation-table__body-buttons">
              { renderSetButtons() }
            </div>
          </div>

        </div>
      </div>
      {/* { (moderationStore.state == 0 || moderationStore.state == 1) &&   // approved, rejected
        <td className="text-right text-nowrap align-bottom">
          { moment.duration(rowData.delay, 'minutes').humanize() }
        </td>
      } */}
    </div>
  );
};

export default TableRow;
