import axios from "axios";

export const getArticleEngagementData = (token, host, articleIds) =>
  axios
    .get(
      process.env.API_BASE_URL +
        "api/v1/Articles/getEngagementStatsByArticleIds",
      {
        params: { host, articleIds },
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

      // throw new Error(response.data.errors[0]);
    });

export const getRealtimeStatus = (token, host) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/Publishers/getRealtimeStatus", {
      params: { host },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      return response.data.isRealtimeEnabled || false;
    });
