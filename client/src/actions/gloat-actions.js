import api from 'Util/api';
import getGloatQueryParamsForFilter from 'Util/getGloatQueryParamsForFilter';
import getPageLinks from 'Util/getPageLinks';

import {
  FETCH_GLOATS_REQUEST,
  FETCH_GLOATS_SUCCESS,
} from './action-types';

const receiveGloats = (filter, gloats, links) => ({
  type: FETCH_GLOATS_SUCCESS,
  payload: { filter, gloats, links, timestamp: Date.now() }
});

export const fetchGloats = filter => (dispatch, getState) => {
  dispatch({
    type: FETCH_GLOATS_REQUEST,
    payload: { filter },
  });

  return api().gloats(getGloatQueryParamsForFilter(filter)).get()
  .then(({ body, response }) => dispatch(receiveGloats(filter, body, getPageLinks(response))));
}
