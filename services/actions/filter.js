// ==== 💪 Action Types
export const actionTypes = {
  SET_DATERANGE: "@filter/set-daterange",
  SET_HOST: "@filter/set-host",
  SET_HOST_DATERANGE: "@filter/set-host-daterange",
  SET_FILTER: "@filter/set-filter",
}

// ==== 🎬 Actions
export const updateDateRange = (dateRange) => ({
  type: actionTypes.SET_DATERANGE,
  payload: dateRange,
})

export const updateHost = (host) => ({
  type: actionTypes.SET_HOST,
  payload: host,
})

export const updateHostAndDateRange = (host, dateRange) => ({
  type: actionTypes.SET_HOST_DATERANGE,
  payload: {
    host,
    dateRange
  }
})

export const updateFilter = (filter) => ({
  type: actionTypes.SET_FILTER,
  payload: filter
})
