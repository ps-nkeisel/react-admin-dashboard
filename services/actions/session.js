// ==== 💪 Action Types
export const actionTypes = {
  SET_LOADING: "@session/set-loading",
  SET_ERROR: "@session/set-error",
  RESET_SESSION: "@session/reset",
  SAVE_TOKEN: "@session/save-token",
  REMOVE_TOKEN: "@session/remove-token",
  SET_KEYS: '@session/set-keys',
  SET_USER_PROFILE: "@session/set-user-profile",
  SET_PERMISSIONS: "@session/set-permissions",
  SET_SITES: '@session/set-sites',
  INCREASE_PAGE_FONTSIZE: "@session/increase-page-fontsize",
  DECREASE_PAGE_FONTSIZE: "@session/decrease-page-fontsize",
  SAVE_URL: "@session/save-url",
  UPDATE_TITLE: "@session/update-title"
};

// ==== 🎬 Actions
export const setLoading = (loading = true) => ({
  type: actionTypes.SET_LOADING,
  payload: loading
});
export const setError = (error = true) => ({
  type: actionTypes.SET_ERROR,
  payload: error
});

export const resetSession = () => ({
  type: actionTypes.RESET_SESSION,
});

export const saveToken = token => ({
  type: actionTypes.SAVE_TOKEN,
  payload: token
});
export const removeToken = () => ({
  type: actionTypes.REMOVE_TOKEN
});

export const setKeys = (apiKey, secretKey) => ({
  type: actionTypes.SET_KEYS,
  payload: {
    apiKey,
    secretKey,
  }
});
export const setUserProfile = user_profile => ({
  type: actionTypes.SET_USER_PROFILE,
  payload: user_profile
});
export const setPermissions = details => ({
  type: actionTypes.SET_PERMISSIONS,
  payload: details
});
export const setSites = sites => ({
  type: actionTypes.SET_SITES,
  payload: sites
});

export const increasePageFontSize = () => ({
  type: actionTypes.PAGE_INCREASE_FONTSIZE,
});

export const decreasePageFontSize = () => ({
  type: actionTypes.PAGE_DECREASE_FONTSIZE,
});

export const saveUrl = (url) => ({
  type: actionTypes.SAVE_URL,
  payload: url,
});

export const updateTitle = (title) => ({
  type: actionTypes.UPDATE_TITLE,
  payload: title,
})
