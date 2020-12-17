import axios from "axios";

export const getPublisherKeys = token =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/Publishers/keys", {
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

export const getUserProfile = token =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/users/userProfile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { data, success } = response.data;

      if (success) {
        return data;
      }

      throw new Error("not valid details");
    });

export const getPermissionsByEmail = token =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/admin_users/getPermissionsByEmail", {
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

export const getSiteListByEmail = token =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/Publishers/getSiteListByEmail", {
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
