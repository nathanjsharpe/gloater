import React from 'react';
import { connect } from 'react-redux';
import * as authActions from 'Actions/auth-actions';

const Home = ({ login }) => (
  <div>
    <a onClick={() => login('user@example.com', 'password')}>Login</a>
    <p>Hello world</p>
  </div>
);

export default connect(undefined, authActions)(Home);
