import { call, put, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import moment from "moment";
import { toaster } from "evergreen-ui";

import {
  getTopByFilter,
  getTopByFilterByApiKey,
  getTopArticles,
  getTopArticlesByApiKey,
  getEmoteState,
  getEmoteStateByApiKey
} from "@/services/api/analytics/emotes";

import { actionTypes } from "@/services/actions/analytics/emotes";
import { initialState } from "@/services/reducers/analytics/emotes";

export function* loadEmoteState() {
  try {
    const { token, apiKey } = yield select(({ session }) => session);
    const { host, dateRange } = yield select(({ filter }) => filter);

    const result = yield call(
      host ? getEmoteState : getEmoteStateByApiKey, 
      token, 
      moment(dateRange[0]).startOf('day').utc(true).unix(), 
      moment(dateRange[1]).endOf('day').utc(true).unix(), 
      host ? host : apiKey
    );

    let emote_state = [0, 0, 0, 0, 0, 0]
    if (result) {
      Object.keys(result).map((date) => {
        for (let i = 0; i < 6; i ++) {
          emote_state[i] += result[date][i+1];
        }
      })
    }

    yield put({ 
      type: actionTypes.SET_EMOTE_STATE,
      payload: emote_state
    });
  } catch (e) {
    console.log("err", e);
    toaster.danger(
      `Error fetching emote state`,
      { id: "analytics-emote-state" }
    );
    yield put({ 
      type: actionTypes.SET_EMOTE_STATE,
      payload: initialState.emote_state
    });
  }
}

export function* loadTopArticles() {
  try {
    const token = yield select(({ session }) => session.token);
    const apiKey = yield select(({ session }) => session.apiKey);
    const { host, dateRange } = yield select(({ filter }) => filter);
    const emote = yield select(({ analytics }) => analytics.emotes.emote);

    const result = yield call(
      host ? getTopArticles : getTopArticlesByApiKey, 
      token, 
      host ? host : apiKey, 
      moment(dateRange[0]).startOf('day').utc(true).unix(), 
      moment(dateRange[1]).endOf('day').utc(true).unix(), 
      emote
    );

    yield put({ 
      type: actionTypes.SET_TOP_ARTICLES,
      payload: result || initialState.top_articles
    });
  } catch (e) {
    console.log("err", e);
    toaster.danger(
      `Error fetching top articles`,
      { id: "analytics-top-articles" }
    );
    yield put({ 
      type: actionTypes.SET_TOP_ARTICLES,
      payload: initialState.top_articles
    });
  }
}

export function* loadTopCountries(params) {
  try {
    const { token, apiKey } = yield select(({ session }) => session);
    const { host, dateRange } = yield select(({ filter }) => filter);
    const count = params.payload;

    const result = yield call(
      host ? getTopByFilter : getTopByFilterByApiKey, 
      token, 
      host ? host : apiKey, 
      moment(dateRange[0]).startOf('day').utc(true).unix(), 
      moment(dateRange[1]).endOf('day').utc(true).unix(), 
      'Country', 
      0, 
      count, 
      'Country'
    );

    yield put({ 
      type: actionTypes.SET_TOP_COUNTRIES,
      payload: result || initialState.top_countries
    });
  } catch (e) {
    console.log("err", e);
    toaster.danger(
      `Error fetching top countries`,
      { id: "analytics-top-countries" }
    );
    yield put({ 
      type: actionTypes.SET_TOP_COUNTRIES,
      payload: initialState.top_countries
    });
  }
}

export function* loadTopCities(params) {
  try {
    const { token, apiKey } = yield select(({ session }) => session);
    const { host, dateRange } = yield select(({ filter }) => filter);
    const count = params.payload;

    const result = yield call(
      host ? getTopByFilter : getTopByFilterByApiKey, 
      token, 
      host ? host : apiKey, 
      moment(dateRange[0]).startOf('day').utc(true).unix(), 
      moment(dateRange[1]).endOf('day').utc(true).unix(), 
      'City', 
      0, 
      count, 
      'City'
    );

    yield put({ 
      type: actionTypes.SET_TOP_CITIES,
      payload: result || initialState.top_cities
    });
  } catch (e) {
    console.log("err", e);
    toaster.danger(
      `Error fetching top cities`,
      { id: "analytics-top-cities" }
    );
    yield put({ 
      type: actionTypes.SET_TOP_CITIES,
      payload: initialState.top_cities
    });
  }
}

export function* loadTopOss(params) {
  try {
    const { token, apiKey } = yield select(({ session }) => session);
    const { host, dateRange } = yield select(({ filter }) => filter);
    const count = params.payload;

    const result = yield call(
      host ? getTopByFilter : getTopByFilterByApiKey, 
      token, 
      host ? host : apiKey, 
      moment(dateRange[0]).startOf('day').utc(true).unix(), 
      moment(dateRange[1]).endOf('day').utc(true).unix(), 
      'Os', 
      0, 
      count, 
      'Country'
    );

    yield put({ 
      type: actionTypes.SET_TOP_OSS,
      payload: result || initialState.top_oss
    });
  } catch (e) {
    console.log("err", e);
    toaster.danger(
      `Error fetching top OS`,
      { id: "analytics-top-os" }
    );
    yield put({ 
      type: actionTypes.SET_TOP_OSS,
      payload: initialState.top_oss
    });
  }
}

export function* loadTopBrowsers(params) {
  try {
    const { token, apiKey } = yield select(({ session }) => session);
    const { host, dateRange } = yield select(({ filter }) => filter);
    const count = params.payload;

    const result = yield call(
      host ? getTopByFilter : getTopByFilterByApiKey, 
      token, 
      host ? host : apiKey, 
      moment(dateRange[0]).startOf('day').utc(true).unix(), 
      moment(dateRange[1]).endOf('day').utc(true).unix(), 
      'Browser', 
      0, 
      count, 
      'Country'
    );

    yield put({ 
      type: actionTypes.SET_TOP_BROWSERS,
      payload: result || initialState.top_browsers
    });
  } catch (e) {
    console.log("err", e);
    toaster.danger(
      `Error fetching top browsers`,
      { id: "analytics-top-browsers" }
    );
    yield put({ 
      type: actionTypes.SET_TOP_BROWSERS,
      payload: initialState.top_browsers
    });
  }
}

export function* loadTopDevices(params) {
  try {
    const { token, apiKey } = yield select(({ session }) => session);
    const { host, dateRange } = yield select(({ filter }) => filter);
    const count = params.payload;

    const result = yield call(
      host ? getTopByFilter : getTopByFilterByApiKey, 
      token, 
      host ? host : apiKey, 
      moment(dateRange[0]).startOf('day').utc(true).unix(), 
      moment(dateRange[1]).endOf('day').utc(true).unix(), 
      'Device', 
      0, 
      count, 
      'Country'
    );

    yield put({ 
      type: actionTypes.SET_TOP_DEVICES,
      payload: result || initialState.top_devices
    });
  } catch (e) {
    console.log("err", e);
    toaster.danger(
      `Error fetching top devices`,
      { id: "analytics-top-devices" }
    );
    yield put({ 
      type: actionTypes.SET_TOP_DEVICES,
      payload: initialState.top_devices
    });
  }
}

export default function* emotesSaga() {
  yield takeLatest(actionTypes.LOAD_EMOTE_STATE, loadEmoteState);

  yield takeLatest(actionTypes.LOAD_TOP_ARTICLES, loadTopArticles);

  yield takeLatest(actionTypes.LOAD_TOP_COUNTRIES, loadTopCountries);
  yield takeLatest(actionTypes.LOAD_TOP_CITIES, loadTopCities);

  yield takeLatest(actionTypes.LOAD_TOP_OSS, loadTopOss);
  yield takeLatest(actionTypes.LOAD_TOP_BROWSERS, loadTopBrowsers);
  yield takeLatest(actionTypes.LOAD_TOP_DEVICES, loadTopDevices);
}
