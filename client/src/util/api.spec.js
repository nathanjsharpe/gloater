import { expect } from 'chai';
import api from './api';
import fetchMock from 'fetch-mock';

const baseUrl = 'http://example.com';

describe('api utility', () => {
  describe('.toString', () => {
    it('returns the url at its current state', () => {
      expect(api({ baseUrl }).toString()).to.equal('http://example.com');
    });
  });

  it('defaults to api url defined in environment variable GLOATER_API_URL', () => {
    // test is worthless if GLOATER_API_URL is undefined
    expect(process.env.GLOATER_API_URL).not.to.be.undefined;
    expect(api().toString()).to.equal(process.env.GLOATER_API_URL);
  });

  describe('.gloats', () => {
    it('appends gloats path to current url', () => {
      expect(`${api({ baseUrl }).gloats()}`).to.equal(`${baseUrl}/gloats`);
    });
  });

  describe('.gloat', () => {
    it('appends gloat path and id to current url', () => {
      expect(`${api({ baseUrl }).gloat(123)}`).to.equal(`${baseUrl}/gloats/123`);
    });
  });

  describe('.apiToken', () => {
    it('appends api token path to current url', () => {
      expect(`${api({ baseUrl }).apiToken()}`).to.equal(`${baseUrl}/api_token`);
    });
  });

  describe('.users', () => {
    it('appends users path to url', () => {
      expect(`${api({ baseUrl }).users()}`).to.equal(`${baseUrl}/users`);
    });
  });

  describe('.user', () => {
    it('appends user path and username to current url', () => {
      expect(api({ baseUrl }).user('test_user').toString()).to.equal(`${baseUrl}/users/test_user`);
    });
  });

  it('chains to create more complex urls', () => {
    expect(api({ baseUrl }).user('test_user').gloats().toString()).to.equal(`${baseUrl}/users/test_user/gloats`);
  });

  describe('http methods', () => {
    afterEach(() => fetchMock.restore());

    it('issues get requests to the constructed url and parses json response', done => {
      fetchMock.get('*', [{ id: 123, content: 'testing' }]);
      api({ baseUrl }).gloats().get()
      .then(resp => {
        expect(fetchMock.lastUrl()).to.equal(`${baseUrl}/gloats`);
        expect(resp.length).to.equal(1);
        done();
      })
      .catch(done);
    });

    it('issues post requests with data payload and parses the response', done => {
      fetchMock.post('*', [{ id: 123, content: 'testing' }]);
      api({ baseUrl }).gloats().post({ content: 'testing'})
      .then(resp => {
        expect(fetchMock.lastUrl()).to.equal(`${baseUrl}/gloats`);
        console.log(fetchMock.lastOptions().content);
        expect(resp.length).to.equal(1);
        done();
      })
      .catch(done);
    })
  })
});
