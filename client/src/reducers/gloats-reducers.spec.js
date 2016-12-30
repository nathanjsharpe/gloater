import { expect } from 'chai';
import gloatReducers from './gloats-reducers';
import {
  FETCH_GLOATS_REQUEST,
  FETCH_GLOATS_SUCCESS,
} from 'Actions/action-types';

const byFilterBefore = {
  popular: { lastUpdated: null, ids: [], links: {}},
  recent: { lastUpdated: null, ids: [], links: {}},
};

const stateBefore = (data = {}) => ({
  byId: {},
  loading: false,
  byFilter: byFilterBefore,
  ...data,
});

const testGloats = [
  {
    id: 1,
    content: 'content for first gloat',
    user: {
      username: 'testuser',
      name: 'Test User',
      image: 'http://example.com/image'
    }
  },
  {
    id: 2,
    content: 'content for second gloat',
    user: {
      username: 'testuser2',
      name: 'Test User 2',
      image: 'http://example.com/image2'
    }
  },
]

describe('gloatReducers', () => {
  it('sets loading to true when gloats are fetched', () => {
    const action = {
      type: FETCH_GLOATS_REQUEST,
    };

    const actual = gloatReducers(stateBefore(), action);
    const expected = {
      byId: {},
      loading: true,
    };

    expect(actual).to.contain.all.keys(expected);
  });

  it('sets loading to false when gloats are received', () => {
    const action = {
      type: FETCH_GLOATS_SUCCESS,
      payload: { gloats: testGloats, filter: 'recent' }
    };

    const actual = gloatReducers(stateBefore({loading: true}), action);

    expect(actual.loading).to.be.false;
  });

  it('saves gloats by id when gloats are received', () => {
    const action = {
      type: FETCH_GLOATS_SUCCESS,
      payload: { gloats: testGloats, filter: 'recent', timestamp: 1234 }
    };

    const actual = gloatReducers(stateBefore({loading: true}), action);
    const expected = {
      loading: false,
      byId: {
        '1': {
          id: 1,
          content: 'content for first gloat',
          user: {
            username: 'testuser',
            name: 'Test User',
            image: 'http://example.com/image'
          }
        },
        '2': {
          id: 2,
          content: 'content for second gloat',
          user: {
            username: 'testuser2',
            name: 'Test User 2',
            image: 'http://example.com/image2'
          }
        },
      }
    };

    expect(actual).to.contain.all.keys(expected);
  });

  it('appends gloats to existing gloats when gloats are received', () => {
    const firstAction = {
      type: FETCH_GLOATS_SUCCESS,
      payload: { gloats: testGloats, filter: 'recent' },
    };

    const secondAction = {
      type: FETCH_GLOATS_SUCCESS,
      payload: {
        gloats: [{
          id: 3,
          content: 'content for third gloat',
          user: {
            username: 'testuser3',
            name: 'Test User 3',
            image: 'http://example.com/image3'
          },
        }],
      },
    }

    let actual = gloatReducers(stateBefore({loading: true}), firstAction);
    actual = gloatReducers(actual, secondAction);

    const expected = {
      loading: false,
      byId: {
        '1': {
          id: 1,
          content: 'content for first gloat',
          user: {
            username: 'testuser',
            name: 'Test User',
            image: 'http://example.com/image'
          }
        },
        '2': {
          id: 2,
          content: 'content for second gloat',
          user: {
            username: 'testuser2',
            name: 'Test User 2',
            image: 'http://example.com/image2'
          }
        },
        '3': {
          id: 3,
          content: 'content for third gloat',
          user: {
            username: 'testuser3',
            name: 'Test User 3',
            image: 'http://example.com/image3'
          },
        },
      },
    };

    expect(actual).to.contain.all.keys(expected);
  });

  it('adds ids to specified filter', () => {
    const action = {
      type: FETCH_GLOATS_SUCCESS,
      payload: {
        gloats: testGloats,
        filter: 'recent',
        timestamp: 1234,
        links: { first: 'firstpagelink', prev: 'prevpagelink' }
      },
    };

    const actual = gloatReducers(stateBefore({loading: true}), action);

    const expectedRecent = {
      ids: [1, 2],
      lastUpdated: 1234,
      links: { first: 'firstpagelink', prev: 'prevpagelink' },
    };

    expect(actual.byFilter.recent).to.deep.equal(expectedRecent);
  });

  it('clears duplicate ids when adding new page', () => {
    const firstAction = {
      type: FETCH_GLOATS_SUCCESS,
      payload: {
        gloats: testGloats,
        filter: 'recent',
        timestamp: 1234,
        links: { first: 'firstpagelink', prev: 'prevpagelink' },
      },
    };

    const secondAction = {
      type: FETCH_GLOATS_SUCCESS,
      payload: {
        gloats: [testGloats[0]],
        filter: 'recent',
        timestamp: 12345,
        links: { first: 'firstpagelink', next: 'nextpagelink' }
      },
    };

    let actual = gloatReducers(stateBefore({loading: true}), firstAction);
    actual = gloatReducers(actual, secondAction);

    const expectedRecent = {
      ids: [1, 2],
      lastUpdated: 12345,
      links: { first: 'firstpagelink', next: 'nextpagelink' },
    };

    expect(actual.byFilter.recent).to.deep.equal(expectedRecent);
  });
});
