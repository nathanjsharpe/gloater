import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { BrowserRouter, Match, Miss } from 'react-router';
import Home from './Home';
import Login from './Login';
import Gloats from 'Components/gloats/Gloats';
import NotFound from './NotFound';
import Navbar from './Navbar';

const App = ({ router }) => (
  <BrowserRouter>
    <div className="App">
      <Navbar router={router} />
      <div className="App-content">
        <Match exactly pattern="/" component={Gloats} />

        <Match pattern="/gloats" component={Gloats} />
        {/*<Match pattern="/gloats/recent" component={RecentGloats} />*/}
        {/*<Match pattern="/gloats/popular" component={PopularGloats} />*/}
        {/*<Match pattern="/gloats/admired" component={AdmiredGloats} />*/}
        {/*<Match pattern="/gloats/stalked" component={StalkedGloats} />*/}

        {/*<Match pattern="/users" component={PopularUsers} />*/}
        {/*<Match pattern="/users/stalked" component={StalkedUsers} />*/}
        {/*<Match pattern="/users/:username" component={UserFeed} />*/}

        <Match exactly pattern="/login" component={Login} />
        {/*<Match exactly pattern="/signup" component={Signup} />*/}

        <Miss component={NotFound} />
      </div>
    </div>
  </BrowserRouter>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export { App };
export default connect(mapStateToProps, mapDispatchToProps)(App);
