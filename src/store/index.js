import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';

//import { routerMiddleware } from 'react-router-redux';
//import { browserHistory } from 'react-router';
//import githubApp from './reducers';


export default () => {

  //const middlewares = [routerMiddleware(browserHistory), thunk];
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const store = createStore(
    rootReducer, 
    applyMiddleware(...middlewares)
  );

  return store;
}
