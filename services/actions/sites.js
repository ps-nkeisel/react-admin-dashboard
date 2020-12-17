// ==== 💪 Action Types
export const actionTypes = {
    SET_LOADING: "@sites/loading",
    LOAD_SITE_STATS: "@sites/load-site-stats",
    SET_SITE_STATS: "@sites/set-site-stats",
    SET_TOTAL_STATS: "@sites/set-total-stats",
    ADD_NEW_SITE: "@sites/add-new-site"
};

// ==== 🎬 Actions
export const setLoading = (loading = true) => ({
    type: actionTypes.SET_LOADING,
    payload: loading,
});

export const loadSiteStats = () => ({
    type: actionTypes.LOAD_SITE_STATS,
});

export const addNewSite = site => ({
    type: actionTypes.ADD_NEW_SITE,
    payload: site,
});
