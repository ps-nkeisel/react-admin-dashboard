import { call, put, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import moment from "moment";
import { toaster } from "evergreen-ui";

import {
    getTopCommenters,
    getTopCommentersByApiKey,
    getTopByFilter,
    getTopByFilterByApiKey,
    getTopTags,
    getTopTagsByApiKey,

    getCommentState,
    getCommentStateByApiKey,
    getModeratorList,
    getCommentStateByModerator,
    getTopArticles,
    getTopArticlesByApiKey,
} from "@/services/api/analytics/comments";

import {
    getUsers,
} from "@/services/api/settings";

import { actionTypes } from "@/services/actions/analytics/comments";
import { initialState } from "@/services/reducers/analytics/comments";

export function* loadTopCommenters() {
    try {
        const { token, apiKey } = yield select(({ session }) => session);
        const { host, dateRange } = yield select(({ filter }) => filter);

        const result = yield call(
            host ? getTopCommenters : getTopCommentersByApiKey,
            token,
            host ? host : apiKey,
            moment(dateRange[0]).startOf('day').utc(true).unix(),
            moment(dateRange[1]).endOf('day').utc(true).unix(),
            20
        );

        yield put({
            type: actionTypes.SET_TOP_COMMENTERS,
            payload: result || initialState.top_commenters
        });
    } catch (e) {
        console.log("err", e);
        toaster.danger(
            `Error. Could not fetch list of commenters.`,
            { id: "analytics-top-commenters" }
        );
        yield put({
            type: actionTypes.SET_TOP_COMMENTERS,
            payload: initialState.top_commenters
        });
    }
}

export function* loadTopTags() {
    try {
        const { token, apiKey } = yield select(({ session }) => session);
        const { host, dateRange } = yield select(({ filter }) => filter);

        const result = yield call(
            host ? getTopTags : getTopTagsByApiKey,
            token,
            host ? host : apiKey,
            moment(dateRange[0]).startOf('day').utc(true).unix(),
            moment(dateRange[1]).startOf('day').utc(true).unix()
        );

        yield put({
            type: actionTypes.SET_TOP_TAGS,
            payload: result || initialState.top_tags
        });
    } catch (e) {
        console.log("err", e);
        toaster.danger(
            `Error. Could not fetch top tags.`,
            { id: "analytics-top-tags" }
        );
        yield put({
            type: actionTypes.SET_TOP_TAGS,
            payload: initialState.top_tags
        });
    }
}

// Comments
export function* loadCommentStats() {
    try {
        const { token, apiKey } = yield select(({ session }) => session);
        const { host, dateRange } = yield select(({ filter }) => filter);

        const result = yield call(
            host ? getCommentState : getCommentStateByApiKey,
            token,
            host ? host : apiKey,
            moment(dateRange[0]).startOf('day').utc(true).unix(),
            moment(dateRange[1]).endOf('day').utc(true).unix()
        );

        yield put({
            type: actionTypes.SET_COMMENT_STATS,
            payload: result || initialState.comment_stats
        });
    } catch (e) {
        console.log("err", e);
        toaster.danger(
            `Error. Could not fetch stats`,
            { id: "analytics-stats" }
        );
        yield put({
            type: actionTypes.SET_COMMENT_STATS,
            payload: initialState.comment_stats
        });
    }
}

export function* loadModerators() {
    try {
        const token = yield select(({ session }) => session.token);
        const host = yield select(({ filter }) => filter.host);

        yield put({
            type: actionTypes.SET_MODERATOR_COMMENT_STATS,
            payload: initialState.moderator_comment_stats
        });

        let result = initialState.moderators;
        if (host) {
            result = yield call(getModeratorList, token, host);
        } else {
            const data = yield call(getUsers, token);
            result = _.uniq(_.map(data, (item) => item.email));
        }

        yield put({
            type: actionTypes.SET_MODERATORS,
            payload: result
        });

        yield put({
            type: actionTypes.SET_MODERATOR,
            payload: result[0] ?? initialState.moderator
        });
    } catch (e) {
        console.log("err", e);
        toaster.danger(
            `Error. Load Moderators`,
            { id: "analytics-load-moderators" }
        );
        yield put({
            type: actionTypes.SET_MODERATORS,
            payload: initialState.moderators
        });
    }
}

export function* setModerator() {
    yield put({ type: actionTypes.LOAD_MODERATOR_COMMENT_STATS });
}

export function* loadModeratorCommentStats() {
    try {
        const token = yield select(({ session }) => session.token);
        const { host, dateRange } = yield select(({ filter }) => filter);
        const moderator = yield select(({ analytics }) => analytics.comments.moderator);

        const result = yield call(getCommentStateByModerator, token, moment(dateRange[0]).startOf('day').utc(true).unix(), moment(dateRange[1]).endOf('day').utc(true).unix(), host, moderator);

        yield put({
            type: actionTypes.SET_MODERATOR_COMMENT_STATS,
            payload: result || initialState.moderator_comment_stats
        });
    } catch (e) {
        console.log("err", e);
        toaster.danger(
            `Error loading moderator stats`,
            { id: "analytics-moderator-comment-stats" }
        );
        yield put({
            type: actionTypes.SET_MODERATOR_COMMENT_STATS,
            payload: initialState.moderator_comment_stats
        });
    }
}

export function* loadTopArticles() {
    try {
        const { token, apiKey } = yield select(({ session }) => session);
        const { host, dateRange } = yield select(({ filter }) => filter);

        const result = yield call(
            host ? getTopArticles : getTopArticlesByApiKey,
            token,
            host ? host : apiKey,
            moment(dateRange[0]).startOf('day').utc(true).unix(),
            moment(dateRange[1]).endOf('day').utc(true).unix()
        );

        yield put({
            type: actionTypes.SET_TOP_ARTICLES,
            payload: result || initialState.top_articles
        });
    } catch (e) {
        console.log("err", e);
        toaster.danger(
            `Error fetching top articles`,
            { id: "analytics-top-articles" }
        );
        yield put({
            type: actionTypes.SET_TOP_ARTICLES,
            payload: initialState.top_articles
        });
    }
}

export function* loadTopCountries(params) {
    try {
        const { token, apiKey } = yield select(({ session }) => session);
        const { host, dateRange } = yield select(({ filter }) => filter);
        const count = params.payload;

        const result = yield call(
            host ? getTopByFilter : getTopByFilterByApiKey,
            token,
            host ? host : apiKey,
            moment(dateRange[0]).startOf('day').utc(true).unix(),
            moment(dateRange[1]).endOf('day').utc(true).unix(),
            'Country',
            0,
            count,
            'Country'
        );

        yield put({
            type: actionTypes.SET_TOP_COUNTRIES,
            payload: result || initialState.top_countries
        });
    } catch (e) {
        console.log("err", e);
        toaster.danger(
            `Error fetching top countries`,
            { id: "analytics-top-countries" }
        );
        yield put({
            type: actionTypes.SET_TOP_COUNTRIES,
            payload: initialState.top_countries
        });
    }
}

export function* loadTopCities(params) {
    try {
        const { token, apiKey } = yield select(({ session }) => session);
        const { host, dateRange } = yield select(({ filter }) => filter);
        const count = params.payload;

        const result = yield call(
            host ? getTopByFilter : getTopByFilterByApiKey,
            token,
            host ? host : apiKey,
            moment(dateRange[0]).startOf('day').utc(true).unix(),
            moment(dateRange[1]).endOf('day').utc(true).unix(),
            'City',
            0,
            count,
            'City'
        );

        yield put({
            type: actionTypes.SET_TOP_CITIES,
            payload: result || initialState.top_cities
        });
    } catch (e) {
        console.log("err", e);
        toaster.danger(
            `Error fetching top cities`,
            { id: "analytics-top-cities" }
        );
        yield put({
            type: actionTypes.SET_TOP_CITIES,
            payload: initialState.top_cities
        });
    }
}

export function* loadTopOss(params) {
    try {
        const { token, apiKey } = yield select(({ session }) => session);
        const { host, dateRange } = yield select(({ filter }) => filter);
        const count = params.payload;

        const result = yield call(
            host ? getTopByFilter : getTopByFilterByApiKey,
            token,
            host ? host : apiKey,
            moment(dateRange[0]).startOf('day').utc(true).unix(),
            moment(dateRange[1]).endOf('day').utc(true).unix(),
            'Os',
            0,
            count,
            'Country'
        );

        yield put({
            type: actionTypes.SET_TOP_OSS,
            payload: result || initialState.top_oss
        });
    } catch (e) {
        console.log("err", e);
        toaster.danger(
            `Error fetching top OS`,
            { id: "analytics-top-os" }
        );
        yield put({
            type: actionTypes.SET_TOP_OSS,
            payload: initialState.top_oss
        });
    }
}

export function* loadTopBrowsers(params) {
    try {
        const { token, apiKey } = yield select(({ session }) => session);
        const { host, dateRange } = yield select(({ filter }) => filter);
        const count = params.payload;

        const result = yield call(
            host ? getTopByFilter : getTopByFilterByApiKey,
            token,
            host ? host : apiKey,
            moment(dateRange[0]).startOf('day').utc(true).unix(),
            moment(dateRange[1]).endOf('day').utc(true).unix(),
            'Browser',
            0,
            count,
            'Country'
        );

        yield put({
            type: actionTypes.SET_TOP_BROWSERS,
            payload: result || initialState.top_browsers
        });
    } catch (e) {
        console.log("err", e);
        toaster.danger(
            `Error fetching top browsers`,
            { id: "analytics-top-browsers" }
        );
        yield put({
            type: actionTypes.SET_TOP_BROWSERS,
            payload: initialState.top_browsers
        });
    }
}

export function* loadTopDevices(params) {
    try {
        const { token, apiKey } = yield select(({ session }) => session);
        const { host, dateRange } = yield select(({ filter }) => filter);
        const count = params.payload;

        const result = yield call(
            host ? getTopByFilter : getTopByFilterByApiKey, 
            token, 
            host ? host : apiKey, 
            moment(dateRange[0]).startOf('day').utc(true).unix(), 
            moment(dateRange[1]).endOf('day').utc(true).unix(), 
            'Device', 0, count, 'Country'
        );

        yield put({
            type: actionTypes.SET_TOP_DEVICES,
            payload: result || initialState.top_devices
        });
    } catch (e) {
        console.log("err", e);
        toaster.danger(
            `Error fetching top devices`,
            { id: "analytics-top-devices" }
        );
        yield put({
            type: actionTypes.SET_TOP_DEVICES,
            payload: initialState.top_devices
        });
    }
}

export default function* commentsSaga() {
    yield takeLatest(actionTypes.LOAD_TOP_TAGS, loadTopTags);

    yield takeLatest(actionTypes.LOAD_TOP_COMMENTERS, loadTopCommenters);

    yield takeLatest(actionTypes.LOAD_COMMENT_STATS, loadCommentStats);

    yield takeLatest(actionTypes.LOAD_MODERATORS, loadModerators);
    yield takeLatest(actionTypes.SET_MODERATOR, setModerator);
    yield takeLatest(actionTypes.LOAD_MODERATOR_COMMENT_STATS, loadModeratorCommentStats);

    yield takeLatest(actionTypes.LOAD_TOP_ARTICLES, loadTopArticles);

    yield takeLatest(actionTypes.LOAD_TOP_COUNTRIES, loadTopCountries);
    yield takeLatest(actionTypes.LOAD_TOP_CITIES, loadTopCities);

    yield takeLatest(actionTypes.LOAD_TOP_OSS, loadTopOss);
    yield takeLatest(actionTypes.LOAD_TOP_BROWSERS, loadTopBrowsers);
    yield takeLatest(actionTypes.LOAD_TOP_DEVICES, loadTopDevices);
}
