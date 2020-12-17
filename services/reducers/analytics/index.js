import { combineReducers } from "redux";
import { actionTypes } from '@/services/actions/analytics';
import commentsReducer from './comments';
import emotesReducer from './emotes';
import recommendationsReducer from './recommendations';

// ==== 🗄️ Reducer
export const initialState = {
  daily_site_stats: [],
  daily_site_stats_loading: false,

  month_stats: [],
  month_stats_loading: false,
};

export const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_DAILY_SITE_STATS: {
      return { ...state, daily_site_stats: initialState.daily_site_stats, daily_site_stats_loading: true };
    }
    case actionTypes.SET_DAILY_SITE_STATS: {
      return { ...state, daily_site_stats: action.payload, daily_site_stats_loading: false };
    }

    case actionTypes.LOAD_MONTH_STATS: {
      return { ...state, month_stats: initialState.month_stats, month_stats_loading: true };
    }
    case actionTypes.SET_MONTH_STATS: {
      return { ...state, month_stats: action.payload, month_stats_loading: false };
    }

    default:
      return state;
  }
};

export default combineReducers({
  index: analyticsReducer,
  comments: commentsReducer,
  emotes: emotesReducer,
  recommendations: recommendationsReducer,
});
