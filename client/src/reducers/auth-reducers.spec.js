import { expect } from 'chai';
import authReducers from './auth-reducers';
import {
  CREATE_API_TOKEN_REQUEST,
  CREATE_API_TOKEN_SUCCESS,
} from 'Actions/action-types';

const stateBefore = (data = {}) => ({
  isFetching: false,
  token: null,
  expiresAt: null,
  currentUser: null,
  ...data,
});

const apiTokenPayload = {
  token: 'testapitoken',
  expires_at: '2018-01-16T01:56:47.156Z',
  user: {
    id: 11,
    email: 'user@example.com',
    city: null,
    state: null,
    profession: null,
    company: null,
    created_at: '2016-12-17T01:56:01.593Z',
    image: null,
  }
};

describe('authReducers', () => {
  it('sets isFetching to true when api token is fetched', () => {
    const action = {
      type: CREATE_API_TOKEN_REQUEST,
    };

    const actual = authReducers(stateBefore(), action);
    const expected = {
      isFetching: true,
      token: null,
      expiresAt: null,
      currentUser: null,
    };

    expect(actual).to.deep.equal(expected);
  });

  it('sets isFetching to false when api token is received', () => {
    const action = {
      type: CREATE_API_TOKEN_SUCCESS,
      payload: apiTokenPayload
    };

    const actual = authReducers(stateBefore({isFetching: true}), action);

    expect(actual.isFetching).to.be.false;
  });

  it('saves api token information when one is successfully created', () => {
    const action = {
      type: CREATE_API_TOKEN_SUCCESS,
      payload: apiTokenPayload
    };

    const actual = authReducers(stateBefore({isFetching: true}), action);
    const expected = {
      isFetching: false,
      token: apiTokenPayload.token,
      expiresAt: apiTokenPayload.expires_at,
      currentUser: apiTokenPayload.user,
    };

    expect(actual).to.deep.equal(expected);
  });
});
