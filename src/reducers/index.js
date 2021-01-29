import { combineReducers } from 'redux';
import puttsReducer from './putts';
import sessionReducer from './session';
 
const rootReducer = combineReducers({
  puttsState: puttsReducer,
  sessionState: sessionReducer,
});
 
export default rootReducer;