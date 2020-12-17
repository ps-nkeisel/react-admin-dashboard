// ==== 💪 Action Types
export const actionTypes = {
  LOAD_TOP_COMMENTERS: "@analytics/comments/load-top-commenters",
  SET_TOP_COMMENTERS: "@analytics/comments/set-top-commenters",

  LOAD_TOP_TAGS: "@analytics/comments/load-top-tags",
  SET_TOP_TAGS: "@analytics/comments/set-top-tags",

  LOAD_COMMENT_STATS: "@analytics/comments/load-comment-stats",
  SET_COMMENT_STATS: "@analytics/comments/set-comment-stats",

  LOAD_MODERATORS: "@analytics/comments/load-moderators",
  SET_MODERATORS: "@analytics/comments/set-moderators",

  SET_MODERATOR: "@analytics/comments/set-moderator",

  LOAD_MODERATOR_COMMENT_STATS: "@analytics/comments/load-moderator-comment-stats",
  SET_MODERATOR_COMMENT_STATS: "@analytics/comments/set-moderator-comment-stats",

  LOAD_TOP_ARTICLES: "@analytics/comments/load-top-articles",
  SET_TOP_ARTICLES: "@analytics/comments/set-top-articles",

  LOAD_TOP_COUNTRIES: "@analytics/comments/load-top-countries",
  SET_TOP_COUNTRIES: "@analytics/comments/set-top-countries",

  LOAD_TOP_CITIES: "@analytics/comments/load-top-cities",
  SET_TOP_CITIES: "@analytics/comments/set-top-cities",

  LOAD_TOP_OSS: "@analytics/comments/load-top-oss",
  SET_TOP_OSS: "@analytics/comments/set-top-oss",

  LOAD_TOP_BROWSERS: "@analytics/comments/load-top-browsers",
  SET_TOP_BROWSERS: "@analytics/comments/set-top-browsers",

  LOAD_TOP_DEVICES: "@analytics/comments/load-top-devices",
  SET_TOP_DEVICES: "@analytics/comments/set-top-devices",
};

// ==== 🎬 Actions
export const loadTopCommenters = () => ({
  type: actionTypes.LOAD_TOP_COMMENTERS,
});

export const loadTopTags = () => ({
  type: actionTypes.LOAD_TOP_TAGS,
});

export const loadCommentStats = () => ({
  type: actionTypes.LOAD_COMMENT_STATS,
});

export const loadModerators = () => ({
  type: actionTypes.LOAD_MODERATORS,
});

export const updateModerator = (moderator) => ({
  type: actionTypes.SET_MODERATOR,
  payload: moderator,
});

export const loadModeratorCommentStats = () => ({
  type: actionTypes.LOAD_MODERATOR_COMMENT_STATS,
});

export const loadTopArticles = () => ({
  type: actionTypes.LOAD_TOP_ARTICLES,
});

export const loadTopCountries = (count = 500) => ({
  type: actionTypes.LOAD_TOP_COUNTRIES,
  payload: count,
});

export const loadTopCities = (count = 500) => ({
  type: actionTypes.LOAD_TOP_CITIES,
  payload: count,
});

export const loadTopOss = (count = 500) => ({
  type: actionTypes.LOAD_TOP_OSS,
  payload: count,
});

export const loadTopBrowsers = (count = 500) => ({
  type: actionTypes.LOAD_TOP_BROWSERS,
  payload: count,
});

export const loadTopDevices = (count = 500) => ({
  type: actionTypes.LOAD_TOP_DEVICES,
  payload: count,
});
