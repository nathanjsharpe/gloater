import { combineReducers } from 'redux';
import getExampleGloat from 'Util/getExampleGloat';

import {
  CLICK_NEW_GLOAT,
  CREATE_GLOAT_SUCCESS,
  CLOSE_NEW_GLOAT,
} from 'Actions/action-types';

const newGloatOpen = (state = false, action) => {
  switch(action.type) {
    case CLICK_NEW_GLOAT:
      return true;
    case CREATE_GLOAT_SUCCESS:
    case CLOSE_NEW_GLOAT:
      return false;
    default:
      return state;
  }
}

const exampleGloat = (state = null, action) => {
  switch(action.type) {
    case CLICK_NEW_GLOAT:
      return getExampleGloat();
    default:
      return state;
  }
}

export default combineReducers({ newGloatOpen, exampleGloat });
