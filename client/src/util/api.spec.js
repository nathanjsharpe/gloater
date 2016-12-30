import { expect } from 'chai';
import api from './api';
import fetchMock from 'fetch-mock';

const baseUrl = 'http://example.com';

describe('api utility', () => {
  describe('.toString', () => {
    it('returns the url at its current state', () => {
      expect(api(baseUrl).toString()).to.equal('http://example.com');
    });
  });

  it('defaults to api url defined in environment variable GLOATER_API_URL', () => {
    // test is worthless if GLOATER_API_URL is undefined
    expect(process.env.GLOATER_API_URL).not.to.be.undefined;
    expect(api().toString()).to.equal(process.env.GLOATER_API_URL);
  });

  describe('.gloats', () => {
    it('appends gloats path to current url', () => {
      expect(`${api(baseUrl).gloats()}`).to.equal(`${baseUrl}/gloats`);
    });

    it('accepts query parameters and appends them to url', () => {
      expect(`${api(baseUrl).gloats({ sort: 'popularity', stalked: true })}`).to.equal(`${baseUrl}/gloats?sort=popularity&stalked=true`)
    });
  });

  describe('.gloat', () => {
    it('appends gloat path and id to current url', () => {
      expect(`${api(baseUrl).gloat(123)}`).to.equal(`${baseUrl}/gloats/123`);
    });
  });

  describe('.apiToken', () => {
    it('appends api token path to current url', () => {
      expect(`${api(baseUrl).apiToken()}`).to.equal(`${baseUrl}/api_token`);
    });
  });

  describe('.users', () => {
    it('appends users path to url', () => {
      expect(`${api(baseUrl).users()}`).to.equal(`${baseUrl}/users`);
    });
  });

  describe('.user', () => {
    it('appends user path and username to current url', () => {
      expect(api(baseUrl).user('test_user').toString()).to.equal(`${baseUrl}/users/test_user`);
    });
  });

  it('chains to create more complex urls', () => {
    expect(api(baseUrl).user('test_user').gloats().toString()).to.equal(`${baseUrl}/users/test_user/gloats`);
  });

  describe('authorization', () => {
    afterEach(() => fetchMock.restore());

    it('includes current auth token as Authorization header', done => {
      const state = {
        auth: {
          token: 'testapitoken',
        },
      };

      fetchMock.get('*', {});
      api(baseUrl, { state }).gloats().get()
      .then(resp => {
        expect(fetchMock.lastOptions().headers).to.deep.include({
          Authorization: 'testapitoken',
        });
        done();
      })
      .catch(done);
    });
  });


  describe('http methods', () => {
    afterEach(() => fetchMock.restore());

    it('issues get requests to the constructed url, parses json response, and returns parsed body and response', done => {
      fetchMock.get('*', { body: [{ id: 123, content: 'testing' }], headers: { Link: 'testing' } });
      api(baseUrl).gloats().get()
      .then(({ body, response }) => {
        expect(fetchMock.lastUrl()).to.equal(`${baseUrl}/gloats`);
        expect(body.length).to.equal(1);
        expect(response.headers.get('Link')).to.equal('testing');
        done();
      })
      .catch(done);
    });

    it('issues post requests with data payload, parses json response, and returns parsed body and response', done => {
      fetchMock.post('*', [{ id: 123, content: 'testing' }]);
      api(baseUrl).gloats().post({ content: 'testing'})
      .then(({ body, response }) => {
        expect(fetchMock.lastUrl()).to.equal(`${baseUrl}/gloats`);
        expect(body.length).to.equal(1);
        done();
      })
      .catch(done);
    })
  })
});
