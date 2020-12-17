import { actionTypes } from '@/services/actions/analytics/comments';
import { 
  filterUnknown,
  filterDevices,
} from "@/utils";

// ==== 🗄️ Reducer
export const initialState = {
  top_commenters: [],
  top_commenters_loading: false,

  top_tags: [],
  top_tags_loading: false,

  comment_stats: {},
  comment_stats_loading: false,

  moderators: [],
  moderators_loading: false,

  moderator_comment_stats: {},
  moderator_comment_stats_loading: false,

  moderator: '',

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

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_TOP_COMMENTERS: {
      return { ...state, top_commenters: initialState.top_commenters, top_commenters_loading: true };
    }
    case actionTypes.SET_TOP_COMMENTERS: {
      return { ...state, top_commenters: action.payload, top_commenters_loading: false };
    }

    case actionTypes.LOAD_TOP_TAGS: {
      return { ...state, top_tags: initialState.top_tags, top_tags_loading: true };
    }
    case actionTypes.SET_TOP_TAGS: {
      return { ...state, top_tags: action.payload, top_tags_loading: false };
    }

    case actionTypes.LOAD_COMMENT_STATS: {
      return { ...state, comment_stats: initialState.comment_stats, comment_stats_loading: true };
    }
    case actionTypes.SET_COMMENT_STATS: {
      return { ...state, comment_stats: action.payload, comment_stats_loading: false };
    }

    case actionTypes.LOAD_MODERATORS: {
      return { ...state, moderators: initialState.moderators, moderators_loading: true };
    }
    case actionTypes.SET_MODERATORS: {
      return { ...state, moderators: action.payload, moderators_loading: false };
    }

    case actionTypes.SET_MODERATOR: {
      return { ...state, moderator: action.payload };
    }

    case actionTypes.LOAD_MODERATOR_COMMENT_STATS: {
      return { ...state, moderator_comment_stats: initialState.moderator_comment_stats, moderator_comment_stats_loading: true };
    }
    case actionTypes.SET_MODERATOR_COMMENT_STATS: {
      return { ...state, moderator_comment_stats: action.payload, moderator_comment_stats_loading: false };
    }

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

export default commentsReducer;
