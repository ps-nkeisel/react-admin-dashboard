const profileSettingsActionTypes = {
  ADMIN_EMAIL_UPDATE_REQUEST: "@settings/admin-email-update-request",
  ADMIN_EMAIL_UPDATE_SUCCESS: "@settings/admin-email-update-success",
  ADMIN_EMAIL_UPDATE_ERROR: "@settings/admin-email-update-error",
  ADMIN_PASSWORD_UPDATE_REQUEST: "@settings/admin-password-update-request",
  ADMIN_PASSWORD_UPDATE_SUCCESS: "@settings/admin-password-update-success",
  ADMIN_PASSWORD_UPDATE_ERROR: "@settings/admin-password-update-error",
  PROFILE_UPDATE_REQUEST: "@settings/profile-update-request",
  PROFILE_UPDATE_SUCCESS: "@settings/profile-update-success",
  PROFILE_UPDATE_ERROR: "@settings/profile-update-error"
};

export const generalSettingsActionTypes = {
  SET_MODERATION_FLAG_REQUEST: "@settings/set-moderation-flag-request",
  SET_MODERATION_FLAG_SUCCESS: "@settings/set-moderation-flag-success",
  SET_LINK_MODERATION_FLAG_REQUEST:
    "@settings/set-link-moderation-flag-request",
  SET_LINK_MODERATION_FLAG_SUCCESS:
    "@settings/set-link-moderation-flag-success",
  SET_IMAGES_MODERATION_FLAG_REQUEST:
    "@settings/set-images-moderation-flag-request",
  SET_IMAGES_MODERATION_FLAG_SUCCESS:
    "@settings/set-images-moderation-flag-success",
  SET_EXACT_BLOCK_WORD_MATCH_REQUEST:
    "@settings/set-exact-block-word-match-request",
  SET_EXACT_BLOCK_WORD_MATCH_SUCCESS:
    "@settings/set-exact-block-word-match-success",
  SET_NOTIFICATION_FOR_ADMIN_REQUEST:
    "@settings/set-notification-for-admin-request",
  SET_NOTIFICATION_FOR_ADMIN_SUCCESS:
    "@settings/set-notification-for-admin-success",
  SET_NOTIFICATION_FOR_MODERATOR_REQUEST:
    "@settings/set-notification-for-moderator-request",
  SET_NOTIFICATION_FOR_MODERATOR_SUCCESS:
    "@settings/set-notification-for-moderator-success",
  SET_FLAG_ERROR: "@settings/set-flag-error"
};

export const paymentDetailsActionTypes = {
  GET_PAYMENT_DETAILS_REQUEST: "@settings/get-payment-details-request",
  GET_PAYMENT_DETAILS_SUCCESS: "@settings/get-payment-details-success",
  SAVE_OR_UPDATE_PAYMENT_DETAILS_REQUEST:
    "@settings/save-update-payment-details-request",
  SAVE_OR_UPDATE_PAYMENT_DETAILS_SUCCESS:
    "@settings/save-update-payment-details-success",
  PAYMENT_DETAILS_ERROR: "@settings/payment-details-error"
};

export const advancedSettingsActionTypes = {
  BLOCK_WORD_REQUEST: "@settings/block-word-request",
  BLOCK_WORD_SUCCESS: "@settings/block-word-success",
  BLOCK_IP_REQUEST: "@settings/block-ip-request",
  BLOCK_IP_SUCCESS: "@settings/block-ip-success",
  BLOCK_EMAIL_REQUEST: "@settings/block-email-request",
  BLOCK_EMAIL_SUCCESS: "@settings/block-email-success",
  UNBLOCK_WORD_REQUEST: "@settings/unblock-word-request",
  UNBLOCK_WORD_SUCCESS: "@settings/unblock-word-success",
  UNBLOCK_IP_REQUEST: "@settings/unblock-ip-request",
  UNBLOCK_IP_SUCCESS: "@settings/unblock-ip-success",
  UNBLOCK_EMAIL_REQUEST: "@settings/unblock-email-request",
  UNBLOCK_EMAIL_SUCCESS: "@settings/unblock-email-success",
  WHITELIST_GET_REQUEST: "@settings/whitelist-get-request",
  WHITELIST_GET_SUCCESS: "@settings/whitelist-get-success",
  WHITELIST_ADD_EMAIL_REQUEST: "@settings/whitelist-add-email-request",
  WHITELIST_ADD_EMAIL_SUCCESS: "@settings/whitelist-add-email-success",
  WHITELIST_REMOVE_EMAIL_REQUEST: "@settings/whitelist-remove-email-request",
  WHITELIST_REMOVE_EMAIL_SUCCESS: "@settings/whitelist-remove-email-success",
  WHITELIST_COUNT_REQUEST: "@settings/whitelist-count-request",
  WHITELIST_COUNT_SUCCESS: "@settings/whitelist-count-success",
  BLOCK_ERROR: "@settings/block-error"
};

export const commentsSettingsActionTypes = {
  SET_LOGIN_TYPES_REQUEST: "@settings/set-login-types-request",
  SET_LOGIN_TYPES_SUCCESS: "@settings/set-login-types-success",
  SET_LOGIN_TO_SSO_REQUEST: "@settings/set-login-to-sso-request",
  SET_LOGIN_TO_SSO_SUCCESS: "@settings/set-login-to-sso-success",
  UPDATE_TOT_COUNT_REQUEST: "@settings/update-tot-request",
  UPDATE_TOT_COUNT_SUCCESS: "@settings/update-tot-success",
  UPDATE_TOT_INTERVAL_REQUEST: "@settings/update-tot-interval-request",
  UPDATE_TOT_INTERVAL_SUCCESS: "@settings/update-tot-interval-success",
  UPDATE_DEFAULT_SORTING_REQUEST: "@settings/update-default-sorting-request",
  UPDATE_DEFAULT_SORTING_SUCCESS: "@settings/update-default-sorting-success",
  UPDATE_EXTERNAL_SEARCH_REQUEST: "@settings/update-external-search-request",
  UPDATE_EXTERNAL_SEARCH_SUCCESS: "@settings/update-external-search-success",
  COMMENTS_SETTINGS_ERROR: "@settings/comments-settings-error"
};

export const userManagementActionTypes = {
  GET_USER_REQUEST: "@settings/get-user-request",
  GET_USER_SUCCESS: "@settings/get-user-success",
  ADD_USER_REQUEST: "@settings/add-user-request",
  ADD_USER_SUCCESS: "@settings/add-user-success",
  UPDATE_USER_REQUEST: "@settings/update-user-request",
  UPDATE_USER_SUCCESS: "@settings/update-user-success",
  DELETE_USER_REQUEST: "@settings/delete-user-request",
  DELETE_USER_SUCCESS: "@settings/delete-user-success",
  SET_USER_PASSWORD_REQUEST: "@settings/set-user-password-request",
  SET_USER_PASSWORD_SUCCESS: "@settings/set-user-password-success",
  MANAGEMENT_REQUEST_ERROR: "@settings/management-request-error"
};

/** Actions from different store/reducer */
export const alienActionTypes = {
  RESET_SESSION: "@session/reset"
}

export const actionTypes = {
  ADMIN_PROFILE_REQUEST: "@settings/admin-profile-request",
  ADMIN_PROFILE_SUCCESS: "@settings/admin-profile-success",
  ADMIN_PROFILE_ERROR: "@settings/admin-profile-error",
  ...profileSettingsActionTypes,
  ...generalSettingsActionTypes,
  ...paymentDetailsActionTypes,
  ...advancedSettingsActionTypes,
  ...commentsSettingsActionTypes,
  ...userManagementActionTypes,
  ...alienActionTypes
};

export const initialState = {
  adminEmail: "",
  avatar: "",
  name: "",
  moderation: false,
  notifyAdmin: false,
  notifyModerator: false,
  objKeywordExactMatch: false,
  linksToModeration: false,
  imagesToModeration: false,
  loginTypes: 0,
  defaultCommentSorting: 0,
  defaultTotCount: 0,
  defaultTotInterval: 0,
  searchOptions: 0,
  users: [],
  offensiveEmail: [],
  offensiveIp: [],
  offensiveKeywords: [],
  whitelistedEmail: {},
  whitelistedEmailCounts: {},
  hasNextWhitelistPage: false,
  loading: false,
  whiteListLoading: false,
  error: false,
  paymentData: {}
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_EMAIL_UPDATE_SUCCESS:
      return { ...state, loading: false, adminEmail: action.payload };
    case actionTypes.ADMIN_PASSWORD_UPDATE_SUCCESS:
      return { ...state, loading: false };

    case actionTypes.SET_MODERATION_FLAG_SUCCESS:
      return { ...state, loading: false, moderation: action.payload };
    case actionTypes.SET_LINK_MODERATION_FLAG_SUCCESS:
      return { ...state, loading: false, linksToModeration: action.payload };
    case actionTypes.SET_IMAGES_MODERATION_FLAG_SUCCESS:
      return { ...state, loading: false, imagesToModeration: action.payload };
    case actionTypes.SET_EXACT_BLOCK_WORD_MATCH_SUCCESS:
      return { ...state, loading: false, objKeywordExactMatch: action.payload };
    case actionTypes.SET_NOTIFICATION_FOR_ADMIN_SUCCESS:
      return { ...state, loading: false, notifyAdmin: action.payload };
    case actionTypes.SET_NOTIFICATION_FOR_MODERATOR_SUCCESS:
      return { ...state, loading: false, notifyModerator: action.payload };

    case actionTypes.BLOCK_EMAIL_SUCCESS:
      if (action.allSites) {
        return {
          ...state,
          loading: false,
          offensiveEmail: [...action.emails.split(","), ...state.offensiveEmail]
        };
      }
      return { ...state, loading: false, offensiveEmail: action.payload };
    case actionTypes.UNBLOCK_EMAIL_SUCCESS:
      if (action.allSites) {
        const emails = action.emails.split(",");
        return {
          ...state,
          loading: false,
          offensiveEmail: [
            ...state.offensiveEmail.filter(email => !emails.includes(email))
          ]
        };
      }
      return { ...state, loading: false, offensiveEmail: action.payload };
    case actionTypes.BLOCK_IP_SUCCESS:
      if (action.allSites) {
        return {
          ...state,
          loading: false,
          offensiveIp: [...action.ips.split(","), ...state.offensiveIp]
        };
      }
      return { ...state, loading: false, offensiveIp: action.payload };
    case actionTypes.UNBLOCK_IP_SUCCESS:
      if (action.allSites) {
        const ips = action.ips.split(",");
        return {
          ...state,
          loading: false,
          offensiveIp: [...state.offensiveIp.filter(ip => !ips.includes(ip))]
        };
      }
      return { ...state, loading: false, offensiveIp: action.payload };
    case actionTypes.BLOCK_WORD_SUCCESS:
      if (action.allSites) {
        return {
          ...state,
          loading: false,
          offensiveKeywords: [
            ...action.words.split(","),
            ...state.offensiveKeywords
          ]
        };
      }
      return { ...state, loading: false, offensiveKeywords: action.payload };
    case actionTypes.UNBLOCK_WORD_SUCCESS:
      if (action.allSites) {
        const words = action.words.split(",");
        return {
          ...state,
          loading: false,
          offensiveKeywords: [
            ...state.offensiveKeywords.filter(word => !words.includes(word))
          ]
        };
      }
      return { ...state, loading: false, offensiveKeywords: action.payload };

    case actionTypes.GET_USER_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case actionTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload]
      };

    case actionTypes.SET_LOGIN_TO_SSO_SUCCESS:
    case actionTypes.DELETE_USER_SUCCESS:
    case actionTypes.UPDATE_TOT_COUNT_SUCCESS:
    case actionTypes.UPDATE_TOT_INTERVAL_SUCCESS:
      return { ...state, loading: false };

    case actionTypes.UPDATE_USER_SUCCESS:
    case actionTypes.SET_USER_PASSWORD_SUCCESS:
    case actionTypes.SET_LOGIN_TYPES_SUCCESS:
      return { ...state, loading: false, loginTypes: action.loginTypes };

    case actionTypes.ADMIN_PROFILE_SUCCESS:
    case actionTypes.PROFILE_UPDATE_SUCCESS:
      return { ...state, loading: false, ...action.payload };

    case actionTypes.GET_PAYMENT_DETAILS_SUCCESS:
      return { ...state, loading: false, paymentData: action.payload };
    case actionTypes.UPDATE_DEFAULT_SORTING_SUCCESS:
      return {
        ...state,
        loading: false,
        defaultCommentSorting: action.payload
      };
    case actionTypes.UPDATE_EXTERNAL_SEARCH_SUCCESS:
      return { ...state, loading: false, searchOptions: action.payload };
    
    case actionTypes.WHITELIST_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        whiteListLoading: false,
        whitelistedEmailCounts: {
          ...state.whitelistedEmailCounts,
          [action.host]: action.count
        }
      }

    case actionTypes.WHITELIST_GET_SUCCESS:
      const fetchedEmailList = state.whitelistedEmail[action.host]
        ? [...state.whitelistedEmail[action.host], ...action.emails]
        : [...action.emails];
      return {
        ...state,
        loading: false,
        whiteListLoading: false,
        whitelistedEmail: {
          ...state.whitelistedEmail,
          [action.host]: [...fetchedEmailList]
        },
        hasNextWhitelistPage:
          action.emails.length === 10 ||
          fetchedEmailList.length === 10 || fetchedEmailList % 10 === 0
      };

    case actionTypes.WHITELIST_REMOVE_EMAIL_SUCCESS:
      const emailsToRemove = action.emails.split(",");
      const currentEmailsForRemove = { ...state.whitelistedEmail };
      if (action.allSites && currentEmailsForRemove) {
        const hosts = Object.keys(currentEmailsForRemove);
        if (hosts.length >= 0) {
          for (let key in currentEmailsForRemove) {
            currentEmailsForRemove[key] = currentEmailsForRemove[key].filter(
              email => !emailsToRemove.includes(email)
            );
          }

          return {
            ...state,
            loading: false,
            whiteListLoading: false,
            whitelistedEmail: {
              ...state.whitelistedEmail,
              ...currentEmailsForRemove
            }
          };
        }
      } else {
        return {
          ...state,
          loading: false,
          whiteListLoading: false,
          whitelistedEmail: {
            ...state.whitelistedEmail,
            [action.host]: [
              ...state.whitelistedEmail[action.host].filter(
                email => !emailsToRemove.includes(email)
              )
            ]
          }
        };
      }

    case actionTypes.WHITELIST_ADD_EMAIL_SUCCESS:
      const emailsToAdd = action.emails.split(",");
      const currentEmailsForAdd = { ...state.whitelistedEmail };
      if (action.allSites && currentEmailsForAdd) {
        const hosts = Object.keys(currentEmailsForAdd);
        if (hosts.length >= 0) {
          for (let key in currentEmailsForAdd) {
            currentEmailsForAdd[key] = [
              ...state.whitelistedEmail[key],
              ...emailsToAdd
            ];
          }

          return {
            ...state,
            loading: false,
            whiteListLoading: false,
            whitelistedEmail: {
              ...state.whitelistedEmail,
              ...currentEmailsForAdd
            }
          };
        }
      } else {
        return {
          ...state,
          loading: false,
          whiteListLoading: false,
          whitelistedEmail: {
            ...state.whitelistedEmail,
            [action.host]: state.whitelistedEmail[action.host]
              ? [...state.whitelistedEmail[action.host], ...emailsToAdd]
              : [...emailsToAdd]
          }
        };
      }

    case actionTypes.BLOCK_EMAIL_REQUEST:
    case actionTypes.BLOCK_IP_REQUEST:
    case actionTypes.BLOCK_WORD_REQUEST:
    case actionTypes.UNBLOCK_EMAIL_REQUEST:
    case actionTypes.UNBLOCK_IP_REQUEST:
    case actionTypes.UNBLOCK_WORD_REQUEST:
    case actionTypes.PROFILE_UPDATE_REQUEST:
    case actionTypes.ADMIN_PROFILE_REQUEST:
    case actionTypes.ADMIN_EMAIL_UPDATE_REQUEST:
    case actionTypes.ADMIN_PASSWORD_UPDATE_REQUEST:
    case actionTypes.SET_MODERATION_FLAG_REQUEST:
    case actionTypes.SET_LINK_MODERATION_FLAG_REQUEST:
    case actionTypes.SET_IMAGES_MODERATION_FLAG_REQUEST:
    case actionTypes.SET_EXACT_BLOCK_WORD_MATCH_REQUEST:
    case actionTypes.SET_LOGIN_TYPES_REQUEST:
    case actionTypes.SET_LOGIN_TO_SSO_REQUEST:
    case actionTypes.SET_NOTIFICATION_FOR_ADMIN_REQUEST:
    case actionTypes.SET_NOTIFICATION_FOR_AUTHOR_REQUEST:
    case actionTypes.SET_NOTIFICATION_FOR_MODERATOR_REQUEST:
    case actionTypes.ADD_USER_REQUEST:
    case actionTypes.UPDATE_USER_REQUEST:
    case actionTypes.GET_USER_REQUEST:
    case actionTypes.DELETE_USER_REQUEST:
    case actionTypes.SET_USER_PASSWORD_REQUEST:
    case actionTypes.GET_PAYMENT_DETAILS_REQUEST:
    case actionTypes.UPDATE_TOT_COUNT_REQUEST:
    case actionTypes.UPDATE_TOT_INTERVAL_REQUEST:
    case actionTypes.UPDATE_DEFAULT_SORTING_REQUEST:
    case actionTypes.UPDATE_DEFAULT_SORTING_REQUEST:
      return { ...state, loading: true };

    case actionTypes.WHITELIST_GET_REQUEST:
    case actionTypes.WHITELIST_ADD_EMAIL_REQUEST:
    case actionTypes.WHITELIST_REMOVE_EMAIL_REQUEST:
    case actionTypes.WHITELIST_COUNT_REQUEST:
      return { ...state, loading: true, whiteListLoading: true };

    case actionTypes.PROFILE_UPDATE_ERROR:
    case actionTypes.ADMIN_PROFILE_ERROR:
    case actionTypes.ADMIN_EMAIL_UPDATE_ERROR:
    case actionTypes.ADMIN_PASSWORD_UPDATE_ERROR:
    case actionTypes.SET_FLAG_ERROR:
    case actionTypes.BLOCK_ERROR:
    case actionTypes.MANAGEMENT_REQUEST_ERROR:
    case actionTypes.COMMENTS_SETTINGS_ERROR:
    case actionTypes.PAYMENT_DETAILS_ERROR:
      return { ...state, error: true, loading: false, whiteListLoading: false };
    case actionTypes.RESET_SESSION:
      return initialState;
    default:
      return state;
  }
};

export default settingsReducer;

export const getAdminProfileRequest = () => ({
  type: actionTypes.ADMIN_PROFILE_REQUEST
});

export const setAdminProfileData = data => ({
  type: actionTypes.ADMIN_PROFILE_SUCCESS,
  payload: data
});

export const setAdminProfileError = () => ({
  type: actionTypes.ADMIN_PROFILE_ERROR
});

export const profileUpdateRequest = (name, avatar, allSites) => ({
  type: actionTypes.PROFILE_UPDATE_REQUEST,
  name,
  avatar,
  allSites
});

export const profileUpdateSuccess = data => ({
  type: actionTypes.PROFILE_UPDATE_SUCCESS,
  payload: data
});

export const profileUpdateError = () => ({
  type: actionTypes.PROFILE_UPDATE_ERROR
});

export const adminEmailUpdateRequest = (adminEmail, password) => ({
  type: actionTypes.ADMIN_EMAIL_UPDATE_REQUEST,
  adminEmail,
  password
});

export const adminEmailUpdateSuccess = data => ({
  type: actionTypes.ADMIN_EMAIL_UPDATE_SUCCESS,
  payload: data
});

export const adminEmailUpdateError = () => ({
  type: actionTypes.ADMIN_EMAIL_UPDATE_ERROR
});

export const adminPasswordUpdateRequest = (oldPassword, newPassword) => ({
  type: actionTypes.ADMIN_PASSWORD_UPDATE_REQUEST,
  oldPassword,
  newPassword
});

export const adminPasswordUpdateSuccess = () => ({
  type: actionTypes.ADMIN_PASSWORD_UPDATE_SUCCESS
});

export const adminPasswordUpdateError = () => ({
  type: actionTypes.ADMIN_PASSWORD_UPDATE_ERROR
});

export const setFlagRequest = (actionType, flagValue, flagName, allSites) => ({
  type: actionType,
  flagValue,
  flagName,
  allSites
});

export const setFlagError = () => ({
  type: actionTypes.SET_FLAG_ERROR
});

export const setBlockRequest = (
  actionType,
  offValues,
  offensiveType,
  decision,
  allSites = false
) => ({
  type: actionType,
  offValues,
  offensiveType,
  decision,
  allSites
});

export const setBlockError = () => ({
  type: actionTypes.BLOCK_ERROR
});

export const whitelistAddRequest = (emails, allSites = false) => ({
  type: actionTypes.WHITELIST_ADD_EMAIL_REQUEST,
  emails,
  allSites
});

export const whitelistAddSuccess = (emails, host, allSites = false) => ({
  type: actionTypes.WHITELIST_ADD_EMAIL_SUCCESS,
  emails,
  host,
  allSites
});

export const whitelistDeleteRequest = (emails, allSites) => ({
  type: actionTypes.WHITELIST_REMOVE_EMAIL_REQUEST,
  emails,
  allSites
});

export const whitelistDeleteSuccess = (emails, host, allSites) => ({
  type: actionTypes.WHITELIST_REMOVE_EMAIL_SUCCESS,
  emails,
  host,
  allSites
});

export const whitelistGetRequest = () => ({
  type: actionTypes.WHITELIST_GET_REQUEST
});

export const whitelistGetSuccess = (emails, host) => ({
  type: actionTypes.WHITELIST_GET_SUCCESS,
  emails,
  host
});

export const whitelistCountRequest = host => ({
  type: actionTypes.WHITELIST_COUNT_REQUEST,
  host
});

export const whitelistCountSuccess = (host, count) => ({
  type: actionTypes.WHITELIST_COUNT_SUCCESS,
  host,
  count
});

export const addUserRequest = (email, permissions, allSites) => ({
  type: actionTypes.ADD_USER_REQUEST,
  email,
  permissions,
  allSites
});

export const addUserSuccess = data => ({
  type: actionTypes.ADD_USER_SUCCESS,
  payload: data
});

export const updateUserRequest = (email, permissions, host) => ({
  type: actionTypes.UPDATE_USER_REQUEST,
  email,
  permissions,
  host
});

export const updateUserSuccess = () => ({
  type: actionTypes.UPDATE_USER_SUCCESS
});

export const getUserRequest = () => ({
  type: actionTypes.GET_USER_REQUEST
});

export const getUserSuccess = data => ({
  type: actionTypes.GET_USER_SUCCESS,
  payload: data
});

export const deleteUserRequest = (email, host, allSites = false) => ({
  type: actionTypes.DELETE_USER_REQUEST,
  email,
  host,
  allSites
});

export const deleteUserSuccess = email => ({
  type: actionTypes.DELETE_USER_SUCCESS,
  email
});

export const setUserPasswordRequest = (email, newPassword) => ({
  type: actionTypes.SET_USER_PASSWORD_REQUEST,
  email,
  newPassword
});

export const setUserPasswordSuccess = () => ({
  type: actionTypes.SET_USER_PASSWORD_SUCCESS
});

export const userManagementError = () => ({
  type: actionTypes.MANAGEMENT_REQUEST_ERROR
});

export const setLoginTypes = (loginTypes, allSites = false) => ({
  type: actionTypes.SET_LOGIN_TYPES_REQUEST,
  loginTypes,
  allSites
});

export const setLoginToSSO = (allSites = false) => ({
  type: actionTypes.SET_LOGIN_TO_SSO_REQUEST,
  allSites
});

export const setLoginTypesSuccess = loginTypes => ({
  type: actionTypes.SET_LOGIN_TYPES_SUCCESS,
  loginTypes
});

export const commentsSettingsError = () => ({
  type: actionTypes.COMMENTS_SETTINGS_ERROR
});

export const paymentDetailsError = () => ({
  type: actionTypes.PAYMENT_DETAILS_ERROR
});

export const getPaymentDetails = () => ({
  type: actionTypes.GET_PAYMENT_DETAILS_REQUEST
});

export const getPaymentDetailsSuccess = payload => ({
  type: actionTypes.GET_PAYMENT_DETAILS_SUCCESS,
  payload
});

export const setOrUpdatePaymentDetails = paymentData => ({
  type: actionTypes.SAVE_OR_UPDATE_PAYMENT_DETAILS_REQUEST,
  paymentData
});

export const updateTotRequest = (count, allSites = false) => ({
  type: actionTypes.UPDATE_TOT_COUNT_REQUEST,
  count,
  allSites
});

export const updateTotSuccess = () => ({
  type: actionTypes.UPDATE_TOT_COUNT_SUCCESS
});

export const updateTotIntervalRequest = (count, allSites = false) => ({
  type: actionTypes.UPDATE_TOT_INTERVAL_REQUEST,
  count,
  allSites
});

export const updateTotIntervalSuccess = () => ({
  type: actionTypes.UPDATE_TOT_INTERVAL_SUCCESS
});

export const updateDefaultSortingRequest = (sorting, allSites = false) => ({
  type: actionTypes.UPDATE_DEFAULT_SORTING_REQUEST,
  sorting,
  allSites
});

export const updateDefaultSortingSuccess = sorting => ({
  type: actionTypes.UPDATE_TOT_INTERVAL_SUCCESS,
  payload: sorting
});

export const updateExternalSearchRequest = (
  searchOptions,
  allSites = false
) => ({
  type: actionTypes.UPDATE_EXTERNAL_SEARCH_REQUEST,
  searchOptions,
  allSites
});

export const updateExternalSearchSuccess = searchOptions => ({
  type: actionTypes.UPDATE_EXTERNAL_SEARCH_SUCCESS,
  payload: searchOptions
});

const setFlagActions = {
  setFlagRequest,
  setFlagError
};

const blockActions = {
  setBlockRequest,
  setBlockError
};

const whitelistActions = {
  whitelistAddRequest,
  whitelistAddSuccess,
  whitelistGetRequest,
  whitelistGetSuccess,
  whitelistDeleteRequest,
  whitelistDeleteSuccess,
  whitelistCountRequest,
  whitelistCountSuccess
};

const profileSettingsActions = {
  profileUpdateRequest,
  profileUpdateSuccess,
  profileUpdateError,
  adminEmailUpdateRequest,
  adminEmailUpdateSuccess,
  adminEmailUpdateError,
  adminPasswordUpdateRequest,
  adminPasswordUpdateSuccess,
  adminPasswordUpdateError
};

const userManagementActions = {
  getUserRequest,
  getUserSuccess,
  addUserRequest,
  addUserSuccess,
  updateUserRequest,
  updateUserSuccess,
  deleteUserRequest,
  deleteUserSuccess,
  setUserPasswordRequest,
  setUserPasswordSuccess,
  userManagementError
};

const paymentDetailsActions = {
  getPaymentDetails,
  getPaymentDetailsSuccess,
  setOrUpdatePaymentDetails,
  paymentDetailsError
};

export const commentsSettingsActions = {
  setLoginTypes,
  setLoginTypesSuccess,
  setLoginToSSO,
  updateTotRequest,
  updateTotSuccess,
  updateTotIntervalRequest,
  updateTotIntervalSuccess,
  updateDefaultSortingRequest,
  updateDefaultSortingSuccess,
  updateExternalSearchRequest,
  updateExternalSearchSuccess,
  commentsSettingsError
};

export const actions = {
  getAdminProfileRequest,
  setAdminProfileData,
  setAdminProfileError,
  ...profileSettingsActions,
  ...setFlagActions,
  ...blockActions,
  ...whitelistActions,
  ...commentsSettingsActions,
  ...userManagementActions,
  ...paymentDetailsActions
};
