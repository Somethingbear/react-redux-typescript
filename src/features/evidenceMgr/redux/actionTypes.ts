import { 
    actionType as counterPlusOneActionType
 } from './counterPlusOne';
import { 
    actionType as counterMinusOneActionType
} from './counterMinusOne';

export type allActionType = counterPlusOneActionType & counterMinusOneActionType;
