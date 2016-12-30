import { combineReducers } from 'redux';
// import createGloatFilterReducer from './createGloatFilterReducer';

import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_REQUEST,
} from 'Actions/action-types';

const byId = (state = {}, action) => {
  switch(action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        ...action.payload.users.reduce(
          (newUsers, user) => ({ ...newUsers, [user.id]: user }),
          {}
        ),
      };
    default:
      return state;
  }
}

// const byFilter = combineReducers({
//   popular: createGloatFilterReducer('popular'),
//   recent: createGloatFilterReducer('recent'),
//   stalked: createGloatFilterReducer('stalked'),
//   admired: createGloatFilterReducer('admired'),
// });

const loading = (state = false, action) => {
  switch(action.type) {
    case FETCH_USERS_REQUEST:
      return true;
    case FETCH_USERS_SUCCESS:
      return false;
    default:
      return state;
  }
}

export default combineReducers({ byId, loading });
