import trim from 'lodash.trim';

const EMAILREGEX = /^\S+@\S+$/i;

const validateLoginForm = values => {
  const errors = {};

  if (!trim(values.email)) {
    errors.email = 'Required';
  } else if (!EMAILREGEX.test(values.email)) {
    errors.email = 'Must be valid email address';
  }

  if (!trim(values.password)) {
    errors.password = 'Required';
  }

  return errors;
};

export default validateLoginForm;
