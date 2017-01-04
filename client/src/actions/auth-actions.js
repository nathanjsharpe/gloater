import { SubmissionError } from 'redux-form';
import api from 'Util/api';
import {
  CREATE_API_TOKEN_REQUEST,
  CREATE_API_TOKEN_SUCCESS,
  CREATE_API_TOKEN_FAILURE,
  DELETE_API_TOKEN_REQUEST,
  DELETE_API_TOKEN_SUCCESS,
} from './action-types';

export const login = (email, password) => dispatch => {
  dispatch({ type: CREATE_API_TOKEN_REQUEST });

  return api().apiToken().post({ user: { email, password } })
  .then(({ body }) => dispatch({
    type: CREATE_API_TOKEN_SUCCESS,
    payload: body,
  }))
  .catch(response => {
    dispatch({
      type: CREATE_API_TOKEN_FAILURE,
      payload: response,
    });
    throw new SubmissionError({ _error: 'Login failed. Please check your credentials and try again.'})
  });
};

export const logout = () => dispatch => {
  dispatch({ type: DELETE_API_TOKEN_REQUEST });

  return api().apiToken().delete()
  .then(() => dispatch({ type: DELETE_API_TOKEN_SUCCESS }));
};
