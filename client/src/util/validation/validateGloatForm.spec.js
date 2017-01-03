import { expect } from 'chai';
import validateGloatForm from './validateGloatForm';

describe('validateGloatForm', () => {
  it('requires content to be present', () => {
    const expected = { content: 'Required' };
    ['', null, '   '].forEach(content => {
      expect(validateGloatForm({ content })).to.include(expected);
    });
  });
});
