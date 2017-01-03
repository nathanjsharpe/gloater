import uniq from 'lodash.uniq';

import {
  FETCH_GLOATS_SUCCESS
} from 'Actions/action-types';

const initialState = {
  ids: [],
  lastUpdated: null,
  links: {},
}

const createGloatFilterReducer = (filter, extraActions) => (state = initialState, action) => {
  if (action.payload && action.payload.filter === filter) {
    switch(action.type) {
      case FETCH_GLOATS_SUCCESS:
        return {
          ...state,
          ids: uniq([
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

  if (extraActions && extraActions.hasOwnProperty(action.type)) {
    return extraActions[action.type](state, action);
  }

  return state;
}

export default createGloatFilterReducer;
