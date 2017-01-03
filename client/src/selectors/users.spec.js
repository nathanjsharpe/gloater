import { expect } from 'chai';
import {
  getGloatsByFilter,
  getNextPageLinkByFilter,
} from './gloats';

const testState = {
  byFilter: {
    recent: {
      ids: [2, 1, 3],
      links: {
        next: 'http://example.com/gloats?page=2',
      }
    },
    popular: {
      ids: [1, 3],
    },
  },
  byId: {
    '1': { id: 1, content: 'testGloat1' },
    '2': { id: 2, content: 'testGloat2' },
    '3': { id: 3, content: 'testGloat3' },
  },
};

describe('gloat selectors', () => {
  describe('getGloatsByFilter', () => {
    it('returns gloat objects based on ids in state for current filter', () => {
      const actual = getGloatsByFilter(testState, 'recent');
      const expected = [
        { id: 2, content: 'testGloat2' },
        { id: 1, content: 'testGloat1' },
        { id: 3, content: 'testGloat3' },
      ];

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('getNextPageLinkByFilter', () => {
    it('returns next page link for specified filter', () => {
      const actual = getNextPageLinkByFilter(testState, 'recent');
      const expected = 'http://example.com/gloats?page=2';
      expect(actual).to.equal(expected);
    })
  })
});
