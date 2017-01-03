import api from 'Util/api';

import {
  CLICK_STALK,
  CREATE_STALK_REQUEST,
  CREATE_STALK_SUCCESS,
  DELETE_STALK_REQUEST,
  DELETE_STALK_SUCCESS,
} from './action-types';

const clickStalk = user => ({
  type: CLICK_STALK,
  payload: { user },
});

const createStalk = user => dispatch => {
  dispatch({
    type: CREATE_STALK_REQUEST,
    payload: { user },
  });

  return api().user(user).stalk().post()
  .then(({ body }) => dispatch({
      type: CREATE_STALK_SUCCESS,
      payload: { user: body },
    })
  );
};

const deleteStalk = user => dispatch => {
  dispatch({
    type: DELETE_STALK_REQUEST,
    payload: { user },
  });

  return api().user(user).stalk().delete()
  .then(({ body }) => dispatch({
      type: DELETE_STALK_SUCCESS,
      payload: { user: body },
    })
  );
};

export {
  clickStalk,
  createStalk,
  deleteStalk,
};
