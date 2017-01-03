import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import * as actions from './admire-actions';

const testGloat = data => ({
  id: 123,
  content: 'This is a test gloat',
  admirers_count: 2,
  user: {
    username: 'testuser',
    name: 'Test User',
    image: 'example.com/avatar',
  },
  ...data,
});

describe('admire action creators', () => {
  describe('clickAdmire', () => {
    it('returns an action with proper type', () => {
      expect(actions.clickAdmire()).to.deep.equal({
        type: 'CLICK_ADMIRE',
      });
    });
  });

  describe('createAdmire', () => {
    let dispatch;
    let gloat;

    beforeEach(() => {
      fetchMock.post('*', testGloat({ admired: true }));
      dispatch = sinon.spy();
      gloat = testGloat();
    });

    afterEach(() => fetchMock.restore());

    it('dispatches a create admire request action', done => {
      actions.createAdmire(gloat)(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'CREATE_ADMIRE_REQUEST',
          payload: { gloat },
        })).to.equal(true);
        done();
      })
      .catch(done);
    });

    it('dispatches a post request to admire endpoint', done => {
      actions.createAdmire(gloat)(dispatch)
      .then(() => {
        expect(fetchMock.lastUrl()).to.match(/gloats\/123\/admire/);
        expect(fetchMock.lastOptions()).to.have.property('method', 'POST');
        done();
      })
      .catch(done);
    });

    it('dispatches a create admire success action', done => {
      actions.createAdmire(gloat)(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'CREATE_ADMIRE_SUCCESS',
          payload: { gloat: testGloat({ admired: true }) },
        })).to.equal(true);
        done();
      })
      .catch(done);
    });
  });

  describe('deleteAdmire', () => {
    let dispatch;
    let gloat;

    beforeEach(() => {
      fetchMock.delete('*', testGloat({ admired: false }));
      dispatch = sinon.spy();
      gloat = testGloat({ admired: true });
    });

    afterEach(() => fetchMock.restore());

    it('dispatches a delete admire request action', done => {
      actions.deleteAdmire(gloat)(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'DELETE_ADMIRE_REQUEST',
          payload: { gloat },
        })).to.equal(true);
        done();
      })
      .catch(done);
    });

    it('dispatches a post request to admire endpoint', done => {
      actions.deleteAdmire(gloat)(dispatch)
      .then(() => {
        expect(fetchMock.lastUrl()).to.match(/gloats\/123\/admire/);
        expect(fetchMock.lastOptions()).to.have.property('method', 'DELETE');
        done();
      })
      .catch(done);
    });

    it('dispatches a delete admire success action', done => {
      actions.deleteAdmire(gloat)(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'DELETE_ADMIRE_SUCCESS',
          payload: { gloat: testGloat({ admired: false }) },
        })).to.equal(true);
        done();
      })
      .catch(done);
    });
  });
});
