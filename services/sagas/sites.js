import { call, put, select, takeLatest } from "redux-saga/effects";
import { 
  getSiteStatsByToken, 
  addNewHost, 
} from "@/services/api/sites";
import { actionTypes } from "@/services/actions/sites";
import { calculateTotalStatsFromAPIResponse } from "@/utils";
import { toaster } from "evergreen-ui";
import moment from "moment";

export function* loadSiteStats() {
  try {
    const token = yield select(({ session }) => session.token);

    const site_stats = yield call(getSiteStatsByToken, token, moment.utc().subtract(1, "days").startOf("day").unix(), moment.utc().subtract(1, "days").endOf("day").unix());
    site_stats.sort((a ,b) => b.pageViews - a.pageViews)
    yield put({
      type: actionTypes.SET_SITE_STATS,
      payload: site_stats,
    });

    const total_stats = calculateTotalStatsFromAPIResponse(site_stats);
    yield put({
      type: actionTypes.SET_TOTAL_STATS,
      payload: total_stats,
    });
  } catch (e) {
    console.log("err", e);
  }
}

export function* addNewSite(params) {
  yield put({ type: actionTypes.SET_LOADING, payload: true });
  try {
    const site = params.payload;
    const token = yield select(({ session }) => session.token);

    yield call(addNewHost, token, site);
    yield call(loadSiteStats);
    toaster.success(`${site} was successfully added`, {
      id: "add-new-site-success"
    });
  } catch (e) {
    if (e.message === "account_exists") {
      toaster.warning("That site already exists", {
        id: "add-new-site-failure"
      });
    } else if (e.message === "user_not_admin") {
      toaster.warning("Website can not be added", {
        description: "This account doesn't have admin rights",
        id: "add-new-site-failure"
      });
    } else {
      toaster.warning("Something went wrong with the request!", {
        id: "add-new-site-failure"
      });
    }
  } finally {
    yield put({ type: actionTypes.SET_LOADING, payload: false });
  }
}

export default function* sitesSaga() {
  yield takeLatest(actionTypes.LOAD_SITE_STATS, loadSiteStats);
  yield takeLatest(actionTypes.ADD_NEW_SITE, addNewSite);
}
