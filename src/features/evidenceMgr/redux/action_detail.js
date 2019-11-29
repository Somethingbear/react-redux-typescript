import * as types from './constants';
import {postQuery} from '../util/request';

export const rightToggle = (args = {openOrClose: 2}) => {
    return {
        type: types.DETAIL_TOGGLE_RIGHT,
        data: args
    }
};

export const setCurrentCollideSrc = (args = {collideSrc: 0}) => {
    return {
        type: types.SET_CURRENT_COLLIDE_SRC,
        data: args
    }
};

export const fetchDetailDirect = (args = {}) => (dispatch) => {
    dispatch({
        type: types.DETAIL_FETCH_DIRECT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
        const doRequest = postQuery('/eventCollide/directDetail',args);

        doRequest.then(
            (res) => {
                dispatch({
                    type: types.DETAIL_FETCH_DIRECT_SUCCESS,
                    data: {
                        response: res.data,
                    },
                });
                resolve(res);
            },
            (err) => {
                dispatch({
                    type: types.DETAIL_FETCH_DIRECT_FAILURE,
                    data: { error: err },
                });
                reject(err);
            },
        );
    });

    return promise;
};

export const fetchDetailIndirect = (args = {}) => (dispatch) => {
    dispatch({
        type: types.DETAIL_FETCH_INDIRECT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
        const doRequest = postQuery('/eventCollide/indirectDetail',args);

        doRequest.then(
            (res) => {
                dispatch({
                    type: types.DETAIL_FETCH_INDIRECT_SUCCESS,
                    data: {
                        response: res.data,
                    },
                });
                resolve(res);
            },
            (err) => {
                dispatch({
                    type: types.DETAIL_FETCH_INDIRECT_FAILURE,
                    data: { error: err },
                });
                reject(err);
            },
        );
    });

    return promise;
};

export const fetchDetailCaseInfo = (args = {}) => (dispatch) => {
    dispatch({
        type: types.DETAIL_FETCH_CASE_INFO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
        const doRequest = postQuery('/eventCollide/eventInfo',args.params);

        doRequest.then(
            (res) => {
                dispatch({
                    type: types.DETAIL_FETCH_CASE_INFO_SUCCESS,
                    data: {
                        response: res.data,
                        index: args.index
                    },
                });
                resolve(res);
            },
            (err) => {
                dispatch({
                    type: types.DETAIL_FETCH_CASE_INFO_FAILURE,
                    data: { error: err },
                });
                reject(err);
            },
        );
    });

    return promise;
};

export const setDetailTableColumns = (args = {}) => {
    return {
        type: types.SET_DETAIL_TABLE_COLUMNS,
        data: args
    }
};

export const setDetailPageInfo = (args = {}) => {
    return {
        type: types.SET_DETAIL_TABLE_PAGE_INFO,
        data: args
    }
};

export const setDetailSearchText = (args = {}) => {
    return {
        type: types.SET_DETAIL_SEARCH_TEXT,
        data: args
    }
};

export const setDetailSearchResult = (args = {}) => {
    return {
        type: types.SET_DETAIL_SEARCH_RESULT,
        data: args
    }
};

export function reducer(state, action) {
    switch (action.type) {
        case types.DETAIL_TOGGLE_RIGHT:
            return {
                ...state,
                isRightOpen: action.data.openOrClose === 2 ?
                    !state.isRightOpen
                    :
                    action.data.openOrClose === 1 ? true : false
            };

        case types.SET_CURRENT_COLLIDE_SRC:
            return {
                ...state,
                currentCollideSrc: action.data.collideSrc
            };

        case types.DETAIL_FETCH_DIRECT_BEGIN:
            return {
                ...state,
                fetchDetailDirectPending: true,
                fetchDetailDirectError: null,
            };
        case types.DETAIL_FETCH_DIRECT_SUCCESS:
            return {
                ...state,
                fetchDetailDirectPending: false,
                fetchDetailDirectError: null,
                currentDetailData: action.data.response.data,
            };
        case types.DETAIL_FETCH_DIRECT_FAILURE:
            return {
                ...state,
                fetchDetailDirectPending: false,
                fetchDetailDirectError: action.data.error,
            };
        case types.DETAIL_FETCH_DIRECT_DISMISS_ERROR:
            return {
                ...state,
                fetchDetailDirectError: null,
            };


        case types.DETAIL_FETCH_INDIRECT_BEGIN:
            return {
                ...state,
                fetchDetailIndirectPending: true,
                fetchDetailIndirectError: null,
            };
        case types.DETAIL_FETCH_INDIRECT_SUCCESS:
            return {
                ...state,
                fetchDetailIndirectPending: false,
                fetchDetailIndirectError: null,
                currentDetailData: action.data.response.data,
            };
        case types.DETAIL_FETCH_INDIRECT_FAILURE:
            return {
                ...state,
                fetchDetailIndirectPending: false,
                fetchDetailIndirectError: action.data.error,
            };
        case types.DETAIL_FETCH_INDIRECT_DISMISS_ERROR:
            return {
                ...state,
                fetchDetailIndirectError: null,
            };


        case types.DETAIL_FETCH_CASE_INFO_BEGIN:
            return {
                ...state,
                fetchDetailCaseInfoPending: true,
                fetchDetailCaseInfoError: null,
            };
        case types.DETAIL_FETCH_CASE_INFO_SUCCESS:
            return {
                ...state,
                fetchDetailCaseInfoPending: false,
                fetchDetailCaseInfoError: null,
                [`currentCaseInfo${action.data.index}`]: action.data.response,
            };
        case types.DETAIL_FETCH_CASE_INFO_FAILURE:
            return {
                ...state,
                fetchDetailCaseInfoPending: false,
                fetchDetailCaseInfoError: action.data.error,
            };
        case types.DETAIL_FETCH_CASE_INFO_DISMISS_ERROR:
            return {
                ...state,
                fetchDetailCaseInfoError: null,
            };


        case types.SET_DETAIL_TABLE_COLUMNS:
            return {
                ...state,
                currentDetailTableColumns: action.data.columns,
            };

        case types.SET_DETAIL_TABLE_PAGE_INFO:
            return {
                ...state,
                currentDetailPageTotal: action.data.total,
                currentDetailPageCurrent: action.data.current,
            };

        case types.SET_DETAIL_SEARCH_TEXT:
            return {
                ...state,
                detailSearchText: action.data.text
            };

        case types.SET_DETAIL_SEARCH_RESULT:
            return {
                ...state,
                detailSearchResultCount: action.data.count,
                detailSearchResultCurrentIndex: action.data.index,
                detailSearchResultHighlightIndex: action.data.highlight ? action.data.highlight : 0,
            };

        default:
            return state;
    }
}