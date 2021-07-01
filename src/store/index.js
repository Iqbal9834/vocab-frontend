import { createStore, applyMiddleware } from 'redux';
//import thunkMiddleware to use async function
import thunkMiddleware from 'redux-thunk';
//import rootReducer from store
import rootReducer from './rootReducer';
//import logger to log actions and reducer in console
import logger from 'redux-logger';
// import redux-dev-tools extension to view state in browser
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
