import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect } from 'react-router';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import TextInput from 'Components/forms/TextInput';
import RaisedButton from 'material-ui/RaisedButton';
import * as authActions from 'Actions/auth-actions';
import validate from 'Util/validation/validateSignupForm';
import './Signup.css';

const Signup = ({ currentUser, location, handleSubmit, submitting, error }) => (
  <div className="Signup">
    {currentUser && (
      <Redirect to={location.state || '/gloats'} />
    )}
    <div className="Signup--content">
      <Paper>
        <AppBar
          showMenuIconButton={false}
          title="Signup"
        />
        <form
          className="Signup--form"
          onSubmit={handleSubmit(data => Signup(data.email, data.password))}
        >
          {!submitting && error && <p className="Signup--error">{error}</p>}
          <Field
            name="email"
            component={TextInput}
            type="email"
            floatingLabelText="Email*"
            hintText="person@example.com"
            fullWidth
            autoFocus
            disabled={submitting}
          />
          <Field
            name="password"
            component={TextInput}
            floatingLabelText="Password*"
            type="password"
            fullWidth
            disabled={submitting}
          />
          <Field
            name="passwordConfirmation"
            component={TextInput}
            floatingLabelText="Confirm Password*"
            type="password"
            fullWidth
            disabled={submitting}
          />
          <Field
            name="username"
            component={TextInput}
            floatingLabelText="Username*"
            hintText="example_user"
            fullWidth
            disabled={submitting}
          />
          <Field
            name="name"
            component={TextInput}
            floatingLabelText="Name*"
            hintText="John Smith"
            fullWidth
            disabled={submitting}
          />
          <Field
            name="city"
            component={TextInput}
            floatingLabelText="City"
            hintText="Cincinnati"
            fullWidth
            disabled={submitting}
          />
          <Field
            name="state"
            component={TextInput}
            floatingLabelText="State"
            hintText="OH"
            fullWidth
            disabled={submitting}
          />
          <Field
            name="profession"
            component={TextInput}
            floatingLabelText="Profession"
            hintText="Propane Salesman"
            fullWidth
            disabled={submitting}
          />
          <Field
            name="company"
            component={TextInput}
            floatingLabelText="Company"
            hintText="Initech"
            fullWidth
            disabled={submitting}
          />
          <div className="Signup--actions">
            <RaisedButton
              className="Signup--button"
              primary
              label="Sign Up"
              type="submit"
              disabled={submitting}
            />
            <RaisedButton
              className="Signup--button"
              primary
              label="Log In"
              containerElement={<Link to="/login" />}
              disabled={submitting}
            />
            <RaisedButton
              className="Signup--button"
              label="Cancel"
              disabled={submitting}
            />
          </div>
        </form>
      </Paper>
    </div>
  </div>
);

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

export default compose(
  reduxForm({ form: 'signup', validate }),
  connect(undefined, authActions)
)(Signup);
