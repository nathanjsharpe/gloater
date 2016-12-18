import { expect } from 'chai';
import authReducers from './auth-reducers';
import {
  CREATE_API_TOKEN_REQUEST,
  CREATE_API_TOKEN_SUCCESS,
  OPEN_USER_MENU,
  CLOSE_USER_MENU,
  TOGGLE_USER_MENU,
} from 'Actions/action-types';

const stateBefore = (data = {}) => ({
  isFetching: false,
  token: null,
  expiresAt: null,
  currentUser: null,
  userMenuOpen: false,
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

    expect(actual).to.deep.include(expected);
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

    expect(actual).to.deep.include(expected);
  });

  describe('user menu state', () => {
    it('sets user menu to open', () => {
      const action = { type: OPEN_USER_MENU };
      const actual = authReducers(stateBefore(), action);
      const expected = {
        userMenuOpen: true,
      };
      expect(actual).to.deep.include(expected);
    });

    it('sets user menu to closed', () => {
      const action = { type: CLOSE_USER_MENU };
      const actual = authReducers(stateBefore({ userMenuOpen: true }), action);
      const expected = { userMenuOpen: false };
      expect(actual).to.deep.include(expected);
    });

    it('sets open menu to closed in response to toggle action', () => {
      const action = { type: TOGGLE_USER_MENU };
      const actual = authReducers(stateBefore({ userMenuOpen: true }), action);
      const expected = { userMenuOpen: false };
      expect(actual).to.deep.include(expected);
    });

    it('sets closed menu to open in response to toggle action', () => {
      const action = { type: TOGGLE_USER_MENU };
      const actual = authReducers(stateBefore({ userMenuOpen: false }), action);
      const expected = { userMenuOpen: true };
      expect(actual).to.deep.include(expected);
    });

  })
});
