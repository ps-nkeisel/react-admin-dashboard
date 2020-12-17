import { actionTypes } from '@/services/actions/sites';

// ==== 🗄️ Reducer
export const initialState = {
  loading: false,

  site_stats: [],

  totalStats: {
    pageViews: 0,
    comments: 0,
    shares: 0,
    emotes: 0,
    recommendations: 0,
    pendingComments: 0,
  },
};

export const sitesReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: payload };
  
    case actionTypes.LOAD_SITE_STATS:
      return { ...state, loading: true, site_stats: initialState.site_stats };
    case actionTypes.SET_SITE_STATS:
      return { ...state, loading: false, site_stats: payload };

    case actionTypes.SET_TOTAL_STATS:
      return { ...state, totalStats: action.payload };

    default:
      return state;
  }
};

export default sitesReducer;
