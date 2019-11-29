import { combineReducers } from 'redux';

import eviMgrReducer from '../features/evidenceMgr/redux/reducer';

const reducerMap = {
    eviMgr: eviMgrReducer,
}

const rootReducer = combineReducers(reducerMap);
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>