import { expect } from 'chai';
import getPageLinks from './getPageLinks';
import sinon from 'sinon';

const makeResponse = linkHeader => ({
  headers: {
    get: sinon.stub().withArgs('Link').returns(linkHeader),
  }
});

describe('getPageLinks', () => {
  it('returns an object with prev, next, first, and last keys', () => {
    expect(getPageLinks(makeResponse(''))).to.include.keys('prev', 'next', 'first', 'last');
  });

  it('extracts first link', () => {
    const resp = makeResponse('<http://localhost:3000/gloats?page=21> rel="next"; <http://localhost:3000/gloats?page=40> rel="last"; <http://localhost:3000/gloats?page=1> rel="first"');
    const actual = getPageLinks(resp);
    expect(actual).to.include.property('first', 'http://localhost:3000/gloats?page=1');
  });

  it('extracts last link', () => {
    const resp = makeResponse('<http://localhost:3000/gloats?page=21> rel="next"; <http://localhost:3000/gloats?page=40> rel="last"; <http://localhost:3000/gloats?page=1> rel="first"');
    const actual = getPageLinks(resp);
    expect(actual).to.include.property('last', 'http://localhost:3000/gloats?page=40');
  });

  it('extracts next link', () => {
    const resp = makeResponse('<http://localhost:3000/gloats?page=21> rel="next"; <http://localhost:3000/gloats?page=40> rel="last"; <http://localhost:3000/gloats?page=1> rel="first"');
    const actual = getPageLinks(resp);
    expect(actual).to.include.property('next', 'http://localhost:3000/gloats?page=21');
  });

  it('extracts prev link', () => {
    const resp = makeResponse('<http://localhost:3000/gloats?page=21> rel="next"; <http://localhost:3000/gloats?page=19> rel="prev"; <http://localhost:3000/gloats?page=40> rel="last"; <http://localhost:3000/gloats?page=1> rel="first"');
    const actual = getPageLinks(resp);
    expect(actual).to.include.property('prev', 'http://localhost:3000/gloats?page=19');
  });

  it('sets key to null if that link is not present in header', () => {
    const resp = makeResponse('<http://localhost:3000/gloats?page=21> rel="next"; <http://localhost:3000/gloats?page=40> rel="last"; <http://localhost:3000/gloats?page=1> rel="first"');
    const actual = getPageLinks(resp);
    expect(actual).to.include.property('prev', null);
  })
})
