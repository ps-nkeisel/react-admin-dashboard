import axios from "axios";

export const getTopCommenters = (token, host, from, to, count) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/CommentsBQ/getTopCommenters", {
      params: { host, from, to, count },
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

export const getTopCommentersByApiKey = (token, apiKey, from, to, count) =>
  axios
    .get(
      process.env.API_BASE_URL + "api/v1/CommentsBQ/getTopCommentersByApiKey",
      {
        params: { apiKey, from, to, count },
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
    .get(process.env.API_BASE_URL + "api/v1/CommentsBQ/getTopByFilter", {
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
      process.env.API_BASE_URL + "api/v1/CommentsBQ/getTopByFilterByApiKey",
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

export const getTopTags = (token, host, from, to) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/CommentsBQ/getTopTags", {
      params: { host, from, to },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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

export const getTopTagsByApiKey = (token, apiKey, from, to) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/CommentsBQ/getTopTagsByApiKey", {
      params: { apiKey, from, to },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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

export const getCommentState = (token, host, from, to) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/CommentsBQ/getCommentState", {
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

export const getCommentStateByApiKey = (token, apiKey, from, to) =>
  axios
    .get(
      process.env.API_BASE_URL + "api/v1/CommentsBQ/getCommentStateByApiKey",
      {
        params: { apiKey, from, to },
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

export const getModeratorList = (token, host) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/CommentsBQ/getModeratorList", {
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

export const getCommentStateByModerator = (token, from, to, host, moderator) =>
  axios
    .get(
      process.env.API_BASE_URL + "api/v1/CommentsBQ/getCommentStateByModerator",
      {
        params: { from, to, host, moderator },
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

export const getTopArticles = (token, host, from, to) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/CommentsBQ/getTopArticles", {
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

export const getTopArticlesByApiKey = (token, apiKey, from, to) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/CommentsBQ/getTopArticlesByApiKey", {
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
