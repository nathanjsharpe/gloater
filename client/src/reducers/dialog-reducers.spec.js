import { expect } from 'chai';
import dialogReducers from './dialog-reducers';

const stateBefore = (data = {}) => ({
  newGloatOpen: false,
  ...data,
});

describe('dialogReducers', () => {
  describe('newGloatOpen', () => {
    it('sets to true when new gloat clicked', () => {
      const action = {
        type: 'CLICK_NEW_GLOAT',
      };

      const actual = dialogReducers(stateBefore(), action);
      const expected = {
        newGloatOpen: true,
      };

      expect(actual).to.deep.include(expected);
    });

    it('sets to false when gloat successfully created', () => {
      const action = {
        type: 'CREATE_GLOAT_SUCCESS',
        payload: { gloat: {} },
      };

      const actual = dialogReducers(stateBefore({ newGloatOpen: true }), action);
      const expected = {
        newGloatOpen: false,
      };

      expect(actual).to.deep.include(expected);
    });

    it('sets to false when new gloat closed', () => {
      const action = {
        type: 'CLOSE_NEW_GLOAT',
      };

      const actual = dialogReducers(stateBefore({ newGloatOpen: true }), action);
      const expected = {
        newGloatOpen: false,
      };

      expect(actual).to.deep.include(expected);
    });
  });

  describe('exampleGloat', () => {
    it('sets to an example gloat when new gloat clicked', () => {
      const action = {
        type: 'CLICK_NEW_GLOAT',
      };

      const actual = dialogReducers(stateBefore(), action);

      expect(actual.exampleGloat).to.be.a('string');
    })
  })
});
