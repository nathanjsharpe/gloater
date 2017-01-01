import { SubmissionError } from 'redux-form';
import api from 'Util/api';
import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from './action-types';

export const createUser = user => dispatch => {
  dispatch({
    type: CREATE_USER_REQUEST,
    payload: { user }
  });

  return api().users().post({ user })
  .then(({ body }) => dispatch({
    type: CREATE_USER_SUCCESS,
    payload: { user: body }
  }))
  .catch(response => {
    dispatch({
      type: CREATE_USER_FAILURE,
      payload: response,
    });
    throw new SubmissionError({ _error: 'Something is messed up.' });
  });
}