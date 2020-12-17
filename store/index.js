import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
// Stores
import sessionReducer from "@/services/reducers/session";
import sitesReducer from "@/services/reducers/sites";
import filterReducer from "@/services/reducers/filter";
import moderationReducer from "@/services/reducers/moderation";
import analyticsReducer from "@/services/reducers/analytics";
import realtimeReducer from "@/services/reducers/realtime";
import reportReducer from "@/services/reducers/report";
import revenueReducer from "@/services/reducers/revenue";
// === Scenes Stores
import settingsPageStore from "@/scenes/Settings/ducks";

// Sagas
import { logActions } from "@/services/logActionsSaga";
import moderationSaga from "@/services/sagas/moderation";
import analyticsSaga from "@/services/sagas/analytics";
import reportSaga from "@/services/sagas/report";
import revenueSaga from "@/services/sagas/revenue";
import sessionSaga from "@/services/sagas/session";
import sitesSaga from "@/services/sagas/sites";
// === Scenes Sagas
import { runSettingsPageSagas } from "@/scenes/Settings/sagas";


const rootReducer = combineReducers({
  session: sessionReducer,
  filter: filterReducer,
  sites: sitesReducer,
  moderation: moderationReducer,
  analytics: analyticsReducer,
  realtime: realtimeReducer,
  report: reportReducer,
  revenue: revenueReducer,
  ...settingsPageStore,
});

export function initializeStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const composeArgs = [sagaMiddleware, thunk];

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...composeArgs))
  );

  if (process.env.NODE_ENV === "development") {
    sagaMiddleware.run(logActions);
  }

  sagaMiddleware.run(sessionSaga);
  sagaMiddleware.run(sitesSaga);
  sagaMiddleware.run(moderationSaga);
  sagaMiddleware.run(analyticsSaga);
  sagaMiddleware.run(reportSaga);
  sagaMiddleware.run(revenueSaga);
  runSettingsPageSagas(sagaMiddleware.run);

  return store;
}

export default initializeStore;
