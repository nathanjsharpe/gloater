import { combineReducers } from 'redux';
import auth from './auth-reducers';
import dialog from './dialog-reducers';
import gloats from './gloats-reducers';
import users from './users-reducers';
import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
  auth,
  dialog,
  gloats,
  users,
  form,
});

export default rootReducer;
