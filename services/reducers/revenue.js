import { actionTypes } from '@/services/actions/revenue';

// ==== 🗄️ Reducer
export const initialState = {
  revenue: [],
  revenue_loading: false,

  payments: [],
  payments_loading: false,
  pageSize: 25,

  error: "",
};

export const revenueReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_REVENUE_BY_DOMAIN: case actionTypes.LOAD_REVENUE_BY_SINGLEDATE: {
      return { ...state, revenue: initialState.revenue };
    }
    case actionTypes.SET_REVENUE: {
      return { ...state, revenue: action.payload };
    }
    case actionTypes.SET_REVENUE_LOADING: {
      return { ...state, revenue_loading: action.payload };
    }

    case actionTypes.SET_ERROR: {
      return { ...state, error: action.payload };
    }
    case actionTypes.CLEAR_ERROR: {
      return { ...state, error: initialState.error };
    }

    case actionTypes.LOAD_PAYMENTS: {
      return { ...state, payments: initialState.payments };
    }
    case actionTypes.SET_PAYMENTS: {
      return { ...state, payments: action.payload };
    }
    case actionTypes.SET_PAYMENTS_LOADING: {
      return { ...state, payments_loading: action.payload };
    }

    default:
      return state;
  }
};

export default revenueReducer;
