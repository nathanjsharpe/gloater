import api from 'Util/api';

import {
  CLICK_ADMIRE,
  CREATE_ADMIRE_REQUEST,
  CREATE_ADMIRE_SUCCESS,
  DELETE_ADMIRE_REQUEST,
  DELETE_ADMIRE_SUCCESS,
} from './action-types';

const clickAdmire = gloat => ({
  type: CLICK_ADMIRE,
  payload: { gloat },
});

const createAdmire = gloat => dispatch => {
  dispatch({
    type: CREATE_ADMIRE_REQUEST,
    payload: { gloat },
  });

  return api().gloat(gloat).admire().post()
  .then(({ body }) => dispatch({
      type: CREATE_ADMIRE_SUCCESS,
      payload: { gloat: body },
    })
  );
};

const deleteAdmire = gloat => dispatch => {
  dispatch({
    type: DELETE_ADMIRE_REQUEST,
    payload: { gloat },
  });

  return api().gloat(gloat).admire().delete()
  .then(({ body }) => dispatch({
      type: DELETE_ADMIRE_SUCCESS,
      payload: { gloat: body },
    })
  );
};

export {
  clickAdmire,
  createAdmire,
  deleteAdmire,
};
