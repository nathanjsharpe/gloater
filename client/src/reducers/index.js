import { combineReducers } from 'redux';
import gloats from './gloats-reducers';
import auth from './auth-reducers';
import users from './users-reducers';
import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
  auth,
  gloats,
  users,
  form,
});

export default rootReducer;
