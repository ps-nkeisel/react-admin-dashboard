import { actionTypes } from '@/services/actions/moderation';

// ==== 🗄️ Reducer
export const initialState = {
  loading: false,
  error: false,

  pageSize: 25,
  state: 2,    // pending
  tag: '',

  search_type: '',
  search_param: '',

  sort_dir: 1,

  commentsCount: {
    pending: 0,
    rejected: 0,
    approved: 0,
    flagged: 0,
  },
  tags: [],
  lastfetchCount: 0,

  moderations: [],

  mod_selects: [],

  commentThread: null,
  loadingThread: false,
};

export const moderationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING: {
      return { ...state, loading: action.payload };
    }
    case actionTypes.SET_ERROR: {
      return { ...state, error: action.payload };
    }

    case actionTypes.SET_COMMENTSCOUNT: {
      return { ...state, commentsCount: action.payload };
    }
    case actionTypes.SET_TAGS: {
      return { ...state, tags: action.payload };
    }
    case actionTypes.SET_MODERATIONS: {
      return { ...state, moderations: action.payload };
    }
    case actionTypes.SET_LASTFETCHCOUNT: {
      return { ...state, lastfetchCount: action.payload };
    }

    case actionTypes.SET_PAGESIZE: {
      return { ...state, pageSize: action.payload };
    }
    case actionTypes.SET_STATE: {
      if (action.payload == 0 || action.payload == 1) {   // approved, rejected
        return { ...state, state: action.payload };
      } else {
        return { ...state, state: action.payload };
      }
    }
    case actionTypes.SET_TAG: {
      return { ...state, tag: action.payload };
    }
    case actionTypes.SET_SEARCH_TYPE: {
      return { ...state, search_type: action.payload };
    }
    case actionTypes.SET_SEARCH_PARAM: {
      return { ...state, search_param: action.payload };
    }
    case actionTypes.SET_SEARCH_TYPE: {
      return { ...state, search_type: action.payload };
    }
    case actionTypes.SET_SEARCH_TYPE_AND_PARAM: {
      const { type, param } = action.payload;
      return { ...state, search_type: type, search_param: param };
    }
    case actionTypes.SET_SORTDIR: {
      const dir = action.payload;
      let moderations = state.moderations;
      moderations.sort((m1, m2) => m1['createdTimestamp'] > m2['createdTimestamp'] ? -dir : dir);
      return { ...state, sort_dir: dir, moderations }
    }

    case actionTypes.SET_FILTER_PARAMS: {
      const { sort_dir } = action.payload;
      let moderations = state.moderations;
      if (sort_dir != state.sort_dir) {
        moderations.sort((m1, m2) => m1['createdTimestamp'] > m2['createdTimestamp'] ? -sort_dir : sort_dir);
      }
      return { ...state, ...action.payload, moderations };
    }

    case actionTypes.SET_COMMENTTHREAD: {
      return { ...state, commentThread: action.payload };
    }
    case actionTypes.SET_LOADINGTHREAD: {
      return { ...state, loadingThread: action.payload };
    }

    case actionTypes.SET_MOD_SELECTS: {
      return { ...state, mod_selects: action.payload };
    }

    default:
      return state;
  }
};

export default moderationReducer;
