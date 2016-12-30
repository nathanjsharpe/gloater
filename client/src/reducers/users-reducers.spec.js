import { expect } from 'chai';
import userReducers from './users-reducers';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
} from 'Actions/action-types';

const stateBefore = (data = {}) => ({
  byId: {},
  loading: false,
  ...data,
});

const testUsers = [
  {
    "id": 1,
    "email": "darren.graham@example.com",
    "city": "leicester",
    "state": "worcestershire",
    "profession": "philosopher",
    "company": "Schowalter, Kuhlman and Reinger",
    "created_at": "2016-12-30T19:01:01.684Z",
    "image": "https://randomuser.me/api/portraits/med/men/72.jpg",
    "username": "crazymeercat207",
    "stalkers_count": 8,
    "stalked": false
  },
  {
    "id": 2,
    "email": "antonia.hanke@example.com",
    "city": "wesel",
    "state": "berlin",
    "profession": "web developer",
    "company": "Stark and Sons",
    "created_at": "2016-12-30T19:01:03.810Z",
    "image": "https://randomuser.me/api/portraits/med/women/3.jpg",
    "username": "organicgorilla225",
    "stalkers_count": 8,
    "stalked": false
  },
];

const testUser = {
  "id": 3,
  "email": "nils.guillot@example.com",
  "city": "paris",
  "state": "martinique",
  "profession": "human resources",
  "company": "Baumbach, Rosenbaum and D'Amore",
  "created_at": "2016-12-30T19:00:59.808Z",
  "image": "https://randomuser.me/api/portraits/med/men/48.jpg",
  "username": "silvercat637",
  "stalkers_count": 7,
  "stalked": false
};

describe('userReducers', () => {
  it('sets loading to true when users are fetched', () => {
    const action = {
      type: FETCH_USERS_REQUEST,
      filter: 'popular'
    };

    const actual = userReducers(stateBefore(), action);
    const expected = {
      byId: {},
      loading: true,
    };

    expect(actual).to.contain.all.keys(expected);
  });

  it('sets loading to false when users are received', () => {
    const action = {
      type: FETCH_USERS_SUCCESS,
      payload: { users: testUsers, filter: 'popular' }
    };

    const actual = userReducers(stateBefore({loading: true}), action);

    expect(actual.loading).to.be.false;
  });

  it('saves users by id when users are received', () => {
    const action = {
      type: FETCH_USERS_SUCCESS,
      payload: { users: testUsers, filter: 'popular', timestamp: 1234 }
    };

    const actual = userReducers(stateBefore({loading: true}), action);
    const expected = {
      loading: false,
      byId: {
        '1': testUsers[0],
        '2': testUsers[1],
      }
    };

    expect(actual).to.contain.all.keys(expected);
  });

  it('appends users to existing users when users are received', () => {
    const firstAction = {
      type: FETCH_USERS_SUCCESS,
      payload: { users: testUsers, filter: 'popular' },
    };

    const secondAction = {
      type: FETCH_USERS_SUCCESS,
      payload: {
        users: [testUser],
      },
    }

    let actual = userReducers(stateBefore({loading: true}), firstAction);
    actual = userReducers(actual, secondAction);

    const expected = {
      loading: false,
      byId: {
        '1': testUsers[0],
        '2': testUsers[1],
        '3': testUser,
      },
    };

    expect(actual).to.contain.all.keys(expected);
  });

  // it('adds ids to specified filter', () => {
  //   const action = {
  //     type: FETCH_USERS_SUCCESS,
  //     payload: {
  //       users: testUsers,
  //       filter: 'popular',
  //       timestamp: 1234,
  //       links: { first: 'firstpagelink', prev: 'prevpagelink' }
  //     },
  //   };

  //   const actual = userReducers(stateBefore({loading: true}), action);

  //   const expectedpopular = {
  //     ids: [1, 2],
  //     lastUpdated: 1234,
  //     links: { first: 'firstpagelink', prev: 'prevpagelink' },
  //   };

  //   expect(actual.byFilter.popular).to.deep.equal(expectedpopular);
  // });

  // it('clears duplicate ids when adding new page', () => {
  //   const firstAction = {
  //     type: FETCH_USERS_SUCCESS,
  //     payload: {
  //       users: testUsers,
  //       filter: 'popular',
  //       timestamp: 1234,
  //       links: { first: 'firstpagelink', prev: 'prevpagelink' },
  //     },
  //   };

  //   const secondAction = {
  //     type: FETCH_USERS_SUCCESS,
  //     payload: {
  //       users: [testUsers[0]],
  //       filter: 'popular',
  //       timestamp: 12345,
  //       links: { first: 'firstpagelink', next: 'nextpagelink' }
  //     },
  //   };

  //   let actual = userReducers(stateBefore({loading: true}), firstAction);
  //   actual = userReducers(actual, secondAction);

  //   const expectedpopular = {
  //     ids: [1, 2],
  //     lastUpdated: 12345,
  //     links: { first: 'firstpagelink', next: 'nextpagelink' },
  //   };

  //   expect(actual.byFilter.popular).to.deep.equal(expectedpopular);
  // });
});
