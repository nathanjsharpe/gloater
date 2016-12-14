import { combineReducers } from 'redux';

import {
  RECEIVE_GLOATS,
  FETCH_GLOATS,
} from 'Actions/action-types';

const byId = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_GLOATS:
      return {
        ...state,
        ...action.payload.gloats.reduce(
          (newGloats, gloat) => ({ ...newGloats, [gloat.id]: gloat }),
          {}
        ),
      };
    default:
      return state;
  }
}

const loading = (state = false, action) => {
  switch(action.type) {
    case FETCH_GLOATS:
      return true;
    case RECEIVE_GLOATS:
      return false;
    default:
      return state;
  }
}

export default combineReducers({ byId, loading });
