import React from 'react';
import { render } from 'react-dom';
import App from 'Components/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from 'Store/configure-store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const store = configureStore();

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

