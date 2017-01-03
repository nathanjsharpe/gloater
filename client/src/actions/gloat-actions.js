import api from 'Util/api';
import getGloatQueryParamsForFilter from 'Util/getGloatQueryParamsForFilter';
import getPageLinks from 'Util/getPageLinks';

import {
  FETCH_GLOATS_REQUEST,
  FETCH_GLOATS_SUCCESS,
  CREATE_GLOAT_REQUEST,
  CREATE_GLOAT_SUCCESS,
  CLICK_NEW_GLOAT,
  CLOSE_NEW_GLOAT,
} from './action-types';

const clickNewGloat = () => ({
  type: CLICK_NEW_GLOAT,
});

const closeNewGloat = () => ({
  type: CLOSE_NEW_GLOAT,
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
  .then(({ body, response }) => dispatch({
    type: FETCH_GLOATS_SUCCESS,
    payload: {
      gloats: body,
      links: getPageLinks(response),
      timestamp: Date.now(),
      filter,
    },
  }));
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
  clickNewGloat,
  closeNewGloat,
  fetchGloats,
  fetchUserGloats,
  createGloat,
};
