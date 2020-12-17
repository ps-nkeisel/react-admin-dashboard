// ==== 💪 Action Types
export const actionTypes = {
  LOAD_DAILY_SITE_STATS: "@analytics/load-daily-site-stats",
  SET_DAILY_SITE_STATS: "@analytics/set-daily-site-stats",

  LOAD_MONTH_STATS: "@analytics/load-month-stats",
  SET_MONTH_STATS: "@analytics/set-month-stats",
};

// ==== 🎬 Actions
export const loadDailySiteStats = () => ({
  type: actionTypes.LOAD_DAILY_SITE_STATS,
});

export const loadMonthStats = () => ({
  type: actionTypes.LOAD_MONTH_STATS,
});
