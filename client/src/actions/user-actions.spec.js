import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import * as actions from './user-actions';

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

const createUserSuccess = {
  "id": 100,
  "email": "jeffrey@example.com",
  "city": null,
  "state": null,
  "profession": null,
  "company": null,
  "created_at": "2016-12-30T21:25:23.218Z",
  "image": "https://www.gravatar.com/avatar/299fe3934d30f7ddd172e0dd189c047e",
  "username": "therealdude",
  "stalkers_count": 0
};

describe('user action creators', () => {

  describe('createUser', () => {
    const user = testUser();

    beforeEach(() => {
      fetchMock.post('*', createUserSuccess);
    });

    afterEach(() => fetchMock.restore());

    it('issues a create api token request action', done => {
      const dispatch = sinon.spy();
      actions.createUser(user)(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'CREATE_USER_REQUEST',
          payload: { user }
        })).to.be.true;
        done();
      })
      .catch(done);
    });

    it('makes an api request to create user', done => {
      const dispatch = sinon.spy();
      actions.createUser(user)(dispatch)
      .then(() => {
        expect(fetchMock.lastUrl()).to.match(/users/);
        expect(fetchMock.lastOptions()).to.deep.include({
          method: 'POST',
          body: JSON.stringify({ user }),
        })
        done();
      })
      .catch(done);
    });

    it('issues a create user success action when receiving a successful api response', done => {
      const dispatch = sinon.spy();
      actions.createUser(user)(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'CREATE_USER_SUCCESS',
          payload: {
            user: createUserSuccess,
          },
        })).to.be.true;
        done();
      })
      .catch(done);
    });
  });

  describe('fetchUser', () => {
    const user = testUser({ id: 123 });

    beforeEach(() => {
      fetchMock.get('*', user);
    });

    afterEach(() => fetchMock.restore());

    it('issues a fetch user request action', done => {
      const dispatch = sinon.spy();
      actions.fetchUser(user.username)(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'FETCH_USER_REQUEST',
          payload: { username: user.username },
        })).to.equal(true);
        done();
      })
      .catch(done);
    });

    it('makes an api request to fetch the user', done => {
      const dispatch = sinon.spy();
      actions.fetchUser(user.username)(dispatch)
      .then(() => {
        expect(fetchMock.lastUrl()).to.match(/users\/therealdude/);
        done();
      })
      .catch(done);
    });

    it('issues a fetch user success action when receiving a successful response', done => {
      const dispatch = sinon.spy();
      actions.fetchUser(user.username)(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'FETCH_USER_SUCCESS',
          payload: {
            user,
          },
        })).to.be.true;
        done();
      })
      .catch(done);
    });
  });
});
