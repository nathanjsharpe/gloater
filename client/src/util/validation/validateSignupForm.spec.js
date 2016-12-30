import { expect } from 'chai';
import validateSignupForm from './validateSignupForm';

describe('validateSignupForm', () => {
  it('requires email to be present', () => {
    const expected = { email: 'Required' };
    ['', null, '   '].forEach(email => {
      expect(validateSignupForm({ email })).to.include(expected);
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
      expect(validateSignupForm({ email })).to.include(expected);
    });

    validEmails.forEach(email => {
      expect(validateSignupForm({ email })).to.not.have.property('email');
    });
  })

  it('requires password to be present', () => {
    const expected = { password: 'Required' };
    ['', null, '   '].forEach(password => {
      expect(validateSignupForm({ password })).to.include(expected);
    });
  });

  it('requires password confirmation to match password', () => {
    const expected = { passwordConfirmation: 'Must match password' };
    expect(validateSignupForm({
      password: 'password',
      passwordConfirmation: 'notpassword'
    })).to.include(expected);
  });

  it('requires username to be present', () => {
    const expected = { username: 'Required' };
    ['', null, '   '].forEach(username => {
      expect(validateSignupForm({ username })).to.include(expected);
    });
  });

  it('requires username to be present', () => {
    const expected = { name: 'Required' };
    ['', null, '   '].forEach(name => {
      expect(validateSignupForm({ name })).to.include(expected);
    });
  });
});
