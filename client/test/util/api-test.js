import { expect } from 'chai';
import api from 'Util/api';

const baseUrl = 'http://example.com';

describe('api utility', () => {
  describe('.toString', () => {
    it('returns the url at its current state', () => {
      expect(api({ baseUrl }).toString()).to.equal('http://example.com');
    });
  });

  describe('.gloats', () => {
    it('appends gloats path to current url', () => {
      expect(api({ baseUrl }).gloats().toString()).to.equal(`${baseUrl}/gloats`);
    });
  });

  describe('.gloat', () => {
    it('appends gloat path and id to current url', () => {
      expect(api({ baseUrl }).gloat(123).toString()).to.equal(`${baseUrl}/gloats/123`);
    });
  });

  describe('.users', () => {
    it('appends users path to url', () => {
      expect(api({ baseUrl }).users()).to.equal(`${baseUrl}/users`);
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
});
