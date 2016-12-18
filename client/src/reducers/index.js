import { combineReducers } from 'redux';
import gloats from './gloats-reducers';
import auth from './auth-reducers';
import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
  auth,
  gloats,
  form,
});

export default rootReducer;
