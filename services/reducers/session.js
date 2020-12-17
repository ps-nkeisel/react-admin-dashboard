import { actionTypes } from '@/services/actions/session';

// ==== 🗄️ Reducer
export const initialState = {
  prevUrl: '/',
  title: 'Vuukle Dashboard',

  loading: false,
  error: false,

  token: null,
  apiKey: null,
  secretKey: null,

  user: {},

  permissions: [],

  sites: [],
  avatars: [],

  isUserAdmin: false,
  isRevenueEnabled: false,
  isBillingComplete: false,
  isRealtimeEnabled: false,
  isEmailVerified: false,

  img: null,

  fontSize: 14,
};

export const sessionReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: payload };

    case actionTypes.SAVE_TOKEN:
      return { ...state, token: payload };
    case actionTypes.REMOVE_TOKEN:
      return initialState;

    case actionTypes.SET_KEYS:
      return { ...state, apiKey: payload.apiKey, secretKey: payload.secretKey };
    case actionTypes.SET_USER_PROFILE:
      return { ...state, user: payload };
    case actionTypes.SET_PERMISSIONS:
      return { ...state, ...payload };
    case actionTypes.SET_SITES:
      return { ...state, sites: payload.sites, avatars: payload.avatarLst };

    case actionTypes.INCREASE_PAGE_FONTSIZE: {
      return { ...state, fontSize: state.fontSize + 1 };
    }
    case actionTypes.DECREASE_PAGE_FONTSIZE: {
      return { ...state, fontSize: Math.max(state.fontSize - 1, 1) };
    }

    case actionTypes.UPDATE_TITLE: {
      return { ...state, title: payload };
    }

    case actionTypes.SAVE_URL:
      return { ...state, prevUrl: payload };

    case actionTypes.RESET_SESSION:
      return initialState;

    default:
      return state;
  }
};

export default sessionReducer;
