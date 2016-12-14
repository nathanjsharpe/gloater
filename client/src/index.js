import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router';
import App from 'Components/App';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from 'Store/configure-store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore();

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

