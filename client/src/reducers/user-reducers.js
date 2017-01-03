import { combineReducers } from 'redux';

import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from 'Actions/action-types';

const loading = (state = {}, action) => {
  switch(action.type) {
    case FETCH_USER_REQUEST:
      return true;
    case FETCH_USER_SUCCESS:
      return false;
    default:
      return state;
  }
}

const user = (state = null, action) => {
  switch(action.type) {
    case FETCH_USER_SUCCESS:
      return action.payload.user;
    default:
      return state;
  }
}

export default combineReducers({ loading, user })
