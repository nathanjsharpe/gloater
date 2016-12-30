import React from 'react';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

const AccountButton = ({ currentUser, login }) =>
  currentUser ?
  (
    <div className="navbar-user">
      <Avatar src={currentUser.image} />
      {currentUser.username}
    </div>
  ) :
 (
    <div>
      <FlatButton
        containerElement={<Link to="/login" />}
        className="navbar-login-button"
        label="Login"
        style={{ color: '#fff' }}
      />
      <FlatButton
        containerElement={<Link to="/signup" />}
        className="navbar-signup-button"
        label="Sign Up"
        style={{ color: '#fff' }}
      />
    </div>
  );

export default AccountButton;
