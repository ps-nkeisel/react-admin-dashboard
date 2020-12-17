import axios from "axios";

export const getTopByFilter = (
  token,
  host,
  from,
  to,
  filter,
  fromCount,
  toCount,
  geo
) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/EmoteRatingsBQ/getTopByFilter", {
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

export const getTopByFilterByApiKey = (
  token,
  apiKey,
  from,
  to,
  filter,
  fromCount,
  toCount,
  geo
) =>
  axios
    .get(
      process.env.API_BASE_URL + "api/v1/EmoteRatingsBQ/getTopByFilterByApiKey",
      {
        params: { apiKey, from, to, filter, fromCount, toCount, geo },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      const { data, success } = response.data;

      if (success) {
        return data;
      }

      throw new Error("not valid details");
    });

export const getTopArticles = (token, host, from, to, emote) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/EmoteRatingsBQ/getTopArticles", {
      params: { host, from, to, emote },
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

export const getTopArticlesByApiKey = (token, apiKey, from, to, emote) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/EmoteRatingsBQ/getTopArticlesByApiKey", {
      params: { apiKey, from, to, emote },
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

export const getEmoteState = (token, from, to, host) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/EmoteRatingsBQ/getEmoteState", {
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

export const getEmoteStateByApiKey = (token, from, to, apiKey) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/EmoteRatingsBQ/getEmoteStateByApiKey", {
      params: { from, to, apiKey },
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
