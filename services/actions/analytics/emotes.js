// ==== 💪 Action Types
export const actionTypes = {
  LOAD_EMOTE_STATE: "@analytics/emotes/load-emote-state",
  SET_EMOTE_STATE: "@analytics/emotes/set-emote-state",

  SET_EMOTE: "@analytics/emotes/set-emote",

  LOAD_TOP_ARTICLES: "@analytics/emotes/load-top-articles",
  SET_TOP_ARTICLES: "@analytics/emotes/set-top-articles",

  LOAD_TOP_COUNTRIES: "@analytics/emotes/load-top-countries",
  SET_TOP_COUNTRIES: "@analytics/emotes/set-top-countries",

  LOAD_TOP_CITIES: "@analytics/emotes/load-top-cities",
  SET_TOP_CITIES: "@analytics/emotes/set-top-cities",

  LOAD_TOP_OSS: "@analytics/emotes/load-top-oss",
  SET_TOP_OSS: "@analytics/emotes/set-top-oss",

  LOAD_TOP_BROWSERS: "@analytics/emotes/load-top-browsers",
  SET_TOP_BROWSERS: "@analytics/emotes/set-top-browsers",

  LOAD_TOP_DEVICES: "@analytics/emotes/load-top-devices",
  SET_TOP_DEVICES: "@analytics/emotes/set-top-devices",
};

// ==== 🎬 Actions
export const loadEmoteState = () => ({
  type: actionTypes.LOAD_EMOTE_STATE,
});

export const updateEmote = (emote) => ({
  type: actionTypes.SET_EMOTE,
  payload: emote,
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
