import { expect } from 'chai';
import sinon from 'sinon';
import userGloatsMiddleware from './userGloatsMiddleware';
import fetchMock from 'fetch-mock';

const createFakeStore = (fakeData = {}) => ({
  getState: () => fakeData,
  dispatch: sinon.spy(),
});

const testUser = (data = {}) => ({
  id: 123,
  admired: false,
  admirer_count: 3,
  content: 'whatever',
  gloats: [
    { id: 123, content: 'asdf' },
    { id: 234, content: 'qwer' },
  ],
  ...data
});

const dispatchWithStoreOf = (store, action) => {
  let dispatched = null;
  const dispatch = userGloatsMiddleware(store)(actionAttempt => dispatched = actionAttempt);
  dispatch(action);
  return dispatched;
}

describe('userGloatsMiddleware', () => {
  describe('when action type is not fetch user success', () => {
    it('dispatches original action', () => {
      const store = createFakeStore();

      const action = {
        type: 'NOT_THE_RIGHT_ACTION',
        payload: { user: testUser() },
      };

      const dispatched = dispatchWithStoreOf(store, action);

      expect(dispatched).to.deep.equal(action);
    });
  });

  describe('when action is fetch user success', () => {
    let store;
    const user = testUser();
    const action = {
      type: 'FETCH_USER_SUCCESS',
      payload: { user },
    };

    beforeEach(() => {
      store = createFakeStore();
    });

    it('dispatches original action', () => {
      const dispatched = dispatchWithStoreOf(store, action);
      expect(dispatched).to.deep.equal(action);
    });

    it('dispatches receive gloats action with gloats including user in payload', () => {
      dispatchWithStoreOf(store, action);

      const actual = store.dispatch.firstCall.args[0];

      expect(actual).to.have.property('type', 'FETCH_GLOATS_SUCCESS');
      expect(actual.payload.gloats[0]).to.have.property('user');
    });
  });
});
