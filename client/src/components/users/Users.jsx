import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from 'Actions/user-actions';
import './Users.css';

class Users extends Component {
  componentWillMount() {
    const { fetchUsers } = this.props;

    fetchUsers();
  }

  render() {
    const { users } = this.props;

    return (
      <div>
        {users}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  users: [],
});

export { Users };
export default connect(mapStateToProps, userActions)(Users);
