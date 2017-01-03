import uniq from 'lodash.uniq';

import {
  FETCH_GLOATS_SUCCESS
} from 'Actions/action-types';

const initialState = {
  ids: [],
  lastUpdated: null,
  links: {},
}

const createGloatFilterReducer = (filter, options) => (state = initialState, action) => {
  if (action.payload && action.payload.filter === filter) {
    switch(action.type) {
      case FETCH_GLOATS_SUCCESS:
        return {
          ...state,
          ids: options && options.replaceIds ?
            action.payload.gloats.map(g => g.id) :
            uniq([
              ...state.ids,
              ...action.payload.gloats.map(g => g.id),
            ]),
          links: action.payload.links,
          lastUpdated: action.payload.timestamp,
        };
      default:
        return state;
    }
  }

  if (options && options.hasOwnProperty(action.type)) {
    return options[action.type](state, action);
  }

  return state;
}

export default createGloatFilterReducer;
