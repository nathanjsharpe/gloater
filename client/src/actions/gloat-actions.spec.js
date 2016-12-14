import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import * as actions from './gloat-actions';

import {
  FETCH_GLOATS,
  RECEIVE_GLOATS,
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

describe('gloat action creators', () => {
  beforeEach(() => {
    fetchMock.get('*', testGloats);
  });

  afterEach(() => fetchMock.restore());

  describe('fetchGloats', () => {
    it('issues a fetch gloats action', done => {
      const dispatch = sinon.spy();
      actions.fetchGloats()(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'FETCH_GLOATS'
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
      actions.fetchGloats()(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'RECEIVE_GLOATS',
          payload: {
            gloats: testGloats,
          },
        })).to.be.true;
        done();
      })
      .catch(done);
    });
  });
});
