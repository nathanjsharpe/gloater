import rootReducer from 'Reducers';
import { createStore } from 'redux';

export default initialState => createStore(rootReducer, initialState);
