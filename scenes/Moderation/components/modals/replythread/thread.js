import React from "react";
import { Avatar } from "evergreen-ui";
import moment from "moment";

const ReplyThread = ( props ) => {
  const { comment, replies } = props.commentThread;

  return (
    <>
      <div className="media border-bottom reply-thread align-items-start mt-3">
        <Avatar name={ comment.name } size={34} />
        <div className="media-body">
          <div className="d-flex justify-content-between border-bottom reply-thread__header">
            <h6 className="tx-14 reply-thread__name">{ comment.name }</h6>
            <span className="tx-13 text-secondary">{ moment.unix(comment.createdTimestamp).format("DD/MM/YY HH:mm") }</span>
          </div>
          <div className="text-break" dangerouslySetInnerHTML={{ __html: comment.commentText }} />
        </div>
      </div>
      <div className="replies-block ml-3">
        { replies.length > 0 && (
          replies.map((item, index) => 
            <ReplyThread key={index} commentThread={item} />
          )
        )}
      </div>
    </>
  )
}

export default ReplyThread;
