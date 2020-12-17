import axios from "axios";

export const fetchSchedules = (token) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/ReportSchedulers/report", {
      params: {},
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

export const addSchedule = (token, host, email, schedule, time, groupid, timeZone, type, scheduleFor, timeParams, uri) =>
  axios
    .post(process.env.API_BASE_URL + "api/v1/ReportSchedulers/report", 
      { host, email, schedule, time, groupid, timeZone, type, scheduleFor, timeParams, uri },
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

      throw new Error(errors);
    });

export const updateSchedule = (token, host, email, type, schedule, time, timeZone, scheduleFor, cronId, timeParams, id, uri) =>
  axios
    .put(process.env.API_BASE_URL + "api/v1/ReportSchedulers/report", 
      { host, email, type, schedule, time, timeZone, scheduleFor, cronId, timeParams, id, uri },
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

export const deleteSchedule = (token, cronId, cronToken) =>
  axios
    .delete(process.env.API_BASE_URL + "api/v1/ReportSchedulers/report", {
      data: { cronId, cronToken },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const { success } = response.data;

      return success;
    });

export const getLogs = (token, cronId, cronToken) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/ReportSchedulers/logs", {
      params: { cronId, cronToken },
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

export const runManually = (token, cronId, cronToken) =>
  axios
    .get(process.env.API_BASE_URL + "api/v1/ReportSchedulers/run", {
      params: { cronId, cronToken },
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
