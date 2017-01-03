import { expect } from 'chai';
import gloatReducers from './gloats-reducers';
import {
  FETCH_GLOATS_REQUEST,
  FETCH_GLOATS_SUCCESS,
  CREATE_GLOAT_SUCCESS,
  CREATE_ADMIRE_SUCCESS,
  DELETE_ADMIRE_SUCCESS,
} from 'Actions/action-types';

const byFilterBefore = (ids = []) =>
  ['popular', 'recent', 'admired', 'user'].reduce((a, b) => {
    a[b] = {
      lastUpdated: null,
      links: {},
      ids,
    };
    return a;
  }, {});

const stateBefore = (data = {}) => ({
  byId: {},
  loading: false,
  byFilter: byFilterBefore(),
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
];

const byIdBefore = (data = {}) => ({
  '1': testGloats[0],
  '2': testGloats[1],
});

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

  it('adds successfully created gloats by id', () => {
    const action = {
      type: CREATE_GLOAT_SUCCESS,
      payload: { gloat: testGloats[0] }
    };
    const actual = gloatReducers(stateBefore(), action);
    const expected = {
      byId: {
        [testGloats[0].id]: testGloats[0],
      },
    };

    expect(actual.byId[testGloats[0].id]).to.deep.equal(expected.byId[testGloats[0].id]);
  });

  it('adds successfully created gloats to recent and current filters', () => {
    const action = {
      type: CREATE_GLOAT_SUCCESS,
      payload: { gloat: testGloats[0] }
    };
    const actual = gloatReducers(stateBefore(), action);
    const expectedIds = [testGloats[0].id];

    expect(actual.byFilter.recent.ids).to.deep.equal(expectedIds);
    expect(actual.byFilter.current.ids).to.deep.equal(expectedIds);
  });

  it('appends gloats to existing gloats when gloats are received', () => {
    const action = {
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

    const state = stateBefore({
      loading: true,
      byId: byIdBefore(),
    });

    const actual = gloatReducers(state, action);

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

  it('replaces id for filter "user"', () => {
    const action = {
      type: FETCH_GLOATS_SUCCESS,
      payload: {
        gloats: [testGloats[0]],
        filter: 'user',
        timestamp: 1234,
        links: {},
      },
    };

    const state = stateBefore({
      loading: true,
      byFilter: byFilterBefore([1, 2]),
    });

    const actual = gloatReducers(state, action);

    expect(actual.byFilter.user.ids).to.deep.equal([1]);
  })

  it('clears duplicate ids when adding new page', () => {
    const action = {
      type: FETCH_GLOATS_SUCCESS,
      payload: {
        gloats: [testGloats[0]],
        filter: 'recent',
        timestamp: 12345,
        links: { first: 'firstpagelink', next: 'nextpagelink' }
      },
    };

    const state = stateBefore({
      loading: true,
      byId: byIdBefore(),
      byFilter: byFilterBefore([1, 2])
    });

    const actual = gloatReducers(state, action);

    const expectedRecent = {
      ids: [1, 2],
      lastUpdated: 12345,
      links: { first: 'firstpagelink', next: 'nextpagelink' },
    };

    expect(actual.byFilter.recent).to.deep.equal(expectedRecent);
  });

  describe('handling CREATE_ADMIRE_SUCCESS action', () => {
    it('replaces gloat in byId with gloat in payload', () =>{
      const state = stateBefore({
        byId: byIdBefore(),
      });

      const action = {
        type: CREATE_ADMIRE_SUCCESS,
        payload: { gloat: { ...testGloats[0], admired: true }},
      };

      const actual = gloatReducers(state, action);
      const expectedById = {
        '1': { ...testGloats[0], admired: true },
        '2': testGloats[1],
      };

      expect(actual.byId).to.deep.equal(expectedById);
    });
  });

  describe('handling DELETE_ADMIRE_SUCCESS action', () => {
    it('replaces gloat in byId with gloat in payload', () =>{
      const state = stateBefore({
        byId: byIdBefore(),
      });

      const action = {
        type: DELETE_ADMIRE_SUCCESS,
        payload: { gloat: { ...testGloats[0], admired: false }},
      };

      const actual = gloatReducers(state, action);
      const expectedById = {
        '1': { ...testGloats[0], admired: false },
        '2': testGloats[1],
      };

      expect(actual.byId).to.deep.equal(expectedById);
    });

    it('removes id from admired filter', () => {
      const state = stateBefore({
        byId: byIdBefore(),
        byFilter: byFilterBefore([1, 2]),
      });

      const action = {
        type: DELETE_ADMIRE_SUCCESS,
        payload: { gloat: { ...testGloats[0], admired: false }},
      };

      const actual = gloatReducers(state, action);
      const expectedAdmiredIds = [2];

      expect(actual.byFilter.admired.ids).to.deep.equal(expectedAdmiredIds);
    });
  });
});
