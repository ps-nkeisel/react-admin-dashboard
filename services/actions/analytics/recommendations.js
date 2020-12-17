// ==== 💪 Action Types
export const actionTypes = {
  LOAD_TOP_ARTICLES: "@analytics/recommendations/load-top-articles",
  SET_TOP_ARTICLES: "@analytics/recommendations/set-top-articles",

  LOAD_TOP_COUNTRIES: "@analytics/recommendations/load-top-countries",
  SET_TOP_COUNTRIES: "@analytics/recommendations/set-top-countries",

  LOAD_TOP_CITIES: "@analytics/recommendations/load-top-cities",
  SET_TOP_CITIES: "@analytics/recommendations/set-top-cities",

  LOAD_TOP_OSS: "@analytics/recommendations/load-top-oss",
  SET_TOP_OSS: "@analytics/recommendations/set-top-oss",

  LOAD_TOP_BROWSERS: "@analytics/recommendations/load-top-browsers",
  SET_TOP_BROWSERS: "@analytics/recommendations/set-top-browsers",

  LOAD_TOP_DEVICES: "@analytics/recommendations/load-top-devices",
  SET_TOP_DEVICES: "@analytics/recommendations/set-top-devices",
};

// ==== 🎬 Actions
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
