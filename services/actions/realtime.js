// ==== 💪 Action Types
export const actionTypes = {
  SET_DATA: "@realtime/request",
  SET_ARTICLE: "@realtime/set-article",
  SET_ARTICLE_STATS: "@realtime/set-article-stats",
  SET_REALTIME_STATUS_FOR_HOST: "@realtime/set-realtime-status-for-host",
  RESET_SESSION: "@session/reset"
};

// ==== 🎬 Actions
export const updateRealtimeData = ( data ) => ({
  type: actionTypes.SET_DATA,
  payload: data,
});

export const updateArticle = article => ({
  type: actionTypes.SET_ARTICLE,
  payload: article,
});

export const updateArticleStats = data => ({
  type: actionTypes.SET_ARTICLE_STATS,
  payload: data
});

export const updateRealtimeStatusForHost = (host, status) => ({
  type: actionTypes.SET_REALTIME_STATUS_FOR_HOST,
  payload: {
    host,
    status
  }
});