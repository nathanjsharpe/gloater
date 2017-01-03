import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'Reducers';
import createLogger from 'redux-logger';
import admireMiddleware from 'Middleware/admireMiddleware';
import userGloatsMiddleware from 'Middleware/userGloatsMiddleware';

const configureStore = initialState => {
  const middlewares = [thunk, admireMiddleware, userGloatsMiddleware];

  if (process.env.NODE_ENV === `development`) {
    const logger = createLogger();
    middlewares.push(logger);
  }

  const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));

  return store;
}

export default configureStore;
