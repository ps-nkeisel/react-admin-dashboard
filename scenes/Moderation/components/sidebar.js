import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlagAlt,
  faHourglassHalf,
  faThumbsUp,
  faThumbsDown,
  faCaretDown,
} from "@fortawesome/pro-solid-svg-icons";

import ExportToExcel from "@/components/ExportToExcel";
import "../styles/sidebar.scss";
import { stripHtml, kmFormat } from "@/utils";

import { updateState } from "@/services/actions/moderation";
import moment from "moment";

const ModerationSidebar = () => {
  const dispatch = useDispatch();

  const moderationStore = useSelector(({ moderation }) => moderation);
  const sessionStore = useSelector(({ session }) => session);
  const filterStore = useSelector(({ filter }) => filter);
  const { moderations } = moderationStore;

  const formattedData = React.useMemo(() => {
    return moderations.map((item) => {
      return {
        Article: item.title,
        Name: item.name,
        Email: item.email,
        Tags: item.tag,
        "Comment Text": stripHtml(item.commentText),
      };
    });
  }, [moderations]);

  const renderExpExcel = () => {
    return (
      <ExportToExcel
        excelData={formattedData}
        fileName={`moderation_${
          filterStore.host || sessionStore.apiKey
        }_${moment(filterStore.dateRange[0]).format("YYYY-MM-DD")}-${moment(
          filterStore.dateRange[1]
        ).format("YYYY-MM-DD")}`}
      />
    );
  };

  let currentIcon = faHourglassHalf;

  if (moderationStore.state === 2) {
    currentIcon = faHourglassHalf;
  } else if (moderationStore.state === 0) {
    currentIcon = faThumbsUp;
  } else if (moderationStore.state === 1) {
    currentIcon = faThumbsDown;
  } else if (moderationStore.state === 3) {
    currentIcon = faFlagAlt;
  }

  return (
    <>
      <div className="form-group moderation-sidebar__views d-none d-lg-flex">
        <button
          className={`btn btn-sm moderation-sidebar__views-btn rounded-3 ${
            moderationStore.state === 2 ? "btn-info" : "btn-white"
          }`}
          onClick={() => dispatch(updateState(2))}
        >
          <FontAwesomeIcon
            icon={faHourglassHalf}
            className="svg-inline--fa fa-w-18 mr-1"
          ></FontAwesomeIcon>
          Pending ({kmFormat.format(moderationStore.commentsCount.pending)})
        </button>

        <button
          className={`btn btn-sm moderation-sidebar__views-btn rounded-3 ${
            moderationStore.state === 0 ? "btn-info" : "btn-white"
          }`}
          onClick={() => dispatch(updateState(0))}
        >
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="svg-inline--fa fa-w-18 mr-1"
          ></FontAwesomeIcon>
          Approved ({kmFormat.format(moderationStore.commentsCount.approved)})
        </button>

        <button
          className={`btn btn-sm moderation-sidebar__views-btn rounded-3 ${
            moderationStore.state === 1 ? "btn-info" : "btn-white"
          }`}
          onClick={() => dispatch(updateState(1))}
        >
          <FontAwesomeIcon
            icon={faThumbsDown}
            className="svg-inline--fa fa-w-18 mr-1"
          ></FontAwesomeIcon>
          Rejected ({kmFormat.format(moderationStore.commentsCount.rejected)})
        </button>

        <button
          className={`btn btn-sm moderation-sidebar__views-btn rounded-3 ${
            moderationStore.state === 3 ? "btn-info" : "btn-white"
          }`}
          onClick={() => dispatch(updateState(3))}
        >
          <FontAwesomeIcon
            icon={faFlagAlt}
            className="svg-inline--fa fa-w-18 mr-1"
          ></FontAwesomeIcon>
          Flagged ({kmFormat.format(moderationStore.commentsCount.flagged)})
        </button>

        <div className="ml-auto d-none d-lg-block">{renderExpExcel()}</div>
      </div>

      <div className="w-100 d-flex d-lg-none mb-4">
        <div className="w-100 pos-relative custom-select--icon mr-1">
          <FontAwesomeIcon
            icon={currentIcon}
            className="pos-absolute custom-select__icon left tx-color-05"
          />
          <FontAwesomeIcon
            icon={faCaretDown}
            className="pos-absolute custom-select__icon tx-color-05"
          />
          <select
            className="d-block w-100 custom-select custom-select--large bd mg-b--3"
            id="moderators"
            name="moderators"
            onChange={(e) => dispatch(updateState(+e.target.value))}
          >
            <option value={2}>
              Pending ({kmFormat.format(moderationStore.commentsCount.pending)})
            </option>
            <option value={0}>
              Approved (
              {kmFormat.format(moderationStore.commentsCount.approved)})
            </option>
            <option value={1}>
              Rejected (
              {kmFormat.format(moderationStore.commentsCount.rejected)})
            </option>
            <option value={3}>
              Flagged ({kmFormat.format(moderationStore.commentsCount.flagged)})
            </option>
          </select>
        </div>
        {renderExpExcel()}
      </div>
      {/* <div className="form-group">
        <span>Last update: 28 min(s)</span>
      </div> */}
    </>
  );
};

export default ModerationSidebar;
