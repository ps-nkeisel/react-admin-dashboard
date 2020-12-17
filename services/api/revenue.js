import axios from "axios";

export const getRevenuesByHostTimeSeries = (token, host, fromDate, toDate) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/revenues/getRevenuesByHostTimeSeries", {
      params: { host, fromDate, toDate },
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

export const getRevenuesByApiKeyTimeSeries = (token, apiKey, fromDate, toDate, isUserAdmin) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/revenues/getRevenuesByApiKeyTimeSeries", {
      params: { apiKey, fromDate, toDate, isUserAdmin },
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

export const getRevenueByDateByApiKey = (token, apiKey, from, to) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/revenues/getRevenueByDateByApiKey", {
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

      throw new Error(errors[0]);
    });

export const getPaymentHistoryByApiKey = (token, from, to, start, pageSize) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/PaymentHistory/getPaymentHistoryByApiKey", {
      params: { from, to, start, pageSize },
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
