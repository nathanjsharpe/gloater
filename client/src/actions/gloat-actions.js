import api from 'Util/api';
import getGloatQueryParamsForFilter from 'Util/getGloatQueryParamsForFilter';
import getPageLinks from 'Util/getPageLinks';

import {
  FETCH_GLOATS_REQUEST,
  FETCH_GLOATS_SUCCESS,
  CREATE_GLOAT_REQUEST,
  CREATE_GLOAT_SUCCESS,
} from './action-types';

const receiveGloats = (filter, gloats, links) => ({
  type: FETCH_GLOATS_SUCCESS,
  payload: { filter, gloats, links, timestamp: Date.now() }
});

const fetchGloats = (filter, url) => (dispatch, getState) => {
  dispatch({
    type: FETCH_GLOATS_REQUEST,
    payload: { filter },
  });

  return (url ?
    api(url).get() :
    api().gloats(getGloatQueryParamsForFilter(filter)).get()
  )
  .then(({ body, response }) => dispatch(receiveGloats(filter, body, getPageLinks(response))));
}

const fetchUserGloats = (user, filter = 'current' ) =>
  fetchGloats(filter, api().user(user.username).gloats().toString());

const createGloat = gloat => dispatch => {
  dispatch({
    type: CREATE_GLOAT_REQUEST,
    payload: { gloat },
  });

  return api().gloats().post({ gloat })
  .then(({ body, response }) => dispatch({
    type: CREATE_GLOAT_SUCCESS,
    payload: { gloat: body },
  }));
}

export {
  fetchGloats,
  fetchUserGloats,
  createGloat,
};
