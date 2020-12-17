import { call, put, select, takeLatest, takeEvery, all } from "redux-saga/effects";
import moment from "moment";

import {
  getRevenuesByHostTimeSeries, 
  getRevenuesByApiKeyTimeSeries, 
  getRevenueByDateByApiKey, 
  getPaymentHistoryByApiKey, 
} from "@/services/api/revenue";

import { actionTypes } from "@/services/actions/revenue";

export function* loadRevenueByDomain(params) {
  try {
    const { host, from, to } = params.payload;

    yield put({
      type: actionTypes.SET_REVENUE_LOADING,
      payload: true
    });

    const sessionStore = yield select(({ session }) => session);
    const { token, apiKey, isRevenueEnabled, isUserAdmin } = sessionStore;

    let result = [];
    // if (isRevenueEnabled) {
      if (host) {
        const data = yield call(getRevenuesByHostTimeSeries,
          token,
          host,
          moment(from).utc(true).unix(),
          moment(to).utc(true).unix()
        );

        result = data[host];
      } else if (apiKey) {
        const data = yield call(getRevenuesByApiKeyTimeSeries,
          token,
          apiKey,
          moment(from).utc(true).unix(),
          moment(to).utc(true).unix(),
          isUserAdmin
        );

        result = data['allsites'];
      }
    // }

    _.map(result, (item) => {
      item.entryTimeStamp = moment(item.entryTimeStamp * 1000).format('YYYY-MM-DD')
      item.vcpm = item.pageViews ? (item.revenueVal / item.pageViews) * 1000 : 0;
      item.viewability = item.bqPageViews ? item.pageViews / item.bqPageViews : 0;
    });

    yield put({
      type: actionTypes.SET_REVENUE,
      payload: result
    });
  } catch (e) {
    console.log("err", e);
    yield put({ 
      type: actionTypes.SET_ERROR,
      payload: e.message
    });
  } finally {
    yield put({
      type: actionTypes.SET_REVENUE_LOADING,
      payload: false
    });
  }
}

export function* loadRevenueByDate(params) {
  try {
    const { from, to } = params.payload;

    yield put({
      type: actionTypes.SET_REVENUE_LOADING,
      payload: true
    });

    const sessionStore = yield select(({ session }) => session);
    const { token, apiKey, isRevenueEnabled, isAdmin } = sessionStore;

    // if (isRevenueEnabled) {
      const data = yield call(getRevenueByDateByApiKey,
        token,
        apiKey,
        moment(from).utc(true).unix(),
        moment(to).utc(true).unix(),
      );

      const result = _.map(data, (item, key) => ({
        ...item,
        host: key,
        entryTimeStamp: to,
        vcpm: item.pageViews ? (item.revenueVal / item.pageViews) * 1000 : 0,
        viewability: item.bqPageViews ? item.pageViews / item.bqPageViews : 0
      }));

      yield put({
        type: actionTypes.SET_REVENUE,
        payload: result
      });
    // }
  } catch (e) {
    console.log("err", e);
    yield put({ 
      type: actionTypes.SET_ERROR,
      payload: e.message
    });
  } finally {
    yield put({
      type: actionTypes.SET_REVENUE_LOADING,
      payload: false
    });
  }
}

export function* loadPaymentHistory() {
  try {
    yield put({
      type: actionTypes.SET_PAYMENTS_LOADING,
      payload: true
    });

    const sessionStore = yield select(({ session }) => session);
    const { token, apiKey, isRevenueEnabled, isAdmin } = sessionStore;
    const dateRange = yield select(({ filter }) => filter.dateRange);
    const pageSize = yield select(({ revenue }) => revenue.pageSize);

    const data = yield call(getPaymentHistoryByApiKey, token, moment(dateRange[0]).startOf('day').utc(true).unix(), moment(dateRange[1]).endOf('day').utc(true).unix(), 0, pageSize);

    const result = _.map(data.items, (item) => ({
      ...item,
      createdTimestamp: item.createdTimestamp*1000,
      date: moment(item.date, 'MM/YYYY')
    }))

    yield put({
      type: actionTypes.SET_PAYMENTS,
      payload: result
    });
  } catch (e) {
    console.log("err", e);
    yield put({ 
      type: actionTypes.SET_ERROR,
      payload: e.message
    });
  } finally {
    yield put({
      type: actionTypes.SET_PAYMENTS_LOADING,
      payload: false
    });
  }
}
export default function* revenueSaga() {
  yield takeLatest(actionTypes.LOAD_REVENUE_BY_DOMAIN, loadRevenueByDomain);
  yield takeLatest(actionTypes.LOAD_REVENUE_BY_SINGLEDATE, loadRevenueByDate);

  yield takeLatest(actionTypes.LOAD_PAYMENTS, loadPaymentHistory);
}
