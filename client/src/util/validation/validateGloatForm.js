import trim from 'lodash.trim';

const validateGloatForm = values => {
  const errors = {};

  if (!trim(values.content)) {
    errors.content = 'Required';
  }

  return errors;
};

export default validateGloatForm;
