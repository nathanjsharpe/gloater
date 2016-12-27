import {
  FETCH_GLOATS_SUCCESS
} from 'Actions/action-types';

const initialState = {
  pages: [],
  lastUpdated: null,
  links: {},
}

const createGloatFilterReducer = filter => (state = initialState, action) => {
  if (action.payload && action.payload.filter === filter) {
    switch(action.type) {
      case FETCH_GLOATS_SUCCESS:
        return {
          ...state,
          pages: [
            ...state.pages,
            action.payload.gloats.map(g => g.id),
          ],
          links: action.payload.links,
          lastUpdated: action.payload.timestamp,
        };
      default:
        return state;
    }
  }

  return state;
}

export default createGloatFilterReducer;
