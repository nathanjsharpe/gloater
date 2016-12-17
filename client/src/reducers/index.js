import { combineReducers } from 'redux';
import gloats from './gloats-reducers';
import auth from './auth-reducers';

const rootReducer = combineReducers({
  gloats,
  auth,
});

export default rootReducer;
