import api from 'Util/api';

import {
  CREATE_API_TOKEN_REQUEST,
  CREATE_API_TOKEN_SUCCESS,
} from './action-types';

export const login = (email, password) => dispatch => {
  dispatch({ type: CREATE_API_TOKEN_REQUEST });

  return api().apiToken().post({ user: { email, password } })
  .then(apiToken => dispatch({
    type: CREATE_API_TOKEN_SUCCESS,
    payload: apiToken,
  }));
};
