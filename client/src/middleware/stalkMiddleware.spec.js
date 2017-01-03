import { expect } from 'chai';
import sinon from 'sinon';
import stalkMiddleware from './stalkMiddleware';
import fetchMock from 'fetch-mock';

const createFakeStore = (fakeData = {}) => ({
  getState: () => fakeData,
  dispatch: sinon.spy(),
});

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

const dispatchWithStoreOf = (store, action) => {
  let dispatched = null;
  const dispatch = stalkMiddleware(store)(actionAttempt => dispatched = actionAttempt);
  dispatch(action);
  return dispatched;
}

describe('stalkMiddleware', () => {
  describe('when action type is not click stalk', () => {
    it('dispatches only original action', () => {
      const store = createFakeStore();

      const action = {
        type: 'WRONG_ACTION',
        payload: { user: testUser() },
      };

      const dispatched = dispatchWithStoreOf(store, action);

      expect(dispatched).to.deep.equal(action);
      expect(store.dispatch.called).to.equal(false);
    });
  });

  describe('when action is click stalk and user is stalked', () => {
    let store;
    const user = testUser({ stalked: true, stalkers_count: 1 });
    const action = {
      type: 'CLICK_STALK',
      payload: { user },
    };

    beforeEach(() => {
      fetchMock.delete('*', testUser({ stalked: false, stalkers_count: 0 }));
      store = createFakeStore();
    });

    afterEach(() => {
      fetchMock.restore();
    });

    it('dispatches original action', () => {
      const dispatched = dispatchWithStoreOf(store, action);
      expect(dispatched).to.deep.equal(action);
    });

    it('dispatches delete stalk action', () => {
      dispatchWithStoreOf(store, action);

      expect(store.dispatch.calledOnce).to.equal(true);

      const dispatchedAction = store.dispatch.firstCall.args[0];
      const testDispatch = sinon.spy();
      dispatchedAction(testDispatch);

      expect(testDispatch.firstCall.args[0]).to.have.property('type', 'DELETE_STALK_REQUEST');
    });
  });

  describe('when action is click stalk and user is NOT stalked', () => {
    let store;
    const user = testUser({ stalked: false, stalkers_count: 0 });
    const action = {
      type: 'CLICK_STALK',
      payload: { user },
    };

    beforeEach(() => {
      fetchMock.post('*', testUser({ stalked: true, stalkers_count: 1 }));
      store = createFakeStore();
    });

    afterEach(() => {
      fetchMock.restore();
    });

    it('dispatches original action', () => {
      const dispatched = dispatchWithStoreOf(store, action);
      expect(dispatched).to.deep.equal(action);
    });

    it('dispatches create stalk action', () => {
      dispatchWithStoreOf(store, action);

      expect(store.dispatch.calledOnce).to.equal(true);

      const dispatchedAction = store.dispatch.firstCall.args[0];
      const testDispatch = sinon.spy();
      dispatchedAction(testDispatch);

      expect(testDispatch.firstCall.args[0]).to.have.property('type', 'CREATE_STALK_REQUEST');
    });
  });
});
