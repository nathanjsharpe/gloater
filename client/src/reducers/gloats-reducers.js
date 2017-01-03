import { combineReducers } from 'redux';
import uniq from 'lodash.uniq';
import createGloatFilterReducer from './createGloatFilterReducer';

import {
  FETCH_GLOATS_SUCCESS,
  FETCH_GLOATS_REQUEST,
  CREATE_GLOAT_SUCCESS,
  CREATE_ADMIRE_SUCCESS,
  DELETE_ADMIRE_SUCCESS,
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
    case CREATE_GLOAT_SUCCESS:
    case CREATE_ADMIRE_SUCCESS:
    case DELETE_ADMIRE_SUCCESS:
      return {
        ...state,
        [action.payload.gloat.id]: action.payload.gloat,
      };
    default:
      return state;
  }
}

const byFilter = combineReducers({
  current: createGloatFilterReducer('current'),
  popular: createGloatFilterReducer('popular'),
  recent: createGloatFilterReducer('recent'),
  stalked: createGloatFilterReducer('stalked'),
  admired: createGloatFilterReducer('admired', {
    [DELETE_ADMIRE_SUCCESS]: (state, action) => ({
      ...state,
      ids: state.ids.filter(id => id !== action.payload.gloat.id),
    }),
  }),
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
