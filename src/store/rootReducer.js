import { combineReducers } from 'redux';
//imports multiple reducer here
import dictionaryReducer from './dictionary/dictionaryReducer';


const rootReducer = combineReducers({
    //and use it here
   dictionary: dictionaryReducer
});

export default rootReducer;
