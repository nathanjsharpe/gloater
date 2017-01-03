import { expect } from 'chai';
import userReducers from './user-reducers';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  CREATE_STALK_SUCCESS,
  DELETE_STALK_SUCCESS,
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

  it('replaces user when stalk is successfully created', () => {
    const action = {
      type: CREATE_STALK_SUCCESS,
      payload: { user: testUser({ stalked: true, stalkers_count: 1 }) }
    };

    const state = stateBefore({
      user: testUser({ stalked: false, stalkers_count: 0 }),
    });

    const actual = userReducers(state, action);
    expect(actual.user).to.deep.equal(testUser({ stalked: true, stalkers_count: 1 }));
  });

  it('replaces user when stalk is successfully deleted', () => {
    const action = {
      type: DELETE_STALK_SUCCESS,
      payload: { user: testUser({ stalked: false, stalkers_count: 0 }) }
    };

    const state = stateBefore({
      user: testUser({ stalked: true, stalkers_count: 1 }),
    });

    const actual = userReducers(state, action);
    expect(actual.user).to.deep.equal(testUser({ stalked: false, stalkers_count: 0 }));
  });
});
