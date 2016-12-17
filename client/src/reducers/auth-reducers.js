import { combineReducers } from 'redux';

import {
  CREATE_API_TOKEN_REQUEST,
  CREATE_API_TOKEN_SUCCESS,
} from 'Actions/action-types';

const token = (state = null, action) => {
  switch(action.type) {
    case CREATE_API_TOKEN_SUCCESS:
      return action.payload.token;
    default:
      return state;
  }
}

const expiresAt = (state = null, action) => {
  switch(action.type) {
    case CREATE_API_TOKEN_SUCCESS:
      return action.payload.expires_at;
    default:
      return state;
  }
}

const currentUser = (state = null, action) => {
  switch(action.type) {
    case CREATE_API_TOKEN_SUCCESS:
      return action.payload.user;
    default:
      return state;
  }
}

const isFetching = (state = false, action) => {
  switch(action.type) {
    case CREATE_API_TOKEN_REQUEST:
      return true;
    case CREATE_API_TOKEN_SUCCESS:
      return false;
    default:
      return state;
  }
}

export default combineReducers({ token, expiresAt, currentUser, isFetching });
