import { actionTypes } from '@/services/actions/analytics/recommendations';
import { 
  filterUnknown,
  filterDevices,
} from "@/utils";

// ==== 🗄️ Reducer
export const initialState = {
  top_articles: [],
  top_articles_loading: false,

  top_countries: {},
  top_countries_loading: false,

  top_cities: {},
  top_cities_loading: false,

  top_oss: {},
  top_oss_loading: false,

  top_browsers: {},
  top_browsers_loading: false,

  top_devices: {},
  top_devices_loading: false,
};

export const recommendationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_TOP_ARTICLES: {
      return { ...state, top_articles: initialState.top_articles, top_articles_loading: true };
    }
    case actionTypes.SET_TOP_ARTICLES: {
      return { ...state, top_articles: action.payload, top_articles_loading: false };
    }

    case actionTypes.LOAD_TOP_COUNTRIES: {
      return { ...state, top_countries: initialState.top_countries, top_countries_loading: true };
    }
    case actionTypes.SET_TOP_COUNTRIES: {
      return { ...state, top_countries: filterUnknown(action.payload), top_countries_loading: false };
    }

    case actionTypes.LOAD_TOP_CITIES: {
      return { ...state, top_cities: initialState.top_cities, top_cities_loading: true };
    }
    case actionTypes.SET_TOP_CITIES: {
      return { ...state, top_cities: filterUnknown(action.payload), top_cities_loading: false };
    }

    case actionTypes.LOAD_TOP_OSS: {
      return { ...state, top_oss: initialState.top_oss, top_oss_loading: true };
    }
    case actionTypes.SET_TOP_OSS: {
      return { ...state, top_oss: filterUnknown(action.payload), top_oss_loading: false };
    }

    case actionTypes.LOAD_TOP_BROWSERS: {
      return { ...state, top_browsers: initialState.top_browsers, top_browsers_loading: true };
    }
    case actionTypes.SET_TOP_BROWSERS: {
      return { ...state, top_browsers: filterUnknown(action.payload), top_browsers_loading: false };
    }

    case actionTypes.LOAD_TOP_DEVICES: {
      return { ...state, top_devices: initialState.top_devices, top_devices_loading: true };
    }
    case actionTypes.SET_TOP_DEVICES: {
      return { ...state, top_devices: filterDevices(action.payload), top_devices_loading: false };
    }

    default:
      return state;
  }
};

export default recommendationsReducer;
