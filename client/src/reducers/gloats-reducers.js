import { combineReducers } from 'redux';
import createGloatFilterReducer from './createGloatFilterReducer';

import {
  FETCH_GLOATS_SUCCESS,
  FETCH_GLOATS_REQUEST,
} from 'Actions/action-types';

const byId = (state = {}, action) => {
  switch(action.type) {
    case FETCH_GLOATS_SUCCESS:
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

const byFilter = combineReducers({
  popular: createGloatFilterReducer('popular'),
  recent: createGloatFilterReducer('recent'),
});

const loading = (state = false, action) => {
  switch(action.type) {
    case FETCH_GLOATS_REQUEST:
      return true;
    case FETCH_GLOATS_SUCCESS:
      return false;
    default:
      return state;
  }
}

export default combineReducers({ byId, byFilter, loading });
