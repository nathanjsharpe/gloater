import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import * as actions from './auth-actions';

const loginSuccess = {
  token: 'testapitoken',
  expires_at: '2018-01-16T01:56:47.156Z',
  user: {
    id: 11,
    email: 'user@example.com',
    city: null,
    state: null,
    profession: null,
    company: null,
    created_at: '2016-12-17T01:56:01.593Z',
    image: null,
  }
};

describe('auth action creators', () => {

  describe('login', () => {
    beforeEach(() => {
      fetchMock.post('*', loginSuccess);
    });

    afterEach(() => fetchMock.restore());

    it('issues a create api token request action', done => {
      const dispatch = sinon.spy();
      actions.login('user@example.com', 'password')(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'CREATE_API_TOKEN_REQUEST'
        })).equal(true);
        done();
      })
      .catch(done);
    });

    it('makes an api request to create an api token using the given email and password', done => {
      const dispatch = sinon.spy();
      actions.login('user@example.com', 'password')(dispatch)
      .then(() => {
        expect(fetchMock.lastUrl()).to.match(/api_token/);
        expect(fetchMock.lastOptions()).to.deep.include({
          method: 'POST',
          body: JSON.stringify({ user: { email: 'user@example.com', password: 'password' } }),
        })
        done();
      })
      .catch(done);
    });

    it('issues a create api token success action when receiving a successful api response', done => {
      const dispatch = sinon.spy();
      actions.login('user@example.com', 'password')(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'CREATE_API_TOKEN_SUCCESS',
          payload: {
            token: 'testapitoken',
            expires_at: '2018-01-16T01:56:47.156Z',
            user: {
              id: 11,
              email: 'user@example.com',
              city: null,
              state: null,
              profession: null,
              company: null,
              created_at: '2016-12-17T01:56:01.593Z',
              image: null,
            }
          },
        })).to.equal(true);
        done();
      })
      .catch(done);
    });
  });

  describe('logout', () => {
    beforeEach(() => {
      fetchMock.delete('*', {});
    });

    afterEach(() => fetchMock.restore());

    it('issues a delete api token request action', done => {
      const dispatch = sinon.spy();
      actions.logout()(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'DELETE_API_TOKEN_REQUEST'
        })).to.equal(true);
        done();
      })
      .catch(done);
    });

    it('makes an delete request to api token endpoint', done => {
      const dispatch = sinon.spy();
      actions.logout()(dispatch)
      .then(() => {
        expect(fetchMock.lastUrl()).to.match(/api_token/);
        expect(fetchMock.lastOptions()).to.have.property('method', 'DELETE');
        done();
      })
      .catch(done);
    });

    it('issues a receive gloats action when receiving a successful api response', done => {
      const dispatch = sinon.spy();
      actions.logout()(dispatch)
      .then(() => {
        expect(dispatch.calledWith({
          type: 'DELETE_API_TOKEN_SUCCESS',
        })).to.equal(true);
        done();
      })
      .catch(done);
    });
  });
});
