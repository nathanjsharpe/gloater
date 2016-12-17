import api from 'Util/api';

import {
  FETCH_GLOATS_REQUEST,
  FETCH_GLOATS_SUCCESS,
} from './action-types';

const receiveGloats = gloats => ({
  type: FETCH_GLOATS_SUCCESS,
  payload: { gloats }
});

export const fetchGloats = () => dispatch => {
  dispatch({ type: FETCH_GLOATS_REQUEST });

  return api().gloats().get()
  .then(gloats => dispatch(receiveGloats(gloats)));
}
