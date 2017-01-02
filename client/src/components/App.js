import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { BrowserRouter, Match, Miss } from 'react-router';
import Login from './Login';
import Signup from './Signup';
import Gloats from 'Components/gloats/Gloats';
import Users from 'Components/users/Users';
import NotFound from './NotFound';
import Navbar from './Navbar';

const App = ({ router }) => (
  <BrowserRouter>
    <div className="App">
      <Navbar />
      <div className="App-content">
        <Match exactly pattern="/" component={Gloats} />

        <Match exactly pattern="/gloats" component={Gloats} />
        <Match pattern="/gloats/:filter" component={Gloats} />

        <Match pattern="/users" component={Users} />}
        {/*<Match pattern="/users/stalked" component={StalkedUsers} />*/}
        {/*<Match pattern="/users/:username" component={UserFeed} />*/}

        <Match exactly pattern="/login" component={Login} />
        <Match exactly pattern="/signup" component={Signup} />

        <Miss component={NotFound} />
      </div>
    </div>
  </BrowserRouter>
);

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({});

export { App };
export default connect(mapStateToProps, mapDispatchToProps)(App);
