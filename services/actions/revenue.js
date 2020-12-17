// ==== 💪 Action Types
export const actionTypes = {
  SET_ERROR: "@revenue/set-error",
  CLEAR_ERROR: "@revenue/clear-error",

  LOAD_REVENUE_BY_DOMAIN: '@revenue/load-revenue-by-domain',
  LOAD_REVENUE_BY_SINGLEDATE: '@revenue/load-revenue-by-singledate',

  SET_REVENUE: '@revenue/set-revenue',
  SET_REVENUE_LOADING: '@revenue/set-revenue-loading',

  LOAD_PAYMENTS: '@revenue/load-payments',
  SET_PAYMENTS: '@revenue/set-payments',
  SET_PAYMENTS_LOADING: '@revenue/set-payments-loading',
};

export const setError = error => ({
  type: actionTypes.SET_ERROR,
  payload: error
});

export const clearError = () => ({
  type: actionTypes.CLEAR_ERROR
});

export const loadRevenueByDomain = (host, from, to) => ({
  type: actionTypes.LOAD_REVENUE_BY_DOMAIN,
  payload: { host, from, to }
});

export const loadRevenueByDate = (from, to) => ({
  type: actionTypes.LOAD_REVENUE_BY_SINGLEDATE,
  payload: { from, to },
});

export const loadPaymentHistory = () => ({
  type: actionTypes.LOAD_PAYMENTS,
});
