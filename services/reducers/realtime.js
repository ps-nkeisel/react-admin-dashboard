import { actionTypes } from "@/services/actions/realtime";

// ==== 🗄️ Reducer
export const initialState = {
  loading: false,
  error: false,

  article: {},
  articleStats: {},
  realtimeStatus: {},

  OnlineCount: 0,
  Shares: {},
  ViewCount: 0,
  ClientStats: {
    devices: [],
    browsers: [],
    oses: []
  },
  TopUrls: [],
  TopReferrers: [],
  TopAuthors: [],
  TopTags: [],
  TopDestinations: [],
  TopDestinationTags: [],
  AvgTimeOnPage: '',
  Min15PVs: '',
  Hour1PVs: '',
  Hour24PVs: '',
};

export const realtimeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING: {
      return { ...state, loading: action.payload };
    }
    case actionTypes.SET_ERROR: {
      return { ...state, error: action.payload };
    }

    case actionTypes.SET_DATA: {
      return { ...state, ...action.payload };
    }

    case actionTypes.SET_ARTICLE: {
      return { ...state, article: action.payload };
    }

    case actionTypes.SET_ARTICLE_STATS: {
      return { ...state, articleStats: action.payload };
    }

    case actionTypes.SET_REALTIME_STATUS_FOR_HOST: {
      return {
        ...state,
        realtimeStatus: {
          ...state.realtimeStatus,
          [action.payload.host]: action.payload.status
        }
      };
    }

    case actionTypes.RESET_SESSION: {
      return initialState;
    }

    default:
      return state;
  }
};

export default realtimeReducer;
