import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import * as actions from './user-actions';

const testUser = {
  email: 'jeffrey@example.com',
  city: null,
  state: null,
  profession: null,
  company: null,
  created_at: '2016-12-30T21:25:23.218Z',
  image: 'https://www.gravatar.com/avatar/1fd543d9fb27bd7cc5ada972fe981e48',
  username: 'therealdude',
  stalkers_count: 0
}

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
    beforeEach(() => {
      fetchMock.post('*', createUserSuccess);
    });

    afterEach(() => fetchMock.restore());

    it('issues a create api token request action', done => {
      const dispatch = sinon.spy();
      actions.createUser(testUser)(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'CREATE_USER_REQUEST',
          payload: { user: testUser }
        })).to.be.true;
        done();
      })
      .catch(done);
    });

    it('makes an api request to create user', done => {
      const dispatch = sinon.spy();
      actions.createUser(testUser)(dispatch)
      .then(() => {
        expect(fetchMock.lastUrl()).to.match(/users/);
        expect(fetchMock.lastOptions()).to.deep.include({
          method: 'POST',
          body: JSON.stringify({ user: testUser }),
        })
        done();
      })
      .catch(done);
    });

    it('issues a receive gloats action when receiving a successful api response', done => {
      const dispatch = sinon.spy();
      actions.createUser(testUser)(dispatch)
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

  })
});
