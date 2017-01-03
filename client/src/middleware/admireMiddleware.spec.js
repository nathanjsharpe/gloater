import { expect } from 'chai';
import sinon from 'sinon';
import admireMiddleware from './admireMiddleware';
import fetchMock from 'fetch-mock';

const createFakeStore = (fakeData = {}) => ({
  getState: () => fakeData,
  dispatch: sinon.spy(),
});

const testGloat = (data = {}) => ({
  id: 123,
  admired: false,
  admirer_count: 3,
  content: 'whatever',
  ...data
});

const dispatchWithStoreOf = (store, action) => {
  let dispatched = null;
  const dispatch = admireMiddleware(store)(actionAttempt => dispatched = actionAttempt);
  dispatch(action);
  return dispatched;
}

describe('admireMiddleware', () => {
  describe('when action type is not click admire', () => {
    it('dispatches original action', () => {
      const store = createFakeStore();

      const action = {
        type: 'NOT_CLICK_ADMIRE',
        payload: { gloat: testGloat() },
      };

      const dispatched = dispatchWithStoreOf(store, action);

      expect(dispatched).to.deep.equal(action);
    });
  });

  describe('when action is click admire and gloat is admired', () => {
    let store;
    const gloat = testGloat({ admired: true });
    const action = {
      type: 'CLICK_ADMIRE',
      payload: { gloat },
    };

    beforeEach(() => {
      fetchMock.delete('*', testGloat({ admired: false }));
      store = createFakeStore();
    });

    afterEach(() => {
      fetchMock.restore();
    });

    it('dispatches original action', () => {
      const dispatched = dispatchWithStoreOf(store, action);
      expect(dispatched).to.deep.equal(action);
    });

    it('dispatches delete admire action', () => {
      dispatchWithStoreOf(store, action);
      const dispatchedAction = store.dispatch.firstCall.args[0];
      const testDispatch = sinon.spy();
      dispatchedAction(testDispatch);

      expect(store.dispatch.calledOnce).to.equal(true);
      expect(testDispatch.firstCall.args[0]).to.have.property('type', 'DELETE_ADMIRE_REQUEST');
    });
  });

  describe('when action is click admire and gloat is NOT admired', () => {
    let store;
    const gloat = testGloat({ admired: false });
    const action = {
      type: 'CLICK_ADMIRE',
      payload: { gloat },
    };

    beforeEach(() => {
      fetchMock.post('*', testGloat({ admired: true }));
      store = createFakeStore();
    });

    afterEach(() => {
      fetchMock.restore();
    });

    it('dispatches original action', () => {
      const dispatched = dispatchWithStoreOf(store, action);
      expect(dispatched).to.deep.equal(action);
    });

    it('dispatches create admire action', () => {
      dispatchWithStoreOf(store, action);
      const dispatchedAction = store.dispatch.firstCall.args[0];
      const testDispatch = sinon.spy();
      dispatchedAction(testDispatch);

      expect(store.dispatch.calledOnce).to.equal(true);
      expect(testDispatch.firstCall.args[0]).to.have.property('type', 'CREATE_ADMIRE_REQUEST');
    });
  });
});
