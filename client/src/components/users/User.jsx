import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import * as userActions from 'Actions/user-actions';
import UserCard from './UserCard';
import AppBar from 'material-ui/AppBar';
import GloatList from 'Components/gloats/GloatList';
import './User.css';

class User extends Component {
  componentWillMount() {
    const { fetchUser, params } = this.props;

    fetchUser(params.username);
  }

  render() {
    const { user, loading } = this.props;

    return loading ? (
      <CircularProgress style={{ width: '100%', textAlign: 'center', padding: '1em' }} />
    ) : (
      <div className="User">
        <div className="User--profile">
          <UserCard user={user} />
        </div>
        <div className="User--gloats">
          <AppBar
            showMenuIconButton={false}
            title={`${user.gloats.length} Gloats`}
          />
          <GloatList
            filter="user"
            loading={loading}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  loading: state.user.loading,
});

export { User };
export default connect(mapStateToProps, userActions)(User);
