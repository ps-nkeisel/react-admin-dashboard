import axios from "axios";

export const getTopByFilter = (token, host, from, to, filter, fromCount, toCount, geo) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/RecommendRatingsBQ/getTopByFilter", {
      params: { host, from, to, filter, fromCount, toCount, geo },
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

export const getTopByFilterByApiKey = (token, apiKey, from, to, filter, fromCount, toCount, geo) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/RecommendRatingsBQ/getTopByFilterByApiKey", {
      params: { apiKey, from, to, filter, fromCount, toCount, geo },
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

export const getTopArticles = (token, from, to, host) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/RecommendRatingsBQ/getTopArticles", {
      params: { from, to, host },
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
