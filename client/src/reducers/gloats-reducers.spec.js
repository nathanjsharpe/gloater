import { expect } from 'chai';
import gloatReducers from './gloats-reducers';

const stateBefore = (data = {}) => ({
  byId: {},
  loading: false,
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
      type: 'FETCH_GLOATS',
    };

    const actual = gloatReducers(stateBefore(), action);
    const expected = {
      byId: {},
      loading: true,
    };

    expect(actual).to.deep.equal(expected);
  });

  it('sets loading to false when gloats are received', () => {
    const action = {
      type: 'RECEIVE_GLOATS',
      payload: { gloats: testGloats }
    };

    const actual = gloatReducers(stateBefore({loading: true}), action);

    expect(actual.loading).to.be.false;
  });

  it('saves gloats by id when gloats are received', () => {
    const action = {
      type: 'RECEIVE_GLOATS',
      payload: { gloats: testGloats }
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

    expect(actual).to.deep.equal(expected);
  });

  it('appends gloats to existing gloats when gloats are received', () => {
    const firstAction = {
      type: 'RECEIVE_GLOATS',
      payload: { gloats: testGloats },
    };

    const secondAction = {
      type: 'RECEIVE_GLOATS',
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

    expect(actual).to.deep.equal(expected);
  })
});
