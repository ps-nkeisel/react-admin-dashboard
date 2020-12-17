import { actionTypes } from '@/services/actions/report';

// ==== 🗄️ Reducer
export const initialState = {
  schedules: [],
  schedules_loading: false,
};

export const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_SCHEDULES: {
      return { ...state, schedules: initialState.schedules, schedules_loading: true };
    }
    case actionTypes.SET_SCHEDULES: {
      return { ...state, schedules: action.payload, schedules_loading: false };
    }

    default:
      return state;
  }
};

export default reportReducer;
