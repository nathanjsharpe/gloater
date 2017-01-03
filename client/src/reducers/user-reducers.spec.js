import { expect } from 'chai';
import userReducers from './user-reducers';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from 'Actions/action-types';

const stateBefore = (data = {}) => ({
  loading: false,
  user: null,
  ...data,
});

const testUser = (data = {}) => ({
  id: 123,
  email: 'jeffrey@example.com',
  city: null,
  state: null,
  profession: null,
  company: null,
  created_at: '2016-12-30T21:25:23.218Z',
  image: 'https://www.gravatar.com/avatar/1fd543d9fb27bd7cc5ada972fe981e48',
  username: 'therealdude',
  stalkers_count: 0,
  ...data,
});

describe('userReducers', () => {
  it('sets loading to true when users are fetched', () => {
    const action = {
      type: FETCH_USER_REQUEST,
      payload: { username: testUser().username }
    };

    const actual = userReducers(stateBefore(), action);
    const expected = {
      loading: true,
      user: null,
    };

    expect(actual).to.deep.include(expected);
  });

  it('sets loading to false when user is received', () => {
    const action = {
      type: FETCH_USER_SUCCESS,
      payload: { user: testUser() },
    };

    const actual = userReducers(stateBefore({loading: true}), action);

    expect(actual.loading).to.equal(false);
  });

  it('sets user when one is fetched', () => {
    const action = {
      type: FETCH_USER_SUCCESS,
      payload: { user: testUser() },
    };

    const actual = userReducers(stateBefore({ loading: true }), action);

    expect(actual.user).to.deep.equal(testUser());
  });
});
