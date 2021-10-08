import {
  call,
  put,
  select,
  takeLatest,
  takeLeading,
  spawn,
  delay
} from "redux-saga/effects";
import {
  getAdminProfile,
  updateAdminProfile,
  updateAdminEmail,
  updateAdminPassword,
  setFlag,
  setFlagByApiKey,
  blockForOffence,
  unblockOffenceItem,
  blockForOffenceByApiKey,
  unblockOffenceItemByApiKey,
  addUser,
  addUserByApiKey,
  getUsers,
  deleteUser,
  deleteUserByApiKey,
  updateUser,
  updateUserByApiKey,
  changePasswordForUser,
  updateAdminProfileByApiKey,
  updateLoginTypes,
  updateDefaultTotCount,
  getBillingInfo,
  setBillingInfo,
  updateBillingInfo,
  updateDefaultTotCountByApiKey,
  updateLoginTypesByApiKey,
  setTotIntervalByApiKey,
  setTotInterval,
  whitelistEmail,
  whitelistEmailByApiKey,
  deleteWhitelistedEmails,
  deleteWhitelistedEmailsByApiKey,
  getWhitelistedEmails,
  updateDefaultSorting,
  updateDefaultSortingByApiKey,
  updateExternalSearch,
  updateExternalSearchByApiKey,
  getWhitelistedCount
} from "@/services/api/settings";
import { actions, actionTypes } from "../ducks/settings";
import * as sessionActions from "@/services/actions/session";
import { makeArrayFromOffensiveList, calculateLoginTypes2 } from "../utils";
import { toaster } from "evergreen-ui";

export function* fetchAdminProfile() {
  try {
    const token = yield select(({ session }) => session.token);
    const host = yield select(({ filter }) => filter.host);

    if (host) {
      const data = yield call(getAdminProfile, token, host);
      yield put(
        actions.setAdminProfileData({
          adminEmail: data.adminEmail,
          avatar: data.avatar,
          name: data.name,
          moderation: data.moderation,
          notifyAdmin: data.notifyAdmin,
          notifyModerator: data.notifyModerator,
          objKeywordExactMatch: data.objKeywordExactMatch,
          linksToModeration: data.linksToModeration,
          imagesToModeration: data.imagesToModeration,
          loginTypes: data.loginTypes,
          defaultTotCount: data.defaultTotCount,
          defaultTotInterval: data.toTInterval,
          defaultCommentSorting: data.defaultCommentSorting,
          searchOptions: data.searchOptions,
          offensiveEmail: makeArrayFromOffensiveList(data.offensiveEmail),
          offensiveIp: makeArrayFromOffensiveList(data.offensiveIp),
          offensiveKeywords: makeArrayFromOffensiveList(data.offensiveKeywords)
        })
      );
    }
  } catch (e) {
    yield put(actions.setAdminProfileError());
    toaster.danger("Could not fetch admin information for that host.", {
      id: "unsuccessful-admin-profile"
    });
    console.log("something went wrong", e.message);
  }
}

export function* updateAdminProfileSaga(action) {
  try {
    const token = yield select(({ session }) => session.token);
    const apiKey = yield select(({ session }) => session.apiKey);
    const user = yield select(({ session }) => session.user);
    const host = yield select(({ filter }) => filter.host);

    if (host) {
      yield call(
        action.allSites ? updateAdminProfileByApiKey : updateAdminProfile,
        token,
        action.allSites ? apiKey : host,
        action.name,
        action.avatar
      );
      yield put(
        actions.profileUpdateSuccess({
          name: action.name,
          avatar: action.avatar
        })
      );
      if (action.allSites) {
        yield put(
          sessionActions.setUserProfile({
            ...user,
            name: action.name,
            pictureUrl: action.avatar
          })
        );
      }
    }
    toaster.success("Profile info updated", {
      id: "successful-admin-profile-update"
    });
  } catch (e) {
    yield put(actions.profileUpdateError());
    toaster.danger(
      "Something went wrong with your request! Please try again or contact support",
      { id: "unsuccessful-admin-profile-update" }
    );
    console.log("Something went wrong", e.message);
  }
}

export function* updateAdminEmailSaga(action) {
  try {
    const token = yield select(({ session }) => session.token);
    const data = yield call(
      updateAdminEmail,
      token,
      action.adminEmail,
      action.password
    );

    yield put(
      actions.adminEmailUpdateSuccess({
        adminEmail: action.adminEmail
      })
    );
    yield put(sessionActions.saveToken(data));
    toaster.success("Email successfully updated", {
      id: "successful-admin-email-update"
    });
  } catch (e) {
    yield put(actions.adminEmailUpdateError());
    if (e.message === "same_email") {
      toaster.danger("The email you typed is exactly the same", {
        id: "unsuccessful-email-update"
      });
    } else if (e.message === "wrong_password") {
      toaster.danger("Wrong password", {
        id: "unsuccessful-email-update"
      });
    } else {
      toaster.danger(
        "Something went wrong with your request! Please try again later.",
        { id: "unsuccessful-email-update" }
      );
    }
    console.log("Something went wrong", e.message);
  }
}

export function* updateAdminPasswordSaga(action) {
  try {
    const token = yield select(({ session }) => session.token);
    yield call(
      updateAdminPassword,
      token,
      action.oldPassword,
      action.newPassword
    );

    yield put(actions.adminPasswordUpdateSuccess());
    toaster.success("Password successfully changed", {
      id: "successful-password-update"
    });
  } catch (e) {
    yield put(actions.adminPasswordUpdateError());
    if (e.message === "wrong_password") {
      toaster.danger(
        "You entered your current password incorrectly! Please try again.",
        { id: "unsuccessful-password-update" }
      );
    } else {
      toaster.danger(
        "Something went wrong with your request! Please try again later.",
        { id: "unsuccessful-password-update" }
      );
    }
    console.log("Something went wrong", e.message);
  }
}

export function* setFlagSaga(action) {
  try {
    const token = yield select(({ session }) => session.token);
    const host = yield select(({ filter }) => filter.host);
    const apiKey = yield select(({ session }) => session.apiKey);

    yield call(
      !action.allSites ? setFlag : setFlagByApiKey,
      token,
      action.flagName,
      action.flagValue,
      !action.allSites ? host : apiKey
    );
    switch (action.type) {
      case actionTypes.SET_MODERATION_FLAG_REQUEST:
        yield put({
          type: actionTypes.SET_MODERATION_FLAG_SUCCESS,
          payload: action.flagValue
        });
        toaster.success(
          `Moderation is now ${action.flagValue ? "on" : "off"}!`,
          { id: "general-moderation-flag-update" }
        );
        break;
      case actionTypes.SET_LINK_MODERATION_FLAG_REQUEST:
        yield put({
          type: actionTypes.SET_LINK_MODERATION_FLAG_SUCCESS,
          payload: action.flagValue
        });
        toaster.success(
          `Link moderation in comments is now ${
            action.flagValue ? "on" : "off"
          }!`,
          { id: "link-moderation-flag-update" }
        );
        break;
      case actionTypes.SET_IMAGES_MODERATION_FLAG_REQUEST:
        yield put({
          type: actionTypes.SET_IMAGES_MODERATION_FLAG_SUCCESS,
          payload: action.flagValue
        });
        toaster.success(
          `Image moderation in comments is now ${
            action.flagValue ? "on" : "off"
          }!`,
          { id: "images-moderation-flag-update" }
        );
        break;
      case actionTypes.SET_EXACT_BLOCK_WORD_MATCH_REQUEST:
        yield put({
          type: actionTypes.SET_EXACT_BLOCK_WORD_MATCH_SUCCESS,
          payload: action.flagValue
        });
        toaster.success(
          `Exact block word matching is now ${
            action.flagValue ? "on" : "off"
          }!`,
          { id: "word-matching-flag-update" }
        );
        break;
      case actionTypes.SET_NOTIFICATION_FOR_ADMIN_REQUEST:
        yield put({
          type: actionTypes.SET_NOTIFICATION_FOR_ADMIN_SUCCESS,
          payload: action.flagValue
        });
        toaster.success(
          `Notifications for admin are now ${action.flagValue ? "on" : "off"}!`,
          { id: "notif-admin-flag-update" }
        );
        break;
      case actionTypes.SET_NOTIFICATION_FOR_MODERATOR_REQUEST:
        yield put({
          type: actionTypes.SET_NOTIFICATION_FOR_MODERATOR_SUCCESS,
          payload: action.flagValue
        });
        toaster.success(
          `Notifications for moderator are now ${
            action.flagValue ? "on" : "off"
          }!`,
          { id: "notif-moderator-flag-update" }
        );
        break;
    }
  } catch (e) {
    yield put(actions.setFlagError());
    toaster.danger(
      "Something went wrong with your request! Please try again later.",
      { id: "unsuccessful-set-flag" }
    );
    console.log("Something went wrong", e.message);
  }
}

export function* setOffensiveSaga(action) {
  try {
    const token = yield select(({ session }) => session.token);
    const apiKey = yield select(({ session }) => session.apiKey);
    const host = yield select(({ filter }) => filter.host);

    let data;

    action.decision === "block"
      ? (data = yield call(
          !action.allSites ? blockForOffence : blockForOffenceByApiKey,
          token,
          !action.allSites ? host : apiKey,
          action.offValues,
          action.offensiveType
        ))
      : (data = yield call(
          !action.allSites ? unblockOffenceItem : unblockOffenceItemByApiKey,
          token,
          !action.allSites ? host : apiKey,
          action.offValues,
          action.offensiveType
        ));

    switch (action.type) {
      case actionTypes.BLOCK_WORD_REQUEST:
        yield put({
          type: actionTypes.BLOCK_WORD_SUCCESS,
          payload: makeArrayFromOffensiveList(data.offensiveKeywords),
          allSites: action.allSites,
          words: action.offValues
        });
        toaster.success(`Word(s) successfully blocked`, {
          id: "successful-word-block"
        });
        break;
      case actionTypes.UNBLOCK_WORD_REQUEST:
        yield put({
          type: actionTypes.UNBLOCK_WORD_SUCCESS,
          payload: makeArrayFromOffensiveList(data.offensiveKeywords),
          allSites: action.allSites,
          words: action.offValues
        });
        toaster.success(`Word successfully unblocked`, {
          id: "successful-word-unblock"
        });
        break;
      case actionTypes.BLOCK_EMAIL_REQUEST:
        yield put({
          type: actionTypes.BLOCK_EMAIL_SUCCESS,
          payload: makeArrayFromOffensiveList(data.offensiveEmail),
          allSites: action.allSites,
          emails: action.offValues
        });
        toaster.success(`Email(s) successfully blocked`, {
          id: "successful-email-block"
        });
        break;
      case actionTypes.UNBLOCK_EMAIL_REQUEST:
        yield put({
          type: actionTypes.UNBLOCK_EMAIL_SUCCESS,
          payload: makeArrayFromOffensiveList(data.offensiveEmail),
          allSites: action.allSites,
          emails: action.offValues
        });
        toaster.success(`Email successfully unblocked`, {
          id: "successful-email-unblock"
        });
        break;
      case actionTypes.BLOCK_IP_REQUEST:
        yield put({
          type: actionTypes.BLOCK_IP_SUCCESS,
          payload: makeArrayFromOffensiveList(data.offensiveIp),
          allSites: action.allSites,
          ips: action.offValues
        });
        toaster.success(`IP(s) successfully blocked`, {
          id: "successful-ip-block"
        });
        break;
      case actionTypes.UNBLOCK_IP_REQUEST:
        yield put({
          type: actionTypes.UNBLOCK_IP_SUCCESS,
          payload: makeArrayFromOffensiveList(data.offensiveIp),
          allSites: action.allSites,
          ips: action.offValues
        });
        toaster.success(`IP successfully unblocked`, {
          id: "successful-ip-unblock"
        });
        break;
    }
  } catch (e) {
    console.log("err", e);

    let msg_description =
      "Something went wrong with your request! Please try again later.";
    if (e.message === "already_blocked") {
      msg_description = "This user is already blocked";
    } else if (e.message === "already_in_whitelist") {
      msg_description = "This user is already whitelisted";
    }

    toaster.danger("Error", {
      description: msg_description,
      duration: 5,
      id: "unsuccessful-block-unblock"
    });
    yield put(actions.setBlockError());
  }
}

export function* addUserSaga(action) {
  try {
    const token = yield select(({ session }) => session.token);
    const apiKey = yield select(({ session }) => session.apiKey);
    const host = yield select(({ filter }) => filter.host);

    yield call(
      !action.allSites ? addUser : addUserByApiKey,
      token,
      !action.allSites ? host : apiKey,
      action.email,
      action.permissions
    );
    yield put({ type: actionTypes.GET_USER_REQUEST });
    toaster.success("User added successfully", { id: "successful-add-user" });
  } catch (e) {
    yield put(actions.userManagementError());
    if (e.message === "user_exists") {
      toaster.danger("The user you are adding already exists", {
        id: "unsuccessful-add-user"
      });
    } else {
      toaster.danger("Something went wrong when trying to add a new user.", {
        id: "unsuccessful-add-user"
      });
    }
    console.log("Something went wrong", e.message);
  }
}

export function* getUserSaga() {
  try {
    const token = yield select(({ session }) => session.token);
    const data = yield call(getUsers, token);
    yield put(actions.getUserSuccess(data));
  } catch (e) {
    yield put(actions.userManagementError());
    toaster.danger("Something went wrong while trying to fetch the user list.", {
      id: "unsuccessful-fetch-user"
    });
    console.log("Something went wrong", e.message);
  }
}

export function* deleteUserSaga(action) {
  try {
    const token = yield select(({ session }) => session.token);
    const apiKey = yield select(({ session }) => session.apiKey);

    yield call(
      action.allSites ? deleteUserByApiKey : deleteUser,
      token,
      action.allSites ? apiKey : action.host,
      action.email
    );
    yield put({ type: actionTypes.GET_USER_REQUEST });
    toaster.success("User deleted successfully", {
      id: "successful-deleted-user"
    });
  } catch (e) {
    yield put(actions.userManagementError());
    toaster.danger("Something went wrong while trying to delete a user.", {
      id: "unsuccessful-delete-user"
    });
    console.log("Something went wrong", e.message);
  }
}

export function* updateUserSaga(action) {
  try {
    const token = yield select(({ session }) => session.token);
    const apiKey = yield select(({ session }) => session.apiKey);

    if (action.host && action.host != "") {
      yield call(
        updateUser,
        token,
        action.host,
        action.email,
        action.permissions
      );
    } else {
      yield call(
        updateUserByApiKey,
        token,
        apiKey,
        action.email,
        action.permissions
      );
    }
    yield put({ type: actionTypes.GET_USER_REQUEST });
    toaster.success("User updated successfully", {
      id: "successful-update-user"
    });
  } catch (e) {
    yield put(actions.userManagementError());
    toaster.danger("Something went wrong while trying to update the user.", {
      id: "unsuccessful-update-user"
    });
    console.log("Something went wrong", e.message);
  }
}

export function* changePasswordSaga(action) {
  try {
    const token = yield select(({ session }) => session.token);

    yield call(changePasswordForUser, token, action.email, action.newPassword);
    yield put(actions.setUserPasswordSuccess());
    toaster.success("User password updated", {
      id: "successful-user-password-update"
    });
  } catch (e) {
    yield put(actions.userManagementError());
    toaster.danger(
      "Something went wrong while trying to update the user's password.",
      {
        id: "unsuccessful-user-password-update"
      }
    );
    console.log("Something went wrong", e.message);
  }
}

export function* setLoginTypes(action) {
  try {
    const token = yield select(({ session }) => session.token);
    const apiKey = yield select(({ session }) => session.apiKey);
    const host = yield select(({ filter }) => filter.host);

    const data = yield call(
      action.allSites ? updateLoginTypesByApiKey : updateLoginTypes,
      token,
      action.allSites ? "" : host,
      action.allSites ? apiKey : "",
      action.loginTypes
    );
    yield put(
      actions.setLoginTypesSuccess(
        calculateLoginTypes2(
          action.allSites ? action.loginTypes : data.currentLoginTypes,
          action.allSites
        )
      )
    );
    toaster.success("Login types are successfully set", {
      id: "successful-set-login-types"
    });
  } catch (e) {
    yield put(actions.commentsSettingsError());
    toaster.danger("Something went wrong while trying to update the login types.", {
      id: "unsuccessful-set-login-types"
    });
    console.log("Something went wrong", e.message);
  }
}

export function* setLoginTypesToSSOOnly(action) {
  try {
    const token = yield select(({ session }) => session.token);
    const apiKey = yield select(({ session }) => session.apiKey);
    const host = yield select(({ filter }) => filter.host);

    yield call(
      action.allSites ? updateLoginTypesByApiKey : updateLoginTypes,
      token,
      action.allSites ? "" : host,
      action.allSites ? apiKey : "",
      [
        {
          loginType: 1,
          isAllowed: false
        },
        {
          loginType: 2,
          isAllowed: false
        },
        {
          loginType: 4,
          isAllowed: false
        },
        {
          loginType: 8,
          isAllowed: false
        },
        {
          loginType: 16,
          isAllowed: false
        },
        {
          loginType: 32,
          isAllowed: false
        },
        {
          loginType: 64,
          isAllowed: true
        }
      ]
    );
    yield put(actions.setLoginTypesSuccess(64));
    toaster.success("Login type is successfully set to SSO only", {
      id: "successful-set-login-types"
    });
  } catch (e) {
    yield put(actions.commentsSettingsError());
    toaster.danger(
      "Something went wrong while trying to set login type to SSO only.",
      {
        id: "unsuccessful-set-login-types"
      }
    );
    console.log("Something went wrong", e.message);
  }
}

export function* getBillingData() {
  try {
    const token = yield select(({ session }) => session.token);
    const data = yield call(getBillingInfo, token);
    yield put(actions.getPaymentDetailsSuccess(data));
  } catch (e) {
    yield put(actions.paymentDetailsError());
    toaster.danger("Something went wrong while trying to fetch payment info.", {
      id: "unsuccessful-fetch-payment-data"
    });
    console.log("Something went wrong", e.message);
  }
}

export function* setOrUpdateBillingData(action) {
  try {
    const token = yield select(({ session }) => session.token);
    const apiKey = yield select(({ session }) => session.apiKey);
    yield call(
      action.paymentData.billingDataExists ? updateBillingInfo : setBillingInfo,
      token,
      apiKey,
      action.paymentData
    );
    toaster.success("Your payment details were successfuly saved", {
      id: "successful-save-payment-data"
    });
  } catch (e) {
    yield put(actions.paymentDetailsError());
    toaster.danger("Something went wrong while trying to save your payment info.", {
      id: "unsuccessful-save-payment-data"
    });
    console.log("Something went wrong", e.message);
  }
}

export function* updateTotSaga(action) {
  try {
    const token = yield select(({ session }) => session.token);
    const apiKey = yield select(({ session }) => session.apiKey);
    const host = yield select(({ filter }) => filter.host);

    yield call(
      action.allSites ? updateDefaultTotCountByApiKey : updateDefaultTotCount,
      token,
      action.allSites ? "" : host,
      action.allSites ? apiKey : "",
      action.count
    );
    toaster.success("Talk of the town article count updated successfuly", {
      id: "successful-update-tot"
    });
  } catch (e) {
    if (e.message === 'invalid_tot_count') {
      toaster.danger("Talk of the town article count should be a number in range of 0 and 12", {
        id: "unsuccessful-update-tot"
      });
    }
    yield put(actions.commentsSettingsError());
    console.log("Something went wrong", e.message);
  }
}

export function* updateTotIntervalSaga(action) {
  try {
    const token = yield select(({ session }) => session.token);
    const apiKey = yield select(({ session }) => session.apiKey);
    const host = yield select(({ filter }) => filter.host);

    yield call(
      action.allSites ? setTotIntervalByApiKey : setTotInterval,
      token,
      action.allSites ? apiKey : host,
      action.count
    );
    toaster.success("Talk of the Town interval updated successfuly", {
      id: "successful-update-tot-interval"
    });
  } catch (e) {
    yield put(actions.commentsSettingsError());
    console.log("Something went wrong", e.message);
  }
}

export function* updateDefaultSortingSaga(action) {
  try {
    const token = yield select(({ session }) => session.token);
    const apiKey = yield select(({ session }) => session.apiKey);
    const host = yield select(({ filter }) => filter.host);

    yield call(
      action.allSites ? updateDefaultSortingByApiKey : updateDefaultSorting,
      token,
      action.allSites ? apiKey : host,
      action.sorting
    );
    toaster.success("Comments default sorting updated successfuly", {
      id: "successful-update-default-sorting"
    });
    yield put(actions.updateDefaultSortingSuccess(action.sorting));
  } catch (e) {
    yield put(actions.commentsSettingsError());
    console.log("Something went wrong", e.message);
  }
}

export function* updateExternalSearchSaga(action) {
  try {
    const token = yield select(({ session }) => session.token);
    const apiKey = yield select(({ session }) => session.apiKey);
    const host = yield select(({ filter }) => filter.host);

    yield call(
      action.allSites ? updateExternalSearchByApiKey : updateExternalSearch,
      token,
      action.allSites ? apiKey : host,
      action.searchOptions
    );
    toaster.success("Comments external search option updated successfuly", {
      id: "successful-update-external-search-option"
    });
    yield put(actions.updateDefaultSortingSuccess(action.sorting));
  } catch (e) {
    yield put(actions.commentsSettingsError());
    console.log("Something went wrong", e.message);
  }
}

export function* whitelistFetchSaga() {
  try {
    const token = yield select(({ session }) => session.token);
    const host = yield select(({ filter }) => filter.host);
    const emails = yield select(
      ({ settingsPage }) => settingsPage.whitelistedEmail[host]
    );

    const data = yield call(
      getWhitelistedEmails,
      token,
      host,
      emails ? emails.length : 0
    );

    yield put(actions.whitelistGetSuccess(data, host));
  } catch (e) {
    console.log("Something went wrong", e.message);
  }
}

export function* whitelistCountSaga() {
  try {
    const token = yield select(({ session }) => session.token);
    const host = yield select(({ filter }) => filter.host);
    const count = yield select(
      ({ settingsPage }) => settingsPage.whitelistedEmailCounts[host]
    );
    let data;

    if (!count) {
      data = yield call(getWhitelistedCount, token, host);
    } else {
      data = count;
    }

    yield put(actions.whitelistCountSuccess(host, data));
  } catch (e) {
    console.log("Something went wrong", e.message);
  }
}

export function* whitelistAddSaga(action) {
  try {
    const token = yield select(({ session }) => session.token);
    const apiKey = yield select(({ session }) => session.apiKey);
    const host = yield select(({ filter }) => filter.host);

    yield call(
      action.allSites ? whitelistEmailByApiKey : whitelistEmail,
      token,
      action.allSites ? apiKey : host,
      action.emails
    );

    yield put(
      actions.whitelistAddSuccess(action.emails, host, action.allSites)
    );
    toaster.success("The email(s) were successfuly whitelisted", {
      id: "successful-add-whitelist"
    });
  } catch (e) {
    yield put(actions.setBlockError());
    let errorMessage = "Something went wrong when trying to add email(s) to the whitelist.";

    if (e.message === "already_whitelisted") {
      errorMessage = "This user is already whitelisted.";
    } else if (e.message === "already_in_blacklist") {
      errorMessage = "This user is already blacklisted.";
    } else if (e.message === "in_master_blacklist") {
      errorMessage = "This user can not be whitelisted because they're blocked from using Admin globally.";
    } else if (e.message === "invalid_user_email") {
      errorMessage = "The email you have provided is invalid";
    } 

    toaster.danger(
      "Whitelisting error.",
      {
        description: errorMessage,
        id: "unsuccessful-add-whitelist"
      }
    );
    console.log("Something went wrong", e.message);
  }
}

export function* whitelistDeleteSaga(action) {
  try {
    const token = yield select(({ session }) => session.token);
    const apiKey = yield select(({ session }) => session.apiKey);
    const host = yield select(({ filter }) => filter.host);

    yield call(
      action.allSites
        ? deleteWhitelistedEmailsByApiKey
        : deleteWhitelistedEmails,
      token,
      action.allSites ? apiKey : host,
      action.emails
    );

    yield put(
      actions.whitelistDeleteSuccess(action.emails, host, action.allSites)
    );
    toaster.success(`${action.emails} is now removed from the whitelist`, {
      id: "successful-remove-whitelist"
    });
  } catch (e) {
    yield put(actions.setBlockError());
    toaster.danger(
      "Something went wrong when trying to remove email(s) from the whitelist.",
      {
        id: "unsuccessful-remove-whitelist"
      }
    );
    console.log("Something went wrong", e.message);
  }
}

export function* settingsPageFlow() {
  yield takeLeading(actionTypes.ADMIN_PROFILE_REQUEST, fetchAdminProfile);
  yield takeLeading(actionTypes.PROFILE_UPDATE_REQUEST, updateAdminProfileSaga);

  yield takeLatest(
    actionTypes.ADMIN_EMAIL_UPDATE_REQUEST,
    updateAdminEmailSaga
  );
  yield takeLatest(
    actionTypes.ADMIN_PASSWORD_UPDATE_REQUEST,
    updateAdminPasswordSaga
  );

  yield takeLatest(actionTypes.SET_MODERATION_FLAG_REQUEST, setFlagSaga);
  yield takeLatest(actionTypes.SET_LINK_MODERATION_FLAG_REQUEST, setFlagSaga);
  yield takeLatest(actionTypes.SET_IMAGES_MODERATION_FLAG_REQUEST, setFlagSaga);
  yield takeLatest(actionTypes.SET_EXACT_BLOCK_WORD_MATCH_REQUEST, setFlagSaga);
  yield takeLatest(actionTypes.SET_NOTIFICATION_FOR_ADMIN_REQUEST, setFlagSaga);

  yield takeLatest(
    actionTypes.SET_NOTIFICATION_FOR_MODERATOR_REQUEST,
    setFlagSaga
  );

  yield takeLatest(actionTypes.BLOCK_WORD_REQUEST, setOffensiveSaga);
  yield takeLatest(actionTypes.BLOCK_IP_REQUEST, setOffensiveSaga);
  yield takeLatest(actionTypes.BLOCK_EMAIL_REQUEST, setOffensiveSaga);

  yield takeLatest(actionTypes.WHITELIST_ADD_EMAIL_REQUEST, whitelistAddSaga);
  yield takeLatest(
    actionTypes.WHITELIST_REMOVE_EMAIL_REQUEST,
    whitelistDeleteSaga
  );
  yield takeLatest(actionTypes.WHITELIST_GET_REQUEST, whitelistFetchSaga);
  yield takeLatest(actionTypes.WHITELIST_COUNT_REQUEST, whitelistCountSaga);

  yield takeLatest(actionTypes.UNBLOCK_WORD_REQUEST, setOffensiveSaga);
  yield takeLatest(actionTypes.UNBLOCK_IP_REQUEST, setOffensiveSaga);
  yield takeLatest(actionTypes.UNBLOCK_EMAIL_REQUEST, setOffensiveSaga);

  yield takeLatest(actionTypes.GET_USER_REQUEST, getUserSaga);
  yield takeLatest(actionTypes.ADD_USER_REQUEST, addUserSaga);
  yield takeLatest(actionTypes.UPDATE_USER_REQUEST, updateUserSaga);
  yield takeLatest(actionTypes.DELETE_USER_REQUEST, deleteUserSaga);
  yield takeLatest(actionTypes.SET_USER_PASSWORD_REQUEST, changePasswordSaga);

  yield takeLatest(actionTypes.SET_LOGIN_TYPES_REQUEST, setLoginTypes);
  yield takeLatest(
    actionTypes.SET_LOGIN_TO_SSO_REQUEST,
    setLoginTypesToSSOOnly
  );

  yield takeLatest(actionTypes.GET_PAYMENT_DETAILS_REQUEST, getBillingData);
  yield takeLatest(
    actionTypes.SAVE_OR_UPDATE_PAYMENT_DETAILS_REQUEST,
    setOrUpdateBillingData
  );

  yield takeLatest(actionTypes.UPDATE_TOT_COUNT_REQUEST, updateTotSaga);
  yield takeLatest(
    actionTypes.UPDATE_TOT_INTERVAL_REQUEST,
    updateTotIntervalSaga
  );

  yield takeLatest(
    actionTypes.UPDATE_DEFAULT_SORTING_REQUEST,
    updateDefaultSortingSaga
  );
  yield takeLatest(
    actionTypes.UPDATE_EXTERNAL_SEARCH_REQUEST,
    updateExternalSearchSaga
  );
}

/**
 *  We have lots of actions and some APIs here can easily return an error response,
 *  which can crash the whole settings page flow. The sole purpose of this root generator
 *  is to restart the settingsPageFlow when it crashes
 */
export function* settingsPageRoot() {
  yield spawn(function*() {
    while (true) {
      try {
        yield call(settingsPageFlow);
        console.error("unexpected root saga termination.", settingsPageFlow);
      } catch (e) {
        console.error("Saga error, the saga will be restarted", e);
      }
      yield delay(1000); // Workaround to avoid infinite error loops
    }
  });
}
