import axios from "axios";

export const getAdminProfile = (token, host) =>
  axios
    .get(process.env.API_BASE_URL + `api/v1/Publishers/adminProfile`, {
      params: { host },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const getOffensiveLists = (token, host, offensiveType) =>
  axios
    .get(process.env.API_BASE_URL + `api/v1/Publishers/offensive`, {
      params: { host, offensiveType },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const getOffensiveListsByApiKey = (token, apiKey, offensiveType) =>
  axios
    .get(process.env.API_BASE_URL + `api/v1/Publishers/offensiveByApiKey`, {
      params: { apiKey, offensiveType },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const getBillingInfo = token =>
  axios
    .get(process.env.API_BASE_URL + `api/v1/HostBillingInfos/billing`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const setBillingInfo = (
  token,
  apiKey,
  {
    companyName,
    companyAddress,
    bankAcNo,
    bankCity,
    bankName,
    branchName,
    accountType,
    swift
  }
) =>
  axios
    .post(
      process.env.API_BASE_URL + `api/v1/HostBillingInfos/billing`,
      {
        apiKey,
        companyName,
        companyAddress,
        bankAcNo,
        bankCity,
        bankName,
        branchName,
        accountType,
        swift
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const updateBillingInfo = (
  token,
  apiKey,
  {
    companyName,
    companyAddress,
    bankAcNo,
    bankCity,
    bankName,
    branchName,
    accountType,
    swift
  }
) =>
  axios
    .put(
      process.env.API_BASE_URL + `api/v1/HostBillingInfos/billing`,
      {
        apiKey,
        companyName,
        companyAddress,
        bankAcNo,
        bankCity,
        bankName,
        branchName,
        accountType,
        swift
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const updateAdminProfile = (token, host, name, pictureUrl) =>
  axios
    .put(
      process.env.API_BASE_URL + "api/v1/Publishers/updateprofile",
      {
        host,
        name,
        pictureUrl
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const updateAdminProfileByApiKey = (token, apiKey, name, pictureUrl) =>
  axios
    .put(
      process.env.API_BASE_URL + "api/v1/Publishers/updateprofilebyapikey",
      {
        apiKey,
        name,
        pictureUrl
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const updateAdminEmail = (token, email, password) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Publishers/updateAdminEmail",
      {
        email,
        password
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { token, errors } = response.data;

      if (token) {
        return token;
      }

      if (errors) {
        throw new Error(errors[0]);
      }

      throw new Error("not valid response");
    });

export const updateAdminPassword = (token, oldPassword, newPassword) =>
  axios
    .put(
      process.env.API_BASE_URL + "api/v1/Publishers/updateAdminPassword",
      {
        oldPassword,
        newPassword
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      if (errors) {
        throw new Error(errors[0]);
      }

      throw new Error("not valid response");
    });

export const setFlag = (token, flagName, flagValue, host) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Publishers/setFlag",
      {
        flagName,
        flagValue,
        host
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const setFlagByApiKey = (token, flagName, flagValue, apiKey) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Publishers/setFlagByApiKey",
      {
        flagName,
        flagValue,
        apiKey
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const blockForOffence = (token, host, offValues, offensiveType) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Publishers/offensive",
      {
        offValues,
        offensiveType,
        host
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const blockForOffenceByApiKey = (
  token,
  apiKey,
  offValues,
  offensiveType
) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Publishers/offensiveByApiKey",
      {
        offValues,
        offensiveType,
        apiKey
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const unblockOffenceItem = (token, host, offValues, offensiveType) =>
  axios
    .delete(process.env.API_BASE_URL + "api/v1/Publishers/offensive", {
      data: {
        offValues,
        offensiveType,
        host
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const unblockOffenceItemByApiKey = (
  token,
  apiKey,
  offValues,
  offensiveType
) =>
  axios
    .delete(process.env.API_BASE_URL + "api/v1/Publishers/offensiveByApiKey", {
      data: {
        offValues,
        offensiveType,
        apiKey
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const getUsers = token =>
  axios
    .get(process.env.API_BASE_URL + `api/v1/admin_users/getUsersByApiKey`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const addUser = (token, host, email, permissions) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/admin_users/add",
      {
        email,
        permissions,
        host
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      if (errors) {
        throw new Error(errors[0]);
      }

      throw new Error("not valid response");
    });

export const addUserByApiKey = (token, apiKey, email, permissions) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/admin_users/addByApiKey",
      {
        email,
        permissions,
        apiKey
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const updateUser = (token, host, email, permissions) =>
  axios
    .put(
      process.env.API_BASE_URL + "api/v1/admin_users/update",
      {
        email,
        permissions,
        host
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const updateUserByApiKey = (token, apiKey, email, permissions) =>
  axios
    .put(
      process.env.API_BASE_URL + "api/v1/admin_users/updateByApiKey",
      {
        apiKey,
        email,
        permissions
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const deleteUser = (token, host, email) =>
  axios
    .delete(process.env.API_BASE_URL + "api/v1/admin_users/delete", {
      data: {
        email,
        host
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const deleteUserByApiKey = (token, apiKey, email) =>
  axios
    .delete(process.env.API_BASE_URL + "api/v1/admin_users/deleteByApiKey", {
      data: {
        email,
        apiKey
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const changePasswordForUser = (token, email, newPassword) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Auth/changePasswordForUser",
      {
        email,
        newPassword
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const updateLoginTypes = (token, host, apiKey, loginTypes) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Publishers/updateLoginTypes",
      {
        host,
        loginTypes,
        apiKey
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const updateLoginTypesByApiKey = (token, host, apiKey, loginTypes) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Publishers/updateLoginTypesByApiKey",
      {
        host,
        loginTypes,
        apiKey
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const setSSOOnlyForPublisher = (token, host) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/VuukleAdmin/setSSOOnlyForPublisher",
      {
        host,
        token
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const setSSOOnlyForPublisherByApiKey = (token, apiKey) =>
  axios
    .post(
      process.env.API_BASE_URL +
        "api/v1/VuukleAdmin/setSSOOnlyForPublisherByApiKey",
      {
        apiKey,
        token
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const updateDefaultTotCount = (token, host, apiKey, defaultTotCount) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Publishers/updateDefaultTotCount",
      {
        host,
        apiKey,
        defaultTotCount
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const updateDefaultTotCountByApiKey = (
  token,
  host,
  apiKey,
  defaultTotCount
) =>
  axios
    .post(
      process.env.API_BASE_URL +
        "api/v1/Publishers/updateDefaultTotCountByApiKey",
      {
        host,
        apiKey,
        defaultTotCount
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      throw new Error(errors[0]);
    });

export const setTotInterval = (token, host, totInterval) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/Publishers/setToTInterval", {
      params: {
        host,
        totInterval
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { data, success } = response.data;

      if (success || response.status === 200) {
        return data;
      }

      throw new Error("not valid response");
    });

export const setTotIntervalByApiKey = (token, apiKey, totInterval) =>
  axios
    .get(
      process.env.API_BASE_URL + "api/v1/Publishers/setToTIntervalByApiKey",
      {
        params: {
          apiKey,
          totInterval
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success } = response.data;

      if (success || response.status === 200) {
        return data;
      }

      throw new Error("not valid response");
    });

export const whitelistEmail = (token, host, email) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/WhiteList/addWhitelisted",
      { host, email },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      if (errors) {
        throw new Error(errors[0]);
      }

      throw new Error("not valid details");
    });

export const getWhitelistedEmails = (token, host, start, pageSize = 10) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/WhiteList/getWhitelisted", {
      params: {
        host,
        start,
        pageSize
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { data, success } = response.data;

      if (success) {
        return data.items;
      }

      throw new Error("not valid response");
    });

export const deleteWhitelistedEmails = (token, host, email) =>
  axios
    .delete(process.env.API_BASE_URL + "api/v1/WhiteList/deleteWhitelisted", {
      data: {
        host,
        email
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { success } = response.data;

      if (success || response.status === 200) {
        return true;
      }

      throw new Error("not valid response");
    });

export const updateDefaultSorting = (token, host, defaultSorting) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Publishers/updateDefaultSorting",
      {
        host,
        defaultSorting
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { success } = response.data;

      if (success) {
        return success;
      }

      throw new Error("not valid response");
    });

export const updateDefaultSortingByApiKey = (token, apiKey, defaultSorting) =>
  axios
    .post(
      process.env.API_BASE_URL +
        "api/v1/Publishers/updateDefaultSortingByApiKey",
      {
        apiKey,
        defaultSorting
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { success } = response.data;

      if (success) {
        return success;
      }

      throw new Error("not valid response");
    });

export const updateExternalSearch = (token, host, searchOptions) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Publishers/updateSearchOptions",
      {
        host,
        searchOptions
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { success } = response.data;

      if (success) {
        return success;
      }

      throw new Error("not valid response");
    });

export const updateExternalSearchByApiKey = (token, apiKey, searchOptions) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Publishers/updateSearchOptionsApiKey",
      {
        apiKey,
        searchOptions
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { success } = response.data;

      if (success) {
        return success;
      }

      throw new Error("not valid response");
    });

export const getWhitelistedCount = (token, host) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/WhiteList/getWhitelistedCount", {
      params: {
        host
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { data, success } = response.data;

      if (success) {
        return data;
      }

      throw new Error("not valid response");
    });

export const whitelistEmailByApiKey = (token, apiKey, email) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/WhiteList/addWhitelistedByApiKey",
      { apiKey, email },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success, errors } = response.data;

      if (success) {
        return data;
      }

      if (errors) {
        throw new Error(errors[0]);
      }

      throw new Error("not valid details");
    });

export const deleteWhitelistedEmailsByApiKey = (token, apiKey, email) =>
  axios
    .delete(process.env.API_BASE_URL + "api/v1/WhiteList/deleteWhitelistedByApiKey", {
      data: {
        apiKey,
        email
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { success } = response.data;

      if (success || response.status === 200) {
        return true;
      }

      throw new Error("not valid response");
    });
