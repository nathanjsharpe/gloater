import React from 'react';
import TextField from 'material-ui/TextField';

const TextInput = ({
 input: { value, onChange },
 meta: { touched, error },
 ...rest
}) => (
  <TextField
    value={value}
    onChange={onChange}
    errorText={touched && error}
    {...rest}
  />
);

export default TextInput;
