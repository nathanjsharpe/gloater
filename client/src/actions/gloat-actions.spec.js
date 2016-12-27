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
  });
});
