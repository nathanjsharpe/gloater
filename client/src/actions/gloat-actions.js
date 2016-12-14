import api from 'Util/api';

import {
  FETCH_GLOATS,
  RECEIVE_GLOATS,
} from './action-types';

const receiveGloats = gloats => ({
  type: RECEIVE_GLOATS,
  payload: { gloats }
});

export const fetchGloats = () => dispatch => {
  dispatch({ type: FETCH_GLOATS });

  return api().gloats().get()
  .then(gloats => dispatch(receiveGloats(gloats)));
}
