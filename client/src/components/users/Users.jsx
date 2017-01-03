import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from 'Actions/user-actions';
import './Users.css';

class Users extends Component {
  componentWillMount() {
    const { fetchUsers, params } = this.props;

    fetchUsers(params.filter || 'recent');
  }

  render() {
    return (
      <div />
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

export { Users };
export default connect(mapStateToProps, userActions)(Users);
