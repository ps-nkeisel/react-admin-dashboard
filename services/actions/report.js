// ==== 💪 Action Types
export const actionTypes = {
  SET_ERROR: "@report/error",

  LOAD_SCHEDULES: "@report/load-schedules",
  SET_SCHEDULES: "@report/set-schedules",
};

// ==== 🎬 Actions
export const loadSchedules = () => ({
  type: actionTypes.LOAD_SCHEDULES,
});
