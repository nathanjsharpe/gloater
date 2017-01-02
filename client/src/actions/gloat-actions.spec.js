import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import * as actions from './gloat-actions';

import {
  FETCH_GLOATS_REQUEST,
  FETCH_GLOATS_SUCCESS,
} from './action-types';

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

const testGloat = {
  content: "this is a test gloat",
};

const testGloatSuccess = {
  id: 2001,
  content: 'this is a test gloat alksd',
  created_at: '2017-01-01T17:51:20.383Z',
  updated_at: '2017-01-01T17:51:20.383Z',
  admirers_count: 0,
  user: {
    username: 'crazywolf271',
    name: 'Miriam Muñoz',
    image: 'https://randomuser.me/api/portraits/med/women/24.jpg'
  }
};

const testTimestamp = Date.now();

let clock;

describe('gloat action creators', () => {
  beforeEach(() => {
    fetchMock.get('*', {
      body: testGloats,
      headers: {
        Link: '<http://localhost:3000/gloats?page=21> rel="next"; <http://localhost:3000/gloats?page=19> rel="prev"; <http://localhost:3000/gloats?page=40> rel="last"; <http://localhost:3000/gloats?page=1> rel="first"',
      }
    });
    clock = sinon.useFakeTimers(testTimestamp);
  });

  afterEach(() => {
    fetchMock.restore();
    clock.restore();
  });

  describe('fetchGloats', () => {
    it('issues a fetch gloats action', done => {
      const dispatch = sinon.spy();
      actions.fetchGloats('testfilter')(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: FETCH_GLOATS_REQUEST,
          payload: { filter: 'testfilter' },
        })).to.be.true;
        done();
      })
      .catch(done);
    });

    it('makes an api request for gloats', done => {
      const dispatch = sinon.spy();
      actions.fetchGloats()(dispatch)
      .then(() => {
        expect(fetchMock.lastUrl()).to.match(/gloats/);
        done();
      })
      .catch(done);
    });

    it('issues a receive gloats action when receiving a successful api response', done => {
      const dispatch = sinon.spy();
      actions.fetchGloats('testfilter')(dispatch)
      .then(() => {
        const actualArg = dispatch.secondCall.args[0];
        const expectedArg = {
          type: FETCH_GLOATS_SUCCESS,
          payload: {
            filter: 'testfilter',
            gloats: testGloats,
            links: {
              first: 'http://localhost:3000/gloats?page=1',
              last: 'http://localhost:3000/gloats?page=40',
              prev: 'http://localhost:3000/gloats?page=19',
              next: 'http://localhost:3000/gloats?page=21',
            },
            timestamp: testTimestamp,
          },
        };
        expect(actualArg).to.deep.equal(expectedArg)
        done();
      })
      .catch(done);
    });

    it('issues request to a specific url if provided', done => {
      const dispatch = sinon.spy();
      actions.fetchGloats('testfilter', 'http://example.com/stuff')(dispatch)
      .then(() => {
        expect(fetchMock.lastUrl()).to.equal('http://example.com/stuff');
        done()
      })
      .catch(done);
    });
  });

  describe('fetchUserGloats', () => {
    beforeEach(() => sinon.stub(actions, 'fetchGloats'));
    afterEach(() => actions.fetchGloats.restore());

    it('calls fetch gloats with the user gloats url', () => {
      const user = { username: 'exampleuser' };

      actions.fetchUserGloats(user);
      expect(actions.fetchGloats.calledWith(user, 'currentUser'));
    });
  });

  describe('createGloat', () => {
    beforeEach(() => {
      fetchMock.post('*', testGloatSuccess)
    });

    afterEach(() => {
      fetchMock.restore();
    });

    it('disptaches a create gloat request action', done => {
      const dispatch = sinon.spy();
      actions.createGloat(testGloat)(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'CREATE_GLOAT_REQUEST',
          payload: { gloat: testGloat },
        })).to.be.true;
        done();
      })
      .catch(done);
    });

    it('sends a post request to the gloats endpoint with the new gloat as the body', done => {
      const dispatch = sinon.spy();
      actions.createGloat(testGloat)(dispatch)
      .then(() => {
        expect(fetchMock.lastUrl()).to.match(/gloats/);
        expect(fetchMock.lastOptions()).to.deep.include({
          method: 'POST',
          body: JSON.stringify({ gloat: testGloat }),
        });
        done();
      })
      .catch(done);
    });

    it('disptaches a create gloat success action', done => {
      const dispatch = sinon.spy();
      actions.createGloat(testGloat)(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'CREATE_GLOAT_SUCCESS',
          payload: {
            gloat: testGloatSuccess,
          },
        })).to.be.true;
        done();
      })
      .catch(done);
    });
  })
});
