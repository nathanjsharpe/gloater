import { SubmissionError } from 'redux-form';
import api from 'Util/api';
import { login } from './auth-actions';
import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from './action-types';

export const createUser = user => dispatch => {
  dispatch({
    type: CREATE_USER_REQUEST,
    payload: { user }
  });

  return api().users().post({ user })
  .then(({ body }) => {
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: { user: body }
    });
    return dispatch(login(user.email, user.password));
  })
  .catch(response => {
    dispatch({
      type: CREATE_USER_FAILURE,
      payload: response,
    });
    throw new SubmissionError({ _error: 'Something is messed up.' });
  });
}

export const fetchUser = username => dispatch => {
  dispatch({
    type: FETCH_USER_REQUEST,
    payload: { username },
  });

  return api().user(username).get()
  .then(({ body }) => dispatch({
    type: FETCH_USER_SUCCESS,
    payload: { user: body },
  }));
}
