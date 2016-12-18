import { expect } from 'chai';
import validateLoginForm from './validateLoginForm';

describe('validateLoginForm', () => {
  it('requires email to be present', () => {
    const expected = { email: 'Required' };
    ['', null, '   '].forEach(email => {
      expect(validateLoginForm({ email })).to.include(expected);
    });
  });

  it('requires email to be valid format', () => {
    const expected = { email: 'Must be valid email address' };
    const invalidEmails = [
      'user',
      'userexample.com',
      '@example.com',
      ' @ ',
      ' @example.com'
    ];

    const validEmails = [
      'user@example.com',
      'user@example',
      'user.test@example.com',
      'user+test@example.com'
    ];

    invalidEmails.forEach(email => {
      expect(validateLoginForm({ email })).to.include(expected);
    });

    validEmails.forEach(email => {
      expect(validateLoginForm({ email })).to.not.have.property('email');
    });
  })

  it('requires password to be present', () => {
    const expected = { password: 'Required' };
    ['', null, '   '].forEach(password => {
      expect(validateLoginForm({ password })).to.include(expected);
    });
  });
});
