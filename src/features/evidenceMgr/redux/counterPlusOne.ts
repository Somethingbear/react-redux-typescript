import { constants } from './constants';
import { IEviMgrModel } from './initialState';

/**
 * actions' types
 */

export interface CounterPlusOneAction {
    type: constants.EVIMGR_COUNTER_PLUS_ONE,
}

export interface CounterPlusNumberAction {
    type: constants.EVIMGR_COUNTER_PLUS_NUMBER
    payload: number
}

export type actionType = CounterPlusOneAction | CounterPlusNumberAction;

/**
 * actions here
 */

export function counterPlusOne(): actionType {
    return {
        type: constants.EVIMGR_COUNTER_PLUS_ONE,
    }
}

export const counterPlusNumber = (args: number = 2): actionType => {
    return {
        type: constants.EVIMGR_COUNTER_PLUS_NUMBER,
        payload: args,
    }
};

/**
 * reducer here
 * @param state 
 * @param action 
 */

export function reducer(state: IEviMgrModel, action: actionType ) {
    switch (action.type) {
        case constants.EVIMGR_COUNTER_PLUS_ONE:
            return {
                ...state,
                count: state.count + 1,
            }

        case constants.EVIMGR_COUNTER_PLUS_NUMBER:
            return {
                ...state,
                count: state.count + action.payload,
            }

        default: 
            return state;
    }
}