import axios from "axios";

export const getCommentCountModeration = (token, from, to, host) =>
  axios
    .get(
      process.env.API_BASE_URL + "api/v1/Comments/getCommentCountModeration",
      {
        params: { from, to, host },
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

export const getTagsByHostModeration = (token, from, to, host) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/Articles/getTagsByHostModeration", {
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

export const getByFilterByPeriodPaged = (
  token,
  from,
  to,
  host,
  pageSize,
  state,
  tag,
  search_type,
  search_param,
  start
) => {
  let params = { from, to, host, pageSize, state, tag, start };

  if (!["", "SpamValue"].includes(search_type)) {
    params[search_type] = search_param;
  }

  return axios
    .get(
      process.env.API_BASE_URL + "api/v1/Comments/getByFilterByPeriodPaged",
      {
        params,
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
};

export const setCommentStatus = (token, commentIDs, state) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Comments/setCommentStatus",
      { commentIDs, state },
      {
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

export const setOffensive = (token, host, offValues, offensiveType) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Publishers/offensive",
      { host, offValues, offensiveType },
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

export const setOffensiveByApiKey = (token, apiKey, offValues, offensiveType) =>
  axios
    .post(process.env.API_BASE_URL + "api/v1/Publishers/offensiveByApiKey", 
      { apiKey, offValues, offensiveType },
      {
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

export const setTopComment = (token, commentID, topComment) =>
  axios
    .post(process.env.API_BASE_URL + "api/v1/Comments/setTopComment", null, {
      params: { commentID, topComment },
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

export const setCommentEditedStatus = (token, commentIDs, newText, state) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Comments/setCommentEditedStatus",
      { commentIDs, newText, state },
      {
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

export const setArticleStatus = (token, host, articleId, disabled) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Articles/setArticleStatus",
      { host, articleId, disabled },
      {
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

export const setArticleMeta = (
  token,
  host,
  articleId,
  title,
  uri,
  avatar,
  tags
) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Articles/setArticleMeta",
      { host, articleId, title, uri, avatar, tags },
      {
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

export const postComment = (token, comment, r, s) =>
  axios
    .post(
      process.env.API_BASE_URL + "api/v1/Comments/post",
      { comment, r, s },
      {
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

export const loadCommentThread = (token, parentId) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/Comments/loadCommentThread", {
      params: { parentId },
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

export const getArticleStatus = (token, host, articleId) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/Articles/getArticleStatus", {
      params: { host, articleId },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { data, success } = response.data;

      if (success) {
        return data;
      }

      if (errors) {
        throw new Error(errors[0]);
      }

      throw new Error("not valid details");
    });
