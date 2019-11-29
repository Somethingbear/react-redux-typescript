import { IEviMgrModel, initialState } from './initialState';
import { reducer as counterPlusOneReducer } from './counterPlusOne';
import { reducer as counterMinusOneReducer } from './counterMinusOne';
import { allActionType } from './actionTypes';

// import { 
//     actionType as counterPlusOneActionType
//  } from './counterPlusOne';
// import { 
//     actionType as counterMinusOneActionType
// } from './counterMinusOne';


// import { types } from './constants';

const reducers = [
    counterPlusOneReducer,
    counterMinusOneReducer,
];

export default function reducer(state: IEviMgrModel = initialState, action: allActionType) {
    let newState;
    switch (action.type) {
        // Put global reducers here

        default:
            newState = state;
            break;
    }
    return reducers.reduce(
        (s, r) => r(s, action),
         newState
    );
}
