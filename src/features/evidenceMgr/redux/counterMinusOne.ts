import { constants } from './constants';
import { IEviMgrModel } from './initialState';

import { postQuery } from '../../common/util/request';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../common/rootReducer'


import axios from 'axios';
/**
 * actions' types
 */

export interface CounterMinusOneAction {
    type: constants.EVIMGR_COUNTER_MINUS_ONE,
}

export interface LoginAction {
    type: constants.EVIMGR_LOGIN | constants.EVIMGR_LOGIN_B | constants.EVIMGR_LOGIN_F,
    data?: Object,
}

export type actionType = CounterMinusOneAction | LoginAction;

/**
 * actions here
 */

export function counterMinusOne(): actionType {
    return {
        type: constants.EVIMGR_COUNTER_MINUS_ONE,
    }
}

export const login = (
    args: {
        username: string,
        password: string,
    } = { username: 'admin', password: '111111' }
): ThunkAction<void, RootState, null, Action<string>> => (dispatch: Dispatch) => {
    dispatch<LoginAction>({
        type: constants.EVIMGR_LOGIN_B,
    });
    const promise = new Promise((resolve, reject) => {
        const doRequest = postQuery('/login',args);

        doRequest.then(
            (res) => {
                dispatch<LoginAction>({
                    type: constants.EVIMGR_LOGIN,
                    data: {
                        response: res.data,
                        args: args,
                    },
                });
                resolve(res);
            },
            (err) => {
                dispatch({
                    type: constants.EVIMGR_LOGIN_F,
                    data: { error: err },
                });
                reject(err);
            },
        );
    });

    return promise;
};


export const fetchTodos = () => {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    
    return async (dispatch: Dispatch) => {
        dispatch<LoginAction>({
            type: constants.EVIMGR_LOGIN_B,
        });

        const response = await axios.get(url)
        .then(res => {
            dispatch<LoginAction>({
                type: constants.EVIMGR_LOGIN,
                data: res.data,
            })
        });
    
        // dispatch<LoginAction>({
        //     type: constants.EVIMGR_LOGIN_B,
        // });
        
    };
};



/**
 * reducer here
 * @param state 
 * @param action 
 */

export function reducer(state: IEviMgrModel, action: actionType ) {
    switch (action.type) {
        case constants.EVIMGR_COUNTER_MINUS_ONE:
            return {
                ...state,
                count: state.count - 1,
            }

        case constants.EVIMGR_LOGIN:
            return {
                ...state,
                response: action.data,
            }

        default: 
            return state;
    }
}