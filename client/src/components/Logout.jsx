import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as authActions from 'Actions/auth-actions';

class Logout extends Component {
  componentWillMount() {
    this.props.logout();
  }

  render() {
    return <Redirect to="/gloats" />
  };
}

export { Logout };
export default connect(undefined, authActions)(Logout);
