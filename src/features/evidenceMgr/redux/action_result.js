// import axios from 'axios';
import * as types from './constants';
import { postQuery } from '../util/request';

export const fetchResultCount = (args = {}) => (dispatch) => {
    dispatch({
        type: types.RESULT_FETCH_COUNT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
        const doRequest = postQuery('/eventCollide/eventCollideCount',args);

        doRequest.then(
            (res) => {
                dispatch({
                    type: types.RESULT_FETCH_COUNT_SUCCESS,
                    data: {
                        response: res.data,
                    },
                });
                resolve(res);
            },
            (err) => {
                dispatch({
                    type: types.RESULT_FETCH_COUNT_FAILURE,
                    data: { error: err },
                });
                reject(err);
            },
        );
    });

    return promise;
};

export const fetchResultStatistics = (args = {pageSize: 10, src: '', orderBy: 'collideSrc', seq: 'asc'}) => (dispatch) => {
    dispatch({
        type: types.RESULT_FETCH_STATISTICS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
        const doRequest = postQuery('/eventCollide/getEventCollide',args);

        doRequest.then(
            (res) => {
                dispatch({
                    type: types.RESULT_FETCH_STATISTICS_SUCCESS,
                    data: {
                        response: res.data,
                        src: args.src,
                    },
                });
                resolve(res);
            },
            (err) => {
                dispatch({
                    type: types.RESULT_FETCH_STATISTICS_FAILURE,
                    data: { error: err },
                });
                reject(err);
            },
        );
    });

    return promise;
};

export const setCurrentEventId = (args = {}) => {
    return {
        type: types.SET_CURRENT_EVENT_ID,
        data: args
    }
};

export const changeSrc = (args = {}) => {
    return {
        type: types.CHANGE_SRC,
        data: args
    }
};

export const setResultTablePageInfo = (args = {}) => {
    return {
        type: types.SET_RESULT_TABLE_PAGE_INFO,
        data: args
    }
};

export const setResultTableSearchText = (args = {}) => {
    return {
        type: types.SET_RESULT_SEARCH_TEXT,
        data: args
    }
};

export const setCheckedRowData = (args = {}) => {
    return {
        type: types.SET_CHECKED_ROW_DATA,
        data: args
    }
};

export function reducer(state, action) {
    switch (action.type) {
        case types.RESULT_FETCH_STATISTICS_BEGIN:
            return {
                ...state,
                fetchResultStatisticsPending: true,
                fetchResultStatisticsError: null,
            };

        case types.RESULT_FETCH_STATISTICS_SUCCESS: {
            let tableData = action.data.response.data;
            tableData.forEach((item, index) => {
                item.index = index + 1;
            });

            return {
                ...state,
                fetchResultStatisticsPending: false,
                fetchResultStatisticsError: null,
                resultTableData: tableData,
            };
        }

        case types.RESULT_FETCH_STATISTICS_FAILURE:
            return {
                ...state,
                fetchResultStatisticsPending: false,
                fetchResultStatisticsError: action.data.error,
            };

        case types.RESULT_FETCH_STATISTICS_DISMISS_ERROR:
            return {
                ...state,
                fetchResultStatisticsError: null,
            };


        case types.RESULT_FETCH_COUNT_BEGIN:
            return {
                ...state,
                fetchResultCountPending: true,
                fetchResultCountError: null,
            };

        case types.RESULT_FETCH_COUNT_SUCCESS: {
            let data = action.data.response;
            return {
                ...state,
                resultStatisticsData: [
                    {
                        title: '身份相同涉案人',
                        number: data['身份匹配'] ? data['身份匹配'] : 0,
                        src: 1
                    },{
                        title: '直接关系涉案人',
                        number: data['直接关联'] ? data['直接关联'] : 0,
                        src: 2
                    },{
                        title: '间接关系涉案人',
                        number: data['间接关联'] ? data['间接关联'] : 0,
                        src: 3
                    },
                ]
            }
        }

        case types.RESULT_FETCH_COUNT_FAILURE:
            return {
                ...state,
                fetchResultCountPending: false,
                fetchResultCountError: action.data.error,
            };

        case types.RESULT_FETCH_COUNT_DISMISS_ERROR:
            return {
                ...state,
                fetchResultCountError: null,
            };



        case types.CHANGE_SRC:
            return {
                ...state,
                currentSrc: action.data.src,
            };

        case types.SET_RESULT_TABLE_PAGE_INFO:
            return {
                ...state,
                resultTablePageTotal: action.data.total,
                resultTablePageCurrent: action.data.current,
            };

        case types.SET_RESULT_SEARCH_TEXT:
            return {
                ...state,
                resultTableSearchText: action.data.text
            };

        case types.SET_CHECKED_ROW_DATA:
            return {
                ...state,
                checkedRowData: action.data,
            };

        default:
            return state;
    }
}