import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { BrowserRouter, Match, Miss } from 'react-router';
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import Gloats from 'Components/gloats/Gloats';
import NewGloatButton from 'Components/gloats/NewGloatButton';
import NewGloatDialog from 'Components/gloats/NewGloatDialog';
import User from 'Components/users/User';
import NotFound from './NotFound';
import Navbar from './Navbar';

const App = ({ router, currentUser, newGloatOpen }) => (
  <BrowserRouter>
    <div className="App">
      <Navbar />
      {currentUser && !newGloatOpen && <NewGloatButton />}
      {currentUser && newGloatOpen && <NewGloatDialog />}
      <div className="App-content">
        <Match exactly pattern="/" component={Gloats} />

        <Match exactly pattern="/gloats" component={Gloats} />
        <Match pattern="/gloats/:filter" component={Gloats} />

        <Match pattern="/users/:username" component={User} />

        <Match exactly pattern="/login" component={Login} />
        <Match exactly pattern="/signup" component={Signup} />
        <Match exactly pattern="/logout" component={Logout} />

        <Miss component={NotFound} />
      </div>
    </div>
  </BrowserRouter>
);

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  newGloatOpen: state.dialog.newGloatOpen,
});

const mapDispatchToProps = dispatch => ({});

export { App };
export default connect(mapStateToProps, mapDispatchToProps)(App);
