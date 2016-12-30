import React from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/Link'
import AppBar from 'material-ui/AppBar';
import AccountButton from 'Components/nav/AccountButton';
import * as authActions from 'Actions/auth-actions';
import './Navbar.css';

const Navbar = ({
  userMenuOpen,
  currentUser,
  toggleUserMenu,
  login,
}) => (
  <AppBar
    title={<Link to="/" className="Navbar--title-link">Gloater</Link>}
    iconElementRight={<AccountButton currentUser={currentUser} login={login} />}
  />
);

const mapStateToProps = state => ({
  userMenuOpen: state.auth.userMenuOpen,
  currentUser: state.auth.currentUser,
});

export { Navbar };
export default connect(mapStateToProps, authActions)(Navbar);
