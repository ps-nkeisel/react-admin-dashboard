// ==== 💪 Action Types
export const actionTypes = {
  LOAD_COMMENTSCOUNT: "@moderation/load-commentscount",
  LOAD_TAGS: "@moderation/load-tags",

  LOAD_MODERATIONS: "@moderation/load-moderations",
  FETCH_MODERATIONS: "@moderation/fetch-moderations",

  SET_LOADING: "@moderation/loading",
  SET_ERROR: "@moderation/error",

  SET_COMMENTSCOUNT: "@moderation/set-commentscount",
  SET_TAGS: "@moderation/set-tags",
  SET_MODERATIONS: "@moderation/set-moderations",
  SET_LASTFETCHCOUNT: "@moderation/set-lastfetchcount",

  SET_PAGESIZE: "@moderation/set-pagesize",
  SET_STATE: "@moderation/set-state",
  SET_TAG: "@moderation/set-tag",
  SET_SEARCH_TYPE: "@moderation/set-search-type",
  SET_SEARCH_PARAM: "@moderation/set-search-param",
  SET_SEARCH_TYPE_AND_PARAM: "@moderation/set-search-type-and-param",
  SET_SORTDIR: "@moderation/set-sortdir",

  SET_FILTER_PARAMS: "@moderation/set-filter-params",

  SET_COMMENTSTATUS: "@moderation/set-commentstatus",
  SET_OFFENSIVE: "@moderation/set-offensive",
  SET_TOPCOMMENT: "@moderation/set-topcomment",
  SET_COMMENTEDITEDSTATUS: "@moderation/set-commenteditedstatus",
  SET_ARTICLESTATUS: "@moderation/set-articlestatus",
  SET_ARTICLEMETA: "@moderation/set-articlemeta",
  POST_COMMENT: "@moderation/post-comment",

  LOAD_COMMENTTHREAD: "@moderation/load-commentthread",
  SET_COMMENTTHREAD: "@moderation/set-commentthread",
  SET_LOADINGTHREAD: "@moderation/set-loadingthread",

  SELECT_MOD: "@moderation/select-mod",
  SELECT_MOD_ALL: "@moderation/select-mod-all",
  SET_MOD_SELECTS: "@moderation/set-mod-selects",

  WHITELIST_EMAIL: "@moderation/whitelist-email",
};

// ==== 🎬 Actions
export const loadCommentsCount = () => ({
  type: actionTypes.LOAD_COMMENTSCOUNT,
});

export const loadTags = () => ({
  type: actionTypes.LOAD_TAGS,
});

export const loadModerations = () => ({
  type: actionTypes.LOAD_MODERATIONS,
});

export const fetchModerations = () => ({
  type: actionTypes.FETCH_MODERATIONS,
});

export const updatePageSize = (pageSize) => ({
  type: actionTypes.SET_PAGESIZE,
  payload: pageSize,
});

export const updateState = (state) => ({
  type: actionTypes.SET_STATE,
  payload: state,
});

export const updateTag = (tag) => ({
  type: actionTypes.SET_TAG,
  payload: tag,
});

export const updateSearchType = (type) => ({
  type: actionTypes.SET_SEARCH_TYPE,
  payload: type,
});

export const updateSearchParam = (param) => ({
  type: actionTypes.SET_SEARCH_PARAM,
  payload: param,
});

export const updateSearchTypeAndParam = (type, param) => ({
  type: actionTypes.SET_SEARCH_TYPE_AND_PARAM,
  payload: {
    type,
    param,
  }
});

export const updateSortDir = (dir) => ({
  type: actionTypes.SET_SORTDIR,
  payload: dir,
});

export const updateFilterParams = (filterParams) => ({
  type: actionTypes.SET_FILTER_PARAMS,
  payload: filterParams,
});

export const setCommentStatus = (commentIDs, state) => ({
  type: actionTypes.SET_COMMENTSTATUS,
  payload: {
    commentIDs,
    state,
  }
});

export const blockIP = (ip) => ({
  type: actionTypes.SET_OFFENSIVE,
  payload: {
    offValues: ip,
    offensiveType: 1,
  }
});

export const blockEmail = (email) => ({
  type: actionTypes.SET_OFFENSIVE,
  payload: {
    offValues: email,
    offensiveType: 2,
  }
});

export const whiteListEmail = email => ({
  type: actionTypes.WHITELIST_EMAIL,
  payload: email
});

export const setTopComment = (commentID, topComment) => ({
  type: actionTypes.SET_TOPCOMMENT,
  payload: {
    commentID,
    topComment,
  }
});

export const updateCommentText = (commentIDs, newText) => ({
  type: actionTypes.SET_COMMENTEDITEDSTATUS,
  payload: {
    commentIDs,
    newText,
    state: 0,
  }
});

export const setArticleStatus = (articleId, disabled) => ({
  type: actionTypes.SET_ARTICLESTATUS,
  payload: {
    articleId,
    disabled,
  }
});

export const setArticleMeta = (articleId, title, uri, avatar, tags) => ({
  type: actionTypes.SET_ARTICLEMETA,
  payload: {
    articleId,
    title,
    uri,
    avatar,
    tags,
  }
});

export const postComment = (comment) => ({
  type: actionTypes.POST_COMMENT,
  payload: comment,
});

export const loadCommentThread = (parentId) => ({
  type: actionTypes.LOAD_COMMENTTHREAD,
  payload: parentId,
});

export const selectMod = (mod_ids, sel) => ({
  type: actionTypes.SELECT_MOD,
  payload: {
    mod_ids,
    sel,
  },
});

export const selectModAll = (sel) => ({
  type: actionTypes.SELECT_MOD_ALL,
  payload: sel,
});
