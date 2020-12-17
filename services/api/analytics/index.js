import axios from "axios";

export const getSiteStats = (token, host, from, to) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/DailyStats/getSiteStats", {
      params: { host, from, to },
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

export const getSiteStatsByApiKey = (token, apiKey, from, to) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/DailyStats/getSiteStatsByApiKey", {
      params: { apiKey, from, to },
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

export const getStatsByHostTimeSeries = (token, host) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/DailyStats/getStatsByHostTimeSeries", {
      params: { host },
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

export const getStatsByApiKeyTimeSeries = (token, apiKey) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/DailyStats/getStatsByApiKeyTimeSeries", {
      params: { apiKey },
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
