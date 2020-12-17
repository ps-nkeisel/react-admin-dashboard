import {
  call,
  put,
  select,
  takeLatest
} from "redux-saga/effects";
import Cookies from "js-cookie";
import {
  getPermissionsByEmail,
  getUserProfile,
  getPublisherKeys,
  getSiteListByEmail
} from "@/services/api/session";
import { getUserType } from "@/services/api/auth";
import * as actions from "@/services/actions/session";
import { actionTypes } from "@/services/actions/session";
import { actionTypes as filterActionTypes } from "@/services/actions/filter";

import {
  checkForRouteAndRedirect,
  setTokenCookie,
  removeTokenCookie
} from "@/utils";

const delay = ms => new Promise(res => setTimeout(res, ms));

export function* loadApiKeys() {
  try {
    const sessionStore = yield select(({ session }) => session);
    const { token, apiKey } = sessionStore;
    if (!apiKey) {
      const data = yield call(getPublisherKeys, token);
      yield put(actions.setKeys(data.apiKey, data.secretKey));
    }
  } catch (err) {
    console.log("err", err);
    yield put(actions.resetSession());
  }
}

export function* loadUserProfile() {
  try {
    const token = yield select(({ session }) => session.token);

    const data = yield call(getUserProfile, token);

    yield put(actions.setUserProfile(data.user));
  } catch (err) {
    console.log("err", err);
    yield put(actions.resetSession());
  }
}

export function* loadProfilePermissions() {
  try {
    const token = yield select(({ session }) => session.token);

    const data = yield call(getPermissionsByEmail, token);

    yield put(
      actions.setPermissions({
        permissions: data.permissions == "" ? [] : data.permissions,
        isUserAdmin: data.isUserAdmin,
        isRevenueEnabled: data.isRevenueEnabled,
        isBillingComplete: data.isBillingComplete,
        isRealtimeEnabled: data.isRealtimeEnabled,
        isEmailVerified: data.isEmailVerified
      })
    );
  } catch (err) {
    console.log("err", err);
    yield put(actions.resetSession());
  }
}

export function* loadSites() {
  try {
    const token = yield select(({ session }) => session.token);

    const list = yield call(getSiteListByEmail, token);
    yield put(actions.setSites(list));
  } catch (err) {
    console.log("err", err);
    yield put(actions.setError());
  }
}

function* saveTokenAndLoadInfo(action) {
  setTokenCookie(action.payload);

  // const apiKey = yield select(({ session }) => session.apiKey);
  // if (!apiKey) {
  try {
    yield put(actions.setLoading(true));
    yield call(loadUserProfile);
    const profile = yield select(({ session }) => session.user);
    const userType = yield call(getUserType, profile.email);

    if (userType === "comment") {
      checkForRouteAndRedirect({
        routeToCheck: "login",
        comparison: "doesNotMatchRoute",
        redirectLink: "/login"
      });
    } else if (userType === "dashboard") {
      yield call(loadProfilePermissions);
      yield call(loadSites);
      yield call(loadApiKeys);

      checkForRouteAndRedirect({
        routeToCheck: "login",
        comparison: "matchesRoute",
        redirectLink: "/"
      });

      yield put(actions.setLoading(false));
    }
  } catch (e) {
    checkForRouteAndRedirect({
      routeToCheck: "login",
      comparison: "doesNotMatchRoute",
      redirectLink: "/login"
    });
  }
  // }
}

function* removeTokenAndResetSession() {
  removeTokenCookie();

  yield put({
    type: filterActionTypes.SET_HOST,
    payload: ""
  });
  yield put(actions.resetSession());
}

export default function* sessionSaga() {
  yield takeLatest(actionTypes.SAVE_TOKEN, saveTokenAndLoadInfo);
  yield takeLatest(actionTypes.REMOVE_TOKEN, removeTokenAndResetSession);

  while (true) {
    const cookieToken = Cookies.get("token");
    const sessionToken = yield select(({ session }) => session.token);
    if (!cookieToken) {
      yield put(actions.removeToken());
    } else {
      if (!sessionToken) {
        yield put(actions.saveToken(cookieToken));
      } else if (cookieToken != sessionToken) {
        yield put(actions.saveToken(cookieToken));
      }
    }
    yield delay(10000);
  }
}
