import axios from "axios";

export const getSiteStatsByToken = (token, from, to) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/Publishers/getSiteStatsByToken", {
      params: { from, to },
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

export const addNewHost = (token, host) =>
  axios
    .post(process.env.API_BASE_URL + "api/v1/Publishers/addNewHost",
      { host },
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

      throw new Error("something went wrong");
    });
