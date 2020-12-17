import React, { useState } from "react";
import { useSelector } from "react-redux";

import TableRow from './row';
import ReplyThreadModal from "../modals/replythread";

const TableBody = () => {
  const moderationStore = useSelector(({ moderation }) => moderation);

  const { moderations, search_type, search_param, mod_selects } = moderationStore;
  const { commentThread, loadingThread } = moderationStore;

  let searchData;
  if (search_type == '') {
    searchData = moderations.filter(item => item.commentText.includes(search_param) || item.title.includes(search_param))
  } else if (search_type == 'SpamValue') {
    searchData = moderations.filter(item => parseInt(item.spamValue) >= parseInt(search_param || 0))
  } else {
    searchData = moderations;
  }

  const [replyThreadModal, showReplyThreadModal] = useState(false);

  return (
    <div>
      { searchData.length > 0 ? (
        searchData.map(item => 
          <TableRow key={item.id} rowData={item} selected={(mod_selects.indexOf(item.id) != -1)}
            onShowReplyThread={() => showReplyThreadModal(true)} />
        )
      ):(
        <div className="border-bottom">
          <div>
            {"No data available in table"}
          </div>
        </div>
      )}
      <ReplyThreadModal show={replyThreadModal} commentThread={commentThread} loadingThread={loadingThread}
        onClose={() => showReplyThreadModal(false)}/>
    </div>
  );
};

export default TableBody;
