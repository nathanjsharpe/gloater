import { expect } from 'chai';
import getGloatQueryParamsForFilter from './getGloatQueryParamsForFilter';

describe('getGloatQueryParamsForFilter', () => {
  it('returns empty object for recent', () => {
    expect(getGloatQueryParamsForFilter('recent')).to.deep.equal({});
  });

  it('returns proper params for popular', () => {
    const expected = { sort: 'popularity' };
    expect(getGloatQueryParamsForFilter('popular')).to.deep.equal(expected);
  });

  it('returns proper params for stalked', () => {
    const expected = { stalked: true };
    expect(getGloatQueryParamsForFilter('stalked')).to.deep.equal(expected);
  });

  it('returns proper params for admired', () => {
    const expected = { admired: true };
    expect(getGloatQueryParamsForFilter('admired')).to.deep.equal(expected);
  });
})
