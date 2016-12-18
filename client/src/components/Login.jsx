import React from 'react';
import { Field, reduxForm } from 'redux-form';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import TextInput from 'Components/forms/TextInput';
import RaisedButton from 'material-ui/RaisedButton';
import * as authActions from 'Actions/auth-actions';
import validate from 'Util/validation/validateLoginForm';
import './Login.css';

const Login = ({ login, handleSubmit, submitting, error }) => (
  <div className="Login">
    <div className="Login--content">
      <Paper>
        <AppBar
          showMenuIconButton={false}
          title="Login"
        />
        <form
          className="Login--form"
          onSubmit={handleSubmit(data => login(data.email, data.password))}
        >
          {!submitting && error && <p className="Login--error">{error}</p>}
          <Field
            name="email"
            component={TextInput}
            floatingLabelText="Email"
            hintText="person@example.com"
            fullWidth
            autoFocus
            disabled={submitting}
          />
          <Field
            name="password"
            component={TextInput}
            floatingLabelText="Password"
            type="password"
            fullWidth
            disabled={submitting}
          />
          <div className="Login--actions">
            <RaisedButton
              className="Login--button"
              primary
              label="Login"
              type="submit"
              disabled={submitting}
            />
            <RaisedButton
              className="Login--button"
              primary
              label="Sign Up"
              disabled={submitting}
            />
            <RaisedButton
              className="Login--button"
              label="Cancel"
              disabled={submitting}
            />
          </div>
        </form>
      </Paper>
    </div>
  </div>
);

export default compose(
  reduxForm({ form: 'login', validate }),
  connect(undefined, authActions)
)(Login);
