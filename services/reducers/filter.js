import moment from "moment"
import { actionTypes } from '@/services/actions/filter'

// ==== 🗄️ Reducer
export const initialState = {
  host: null,
  dateRange: [
    moment().subtract(1, "weeks"),
    moment()
  ],
  date: moment().subtract(1, "days"),
}

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_HOST: {
      return { ...state, host: action.payload }
    }
    case actionTypes.SET_DATERANGE: {
      return { ...state, dateRange: action.payload }
    }
    case actionTypes.SET_HOST_DATERANGE: {
      const { host, dateRange } = action.payload
      return { ...state, host, dateRange}
    }
    case actionTypes.SET_FILTER: {
      return { ...state, ...action.payload }
    }

    default:
      return state
  }
}

export default filterReducer
