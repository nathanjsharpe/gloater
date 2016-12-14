import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { BrowserRouter, Match, Miss, Link } from 'react-router';
import Home from './Home';
import Gloats from 'Components/gloats/Gloats';
import NotFound from './NotFound';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <AppBar title="Gloater" />
      <ul>
        <li><Link to="/">Home</Link></li>
      </ul>
      <Match exactly pattern="/" component={Home} />
      <Match exactly pattern="/gloats" component={Gloats} />
      <Miss component={NotFound} />
    </div>
  </BrowserRouter>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export { App };
export default connect(mapStateToProps, mapDispatchToProps)(App);
