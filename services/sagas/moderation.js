import { call, put, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import Router from "next/router";
import moment from "moment";
import { toaster } from "evergreen-ui";

import { 
  hashCode,
} from "@/utils";
import { 
  getCommentCountModeration,
  getTagsByHostModeration,
  getByFilterByPeriodPaged,
  setCommentStatus,
  setOffensive,
  setOffensiveByApiKey,
  setTopComment,
  setCommentEditedStatus,
  setArticleStatus,
  setArticleMeta,
  postComment,
  loadCommentThread,
  whitelistEmail
} from "@/services/api/moderation";
import { actionTypes } from "@/services/actions/moderation";

export function* loadCommentsCount() {
  try {
    yield put({ type: actionTypes.SET_LOADING, payload: true });

    const token = yield select(({ session }) => session.token);
    const dateRange = yield select(({ filter }) => filter.dateRange);
    const host = yield select(({ filter }) => filter.host);

    const result = yield call(getCommentCountModeration, token, moment(dateRange[0]).startOf('day').utc(true).unix(), moment(dateRange[1]).endOf('day').utc(true).unix(), host);

    yield put({ 
      type: actionTypes.SET_COMMENTSCOUNT, 
      payload: {
        pending: result.pendingComments,
        rejected: result.rejectedComments,
        approved: result.approvedComments,
        flagged: result.flaggedComments,  
      }
    });

    yield put({ type: actionTypes.SET_LOADING, payload: false });

  } catch (e) {
    console.log("err", e);
    yield put({ type: actionTypes.SET_ERROR });
  }
}

export function* loadTags() {
  try {
    yield put({ type: actionTypes.SET_LOADING, payload: true });

    const token = yield select(({ session }) => session.token);
    const dateRange = yield select(({ filter }) => filter.dateRange);
    const host = yield select(({ filter }) => filter.host);

    const result = yield call(getTagsByHostModeration, token, moment(dateRange[0]).startOf('day').utc(true).unix(), moment(dateRange[1]).endOf('day').utc(true).unix(), host);

    yield put({ 
      type: actionTypes.SET_TAGS, 
      payload: result.tags
    });

    yield put({ type: actionTypes.SET_LOADING, payload: false });

  } catch (e) {
    console.log("err", e);
    yield put({ type: actionTypes.SET_ERROR });
  }
}

export function* loadModerations() {
  try {
    yield put({ type: actionTypes.SET_LOADING, payload: true });

    const token = yield select(({ session }) => session.token);
    const dateRange = yield select(({ filter }) => filter.dateRange);
    const host = yield select(({ filter }) => filter.host);
    const moderationStore = yield select(({ moderation }) => moderation);
    const { pageSize, state, tag, search_type, search_param, sort_dir } = moderationStore;

    const result = yield call(getByFilterByPeriodPaged, token, moment(dateRange[0]).startOf('day').utc(true).unix(), moment(dateRange[1]).endOf('day').utc(true).unix(), host, pageSize, state, tag, search_type, search_param, 0);

    yield put({ 
      type: actionTypes.SET_LASTFETCHCOUNT, 
      payload: result.items.length
    });

    result.items.map(item => {
      if (item.moderatorTimeStamp) {
        let start = moment.unix(item['createdTimestamp']);
        let end = moment.unix(item['moderatorTimeStamp']);
        let diff = Math.round(end.diff(start, 'minutes'));
        item.delay = diff;
      } else {
        item.delay = 0;
      }
      return item;
    });

    let moderations = result.items;
    moderations.sort((m1, m2) => m1['createdTimestamp'] > m2['createdTimestamp'] ? -sort_dir : sort_dir);

    yield put({ 
      type: actionTypes.SET_MODERATIONS, 
      payload: moderations,
    });

    yield put({ type: actionTypes.SET_MOD_SELECTS, payload: [] });

    yield put({ type: actionTypes.SET_LOADING, payload: false });

  } catch (e) {
    console.log("err", e);
    yield put({ type: actionTypes.SET_ERROR });
  }
}

export function* fetchModerations() {
  try {
    yield put({ type: actionTypes.SET_LOADING, payload: true });

    const token = yield select(({ session }) => session.token);
    const dateRange = yield select(({ filter }) => filter.dateRange);
    const host = yield select(({ filter }) => filter.host);
    const moderationStore = yield select(({ moderation }) => moderation);
    const { pageSize, state, tag, search_type, search_param, sort_dir } = moderationStore;

    const result = yield call(getByFilterByPeriodPaged, token, moment(dateRange[0]).startOf('day').utc(true).unix(), moment(dateRange[1]).endOf('day').utc(true).unix(), host, pageSize, state, tag, search_type, search_param, moderationStore.moderations.length);

    yield put({ 
      type: actionTypes.SET_LASTFETCHCOUNT, 
      payload: result.items.length
    });

    result.items.map(item => {
      if (item.moderatorTimeStamp) {
        let start = moment.unix(item['createdTimestamp']);
        let end = moment.unix(item['moderatorTimeStamp']);
        let diff = Math.round(end.diff(start, 'minutes'));
        item.delay = diff;
      } else {
        item.delay = 0;
      }
      return item;
    });

    let moderations = moderationStore.moderations.concat(result.items);
    moderations.sort((m1, m2) => m1['createdTimestamp'] > m2['createdTimestamp'] ? -sort_dir : sort_dir);

    yield put({ 
      type: actionTypes.SET_MODERATIONS, 
      payload: moderations,
    });

    yield put({ type: actionTypes.SET_LOADING, payload: false });

  } catch (e) {
    console.log("err", e);
    yield put({ type: actionTypes.SET_ERROR });
  }
}

function* syncRouterParams(key, value) {
  let query = Router.query;
  if (value != query[key]) {
    const pathname = Router.pathname;
    query[key] = value;
    Router.replace({ pathname, query });
  }
}

export function* onSetPageSize(params) {
  yield call(syncRouterParams, 'pageSize', params.payload);

  yield put({ type: actionTypes.LOAD_MODERATIONS });
}

export function* onSetState(params) {
  yield call(syncRouterParams, 'state', params.payload);

  yield put({ type: actionTypes.LOAD_MODERATIONS });
}

export function* onSetTag(params) {
  yield call(syncRouterParams, 'tag', params.payload);

  yield put({ type: actionTypes.LOAD_COMMENTSCOUNT });
  yield put({ type: actionTypes.LOAD_MODERATIONS });
}

export function* onSetSearchType(params) {
  yield call(syncRouterParams, 'search_type', params.payload);

  const moderationStore = yield select(({ moderation }) => moderation);
  if (moderationStore.search_param != '') {
    yield put({ type: actionTypes.LOAD_MODERATIONS });
  }
}

export function* onSetSearchParam(params) {
  yield call(syncRouterParams, 'search_param', params.payload);

  const moderationStore = yield select(({ moderation }) => moderation);
  if (moderationStore.search_type != '') {
    yield put({ type: actionTypes.LOAD_MODERATIONS });
  }
}

export function* onSetSearchTypeAndParam(params) {
  const { type, param } = params.payload;
  yield call(syncRouterParams, 'search_type', type);
  yield call(syncRouterParams, 'search_param', param);

  yield put({ type: actionTypes.LOAD_MODERATIONS });
}

export function* onSetSortDir(params) {
  yield call(syncRouterParams, 'sort_dir', params.payload);
}

export function* onSetFilterParams(params) {
}

export function* onSetCommentStatus(params) {
  try {
    const { commentIDs, state } = params.payload;

    const token = yield select(({ session }) => session.token);
    const moderationStore = yield select(({ moderation }) => moderation);

    yield call(setCommentStatus, token, commentIDs, state);

    const stateTypes = ['approved', 'rejected', 'pending', 'flagged'];
    let { commentsCount, moderations } = moderationStore;
    commentsCount[stateTypes[moderationStore.state]] -= commentIDs.length;
    commentsCount[stateTypes[state]] += commentIDs.length;
    yield put({ 
      type: actionTypes.SET_COMMENTSCOUNT, 
      payload: commentsCount
    });

    yield put({ 
      type: actionTypes.SET_MODERATIONS, 
      payload: moderations.filter(item => !commentIDs.includes(item.id)),
    });

    // yield put({ type: actionTypes.LOAD_COMMENTSCOUNT });
    // yield put({ type: actionTypes.LOAD_MODERATIONS });
    toaster.success(
      `Success`,
      { id: "moderation-comment-status-change" }
    );
  } catch (e) {
    console.log("err", e);
    yield put({ type: actionTypes.SET_ERROR });
    toaster.danger(
      `Error. Please refresh the page and try again.`,
      { id: "moderation-comment-status-change" }
    );
  }
}

export function* onSetOffensive(params) {
  const { offValues, offensiveType } = params.payload;

  const { token, apiKey } = yield select(({ session }) => session);
  const host = yield select(({ filter }) => filter.host);

  try {
    yield call(
      host ? setOffensive : setOffensiveByApiKey, 
      token, 
      host ? host : apiKey, 
      offValues, 
      offensiveType
    );

    if (offensiveType == 2) {
      toaster.success(
        'Success',
        {
          id: 'block-email',
          description: `The email is now added to the Blocked Commenter's Email List`,
          duration: 5,
        }
      );
    } else if (offensiveType == 1) {
      toaster.success(
        'Success',
        {
          id: 'block-ip',
          description: offValues + ' blocked',
          duration: 5,
        }
      );
    }
  } catch (e) {
    console.log("err", e);

    let msg_description = '';
    if (offensiveType == 2) {
      if (e.message === "already_in_whitelist") {
        msg_description = "This email is already whitelisted.";
      } else if (e.message === "already_blocked") {
        msg_description = "This email is already blocked.";
      } else if (e.message === "already_in_blacklist") {
        msg_description = "This email is blacklisted for " + host;
      } else if (e.message === "in_master_blacklist") {
        msg_description = "This email can not be whitelisted because they're blocked from using Vuukle globally.";
      } else {
        msg_description = "Could not whitelist " + offValues;
      }
    } else if (offensiveType == 1) {
      if (e.message === "already_in_whitelist") {
        msg_description = "This ip is already whitelisted.";
      } else if (e.message === "already_blocked") {
        msg_description = "This ip is already blocked.";
      } else if (e.message === "already_in_blacklist") {
        msg_description = "This ip is blacklisted for " + host;
      } else if (e.message === "in_master_blacklist") {
        msg_description = "This ip can not be whitelisted because they're blocked from using Vuukle globally.";
      } else {
        msg_description = "Could not whitelist " + offValues;
      }
    }

    toaster.danger(
      "Error",
      {
        description: msg_description,
        duration: 5,
        id: "moderation-comment-set-offensive"
      }
    )
    yield put({ type: actionTypes.SET_ERROR });
  }
}

export function* onSetTopComment(params) {
  try {
    const token = yield select(({ session }) => session.token);
    const { commentID, topComment } = params.payload;

    yield call(setTopComment, token, commentID, topComment);
  } catch (e) {
    console.log("err", e);
    yield put({ type: actionTypes.SET_ERROR });
  }
}

export function* onSetCommentEditedStatus(params) {
  try {
    const token = yield select(({ session }) => session.token);
    const { commentIDs, newText, state } = params.payload;

    yield call(setCommentEditedStatus, token, commentIDs, newText, state);

    yield put({ type: actionTypes.LOAD_COMMENTSCOUNT });
    yield put({ type: actionTypes.LOAD_MODERATIONS });
    toaster.success(
      `Success. Changes are successfully saved.`
    );
  } catch (e) {
    console.log("err", e);
    yield put({ type: actionTypes.SET_ERROR });
    toaster.danger(
      `Error. Changes are not saved. Please refresh and try again.`
    );
  }
}

export function* onSetArticleStatus(params) {
  try {
    const token = yield select(({ session }) => session.token);
    const host = yield select(({ filter }) => filter.host);
    const { articleId, disabled } = params.payload;

    yield call(setArticleStatus, token, host, articleId, disabled);

    if (disabled) {
      toaster.warning(
        'Article Commenting Disabled',
        {
          id: 'article-disable',
          duration: 5,
        }
      );
    } else {
      toaster.success(
        'Article Commenting Enabled',
        {
          id: 'article-disable',
          duration: 5,
        }
      );
    }
  } catch (e) {
    console.log("err", e);
    yield put({ type: actionTypes.SET_ERROR });
  }
}

export function* onSetArticleMeta(params) {
  try {
    const token = yield select(({ session }) => session.token);
    const host = yield select(({ filter }) => filter.host);
    const { articleId, title, uri, avatar, tags } = params.payload;

    yield call(setArticleMeta, token, host, articleId, title, uri, avatar, tags);
    toaster.success(
      `Success. Changes are successfully saved.`
    );
  } catch (e) {
    console.log("err", e);
    yield put({ type: actionTypes.SET_ERROR });
    toaster.danger(
      `Error. Changes are not saved. Please refresh the page and try again.`
    );
  }
}

export function* onPostComment(params) {
  try {
    const token = yield select(({ session }) => session.token);
    const comment = params.payload;
    const r = hashCode(comment.commentText);
    const s = hashCode(comment.commentText + comment.apiKey);
    yield call(postComment, token, comment, r, s);
    toaster.success(
      `Success. Reply has been successfully sent.`,
      { id: "moderation-comment-successful-reply" }
    );
  } catch (e) {
    console.log("err", e);
    yield put({ type: actionTypes.SET_ERROR });
    toaster.danger(
      `Error. Reply was not sent. Please refresh the page and try again`,
      { id: "moderation-comment-error-reply" }
    );
  }
}

export function* onLoadCommentThread(params) {
  try {
    yield put({ type: actionTypes.SET_LOADINGTHREAD, payload: true });

    const token = yield select(({ session }) => session.token);

    const parentId = params.payload;

    const result = yield call(loadCommentThread, token, parentId);

    yield put({ type: actionTypes.SET_COMMENTTHREAD, payload: result })

    yield put({ type: actionTypes.SET_LOADINGTHREAD, payload: false });
  } catch (e) {
    console.log("err", e);
    yield put({ type: actionTypes.SET_ERROR });
  }
}

export function* onSelectMod(params) {
  const { mod_ids, sel } = params.payload;

  const moderationStore = yield select(({ moderation }) => moderation);
  const { mod_selects } = moderationStore;

  let mod_sels = [];
  if (sel) {
    const diff = mod_ids.filter(id => !mod_selects.includes(id));
    mod_sels = mod_selects.concat(diff);
  } else {
    mod_sels = mod_selects.filter(id => !mod_ids.includes(id));
  }
  yield put({ type: actionTypes.SET_MOD_SELECTS, payload: mod_sels });
}

export function* onSelectModAll(params) {
  const sel = params.payload;

  if (sel) {
    const moderations = yield select(({ moderation }) => moderation.moderations);
    const mod_sels = moderations.map(item => item.id);

    yield put({ type: actionTypes.SET_MOD_SELECTS, payload: mod_sels });
  } else {
    yield put({ type: actionTypes.SET_MOD_SELECTS, payload: [] });
  }
}

export function* onWhitelistEmail(params) {
  const email = params.payload;
  const token = yield select(({ session }) => session.token);
  const host = yield select(({ filter }) => filter.host);
  try {
    yield call(whitelistEmail, token, host, email);
    toaster.success(
      "Success",
      {
        description: email + " is now whitelisted",
        duration: 5,
        id: "whitelist-email-success"
      }
    )
  } catch (e) {
    yield put({ type: actionTypes.SET_ERROR });
    if (e.message === "already_whitelisted") {
      toaster.danger(
        "Error",
        {
          description: "This user is already whitelisted.",
          duration: 5,
          id: "whitelist-email-error"
        }
      )
    } else if (e.message === "already_in_blacklist") {
      toaster.danger(
        "Error",
        {
          description: "This user is blacklisted for " + host,
          duration: 5,
          id: "whitelist-email-error"
        }
      )
    } else if (e.message === "in_master_blacklist") {
      toaster.danger(
        "Error",
        {
          description: "This user can not be whitelisted because they are blocked from using Vuukle globally.",
          duration: 5,
          id: "whitelist-email-error"
        }
      )
    } else {
      toaster.danger(
        "Error",
        {
          description: "Could not whitelist " + email,
          duration: 5,
          id: "whitelist-email-error"
        }
      )
    }
  }
}

export default function* moderationSaga() {
  yield takeLatest(actionTypes.LOAD_COMMENTSCOUNT, loadCommentsCount);
  yield takeLatest(actionTypes.LOAD_TAGS, loadTags);
  yield takeLatest(actionTypes.LOAD_MODERATIONS, loadModerations);
  yield takeLatest(actionTypes.FETCH_MODERATIONS, fetchModerations);

  yield takeLatest(actionTypes.SET_PAGESIZE, onSetPageSize);
  yield takeLatest(actionTypes.SET_STATE, onSetState);
  yield takeLatest(actionTypes.SET_TAG, onSetTag);
  yield takeLatest(actionTypes.SET_SEARCH_TYPE, onSetSearchType);
  yield takeLatest(actionTypes.SET_SEARCH_PARAM, onSetSearchParam);
  yield takeLatest(actionTypes.SET_SEARCH_TYPE_AND_PARAM, onSetSearchTypeAndParam);
  yield takeLatest(actionTypes.SET_SORTDIR, onSetSortDir);
  yield takeLatest(actionTypes.SET_FILTER_PARAMS, onSetFilterParams);

  yield takeEvery(actionTypes.SET_COMMENTSTATUS, onSetCommentStatus);
  yield takeLatest(actionTypes.SET_OFFENSIVE, onSetOffensive);
  yield takeLatest(actionTypes.SET_TOPCOMMENT, onSetTopComment);
  yield takeLatest(actionTypes.SET_COMMENTEDITEDSTATUS, onSetCommentEditedStatus);
  yield takeLatest(actionTypes.SET_ARTICLESTATUS, onSetArticleStatus);
  yield takeLatest(actionTypes.SET_ARTICLEMETA, onSetArticleMeta);
  yield takeLatest(actionTypes.POST_COMMENT, onPostComment);

  yield takeLatest(actionTypes.LOAD_COMMENTTHREAD, onLoadCommentThread);

  yield takeLatest(actionTypes.SELECT_MOD, onSelectMod);
  yield takeLatest(actionTypes.SELECT_MOD_ALL, onSelectModAll);

  yield takeLatest(actionTypes.WHITELIST_EMAIL, onWhitelistEmail);
}
