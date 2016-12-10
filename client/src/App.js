import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

const App = () => (
  <MuiThemeProvider>
    <div className="App">
      <AppBar title="Gloater" />
    </div>
  </MuiThemeProvider>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
