import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import * as actions from './stalk-actions';

const testUser = (data = {}) => ({
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

describe('stalk action creators', () => {
  describe('clickStalk', () => {
    it('returns an action with proper type and user in payload', () => {
      expect(actions.clickStalk(testUser())).to.deep.equal({
        type: 'CLICK_STALK',
        payload: { user: testUser() },
      });
    });
  });

  describe('createStalk', () => {
    let dispatch;
    let user;

    beforeEach(() => {
      fetchMock.post('*', testUser({ stalked: true, stalkers_count: 1 }));
      dispatch = sinon.spy();
      user = testUser();
    });

    afterEach(() => fetchMock.restore());

    it('dispatches a create stalk request action', done => {
      actions.createStalk(user)(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'CREATE_STALK_REQUEST',
          payload: { user },
        })).to.equal(true);
        done();
      })
      .catch(done);
    });

    it('dispatches a post request to stalk endpoint', done => {
      actions.createStalk(user)(dispatch)
      .then(() => {
        expect(fetchMock.lastUrl()).to.match(/users\/therealdude\/stalk/);
        expect(fetchMock.lastOptions()).to.have.property('method', 'POST');
        done();
      })
      .catch(done);
    });

    it('dispatches a create stalk success action', done => {
      actions.createStalk(user)(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'CREATE_STALK_SUCCESS',
          payload: { user: testUser({ stalked: true, stalkers_count: 1 }) },
        })).to.equal(true);
        done();
      })
      .catch(done);
    });
  });

  describe('deleteStalk', () => {
    let dispatch;
    let user;

    beforeEach(() => {
      fetchMock.delete('*', testUser({ stalked: false }));
      dispatch = sinon.spy();
      user = testUser({ stalked: true, stalkers_count: 1 });
    });

    afterEach(() => fetchMock.restore());

    it('dispatches a delete stalk request action', done => {
      actions.deleteStalk(user)(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'DELETE_STALK_REQUEST',
          payload: { user },
        })).to.equal(true);
        done();
      })
      .catch(done);
    });

    it('dispatches a post request to stalk endpoint', done => {
      actions.deleteStalk(user)(dispatch)
      .then(() => {
        expect(fetchMock.lastUrl()).to.match(/users\/therealdude\/stalk/);
        expect(fetchMock.lastOptions()).to.have.property('method', 'DELETE');
        done();
      })
      .catch(done);
    });

    it('dispatches a delete stalk success action', done => {
      actions.deleteStalk(user)(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'DELETE_STALK_SUCCESS',
          payload: { user: testUser({ stalked: false, stalkers_count: 0 }) },
        })).to.equal(true);
        done();
      })
      .catch(done);
    });
  });
});
