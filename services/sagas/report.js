import { call, put, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import { 
  fetchSchedules,
} from "@/services/api/report";
import { actionTypes } from "@/services/actions/report";

export function* loadSchedules() {
  try {
    const token = yield select(({ session }) => session.token);

    const result = yield call(fetchSchedules, token);

    yield put({ 
      type: actionTypes.SET_SCHEDULES, 
      payload: result,
    });
  } catch (e) {
    console.log("err", e);
    yield put({ type: actionTypes.SET_ERROR });
  }
}

export default function* reportSaga() {
  yield takeLatest(actionTypes.LOAD_SCHEDULES, loadSchedules);
}
