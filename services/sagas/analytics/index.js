import { call, put, select, take, takeEvery, takeLatest, all } from "redux-saga/effects";
import moment from "moment";
import { toaster } from "evergreen-ui";

import commentsSaga from "./comments";
import emotesSaga from "./emotes";
import recommendationsSaga from "./recommendations";

import { 
  compare_dates,
} from "@/utils";
import {
  getSiteStats,
  getSiteStatsByApiKey,
  getStatsByHostTimeSeries,
  getStatsByApiKeyTimeSeries,
} from "@/services/api/analytics";

import { actionTypes } from "@/services/actions/analytics";
import { initialState } from "@/services/reducers/analytics";

export function* loadDailySiteStats() {
  try {
    const { token, apiKey } = yield select(({ session }) => session);
    const { host, dateRange } = yield select(({ filter }) => filter);

    const result = yield call(
      host ? getSiteStats : getSiteStatsByApiKey, 
      token, 
      host ? host : apiKey,
      moment(dateRange[0]).startOf('day').utc(true).unix(),
      moment(dateRange[1]).startOf('day').utc(true).unix()
    );

    yield put({ 
      type: actionTypes.SET_DAILY_SITE_STATS,
      payload: result || initialState.daily_site_stats
    });
  } catch (e) {
    console.log("err", e);
    toaster.danger(
      `Error fetching daily site stats`,
      { id: "analytics-daily-site-stats" }
    );
    yield put({ 
      type: actionTypes.SET_DAILY_SITE_STATS,
      payload: initialState.daily_site_stats
    });
  }
}

export function* loadMonthStats() {
  try {
    const { token, apiKey } = yield select(({ session }) => session);
    const host = yield select(({ filter }) => filter.host);

    const month_stats = yield call(
      host ? getStatsByHostTimeSeries : getStatsByApiKeyTimeSeries, 
      token, 
      host ? host : apiKey
    );

    month_stats.sort((m1, m2) => compare_dates(m1.statsDay, m2.statsDay));

    yield put({ 
      type: actionTypes.SET_MONTH_STATS,
      payload: month_stats || initialState.month_stats
    });
  } catch (e) {
    console.log("err", e);
    toaster.danger(
      `Error fetching month stats`,
      { id: "analytics-montn-stats" }
    );
    yield put({ 
      type: actionTypes.SET_MONTH_STATS,
      payload: initialState.month_stats
    });
  }
}

export default function* analyticsSaga() {
  yield takeLatest(actionTypes.LOAD_MONTH_STATS, loadMonthStats);
  yield takeLatest(actionTypes.LOAD_DAILY_SITE_STATS, loadDailySiteStats);

  yield all({
    comments: call(commentsSaga),
    emotes: call(emotesSaga),
    recommendations: call(recommendationsSaga),
  })
}
