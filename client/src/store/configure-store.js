import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'Reducers';
import createLogger from 'redux-logger';

const configureStore = initialState => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV === `development`) {
    const logger = createLogger();
    middlewares.push(logger);
  }

  const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));

  return store;
}

export default configureStore;
