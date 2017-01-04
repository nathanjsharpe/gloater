import React from 'react';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import './AccountButton.css';

const AccountButton = ({ currentUser, login }) =>
  currentUser ?
  (
    <div className="AccountButton--user">
      <Avatar src={currentUser.image} />
      <div className="AccountButton--text">
        {currentUser.username}<br/>
        <Link to="/logout">Log out</Link>
      </div>
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
