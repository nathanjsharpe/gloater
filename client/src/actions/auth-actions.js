import { SubmissionError } from 'redux-form';
import api from 'Util/api';
import {
  CREATE_API_TOKEN_REQUEST,
  CREATE_API_TOKEN_SUCCESS,
  CREATE_API_TOKEN_FAILURE,
  OPEN_USER_MENU,
  CLOSE_USER_MENU,
  TOGGLE_USER_MENU,
} from './action-types';

export const openUserMenu = ({
  type: OPEN_USER_MENU,
});

export const closeUserMenu = ({
  type: CLOSE_USER_MENU,
});

export const toggleUserMenu = ({
  type: TOGGLE_USER_MENU,
});

export const login = (email, password) => dispatch => {
  dispatch({ type: CREATE_API_TOKEN_REQUEST });

  return api().apiToken().post({ user: { email, password } })
  .then(apiToken => dispatch({
    type: CREATE_API_TOKEN_SUCCESS,
    payload: apiToken,
  }))
  .catch(response => {
    dispatch({
      type: CREATE_API_TOKEN_FAILURE,
      payload: response,
    });
    throw new SubmissionError({ _error: 'Login failed. Please check your credentials and try again.'})
  });
};
