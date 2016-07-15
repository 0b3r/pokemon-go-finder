import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import * as services from './services';
import * as actions from './actions';
import configureStore from './store';
import createRoot from './components/Root';
import './assets/index.css';
import './assets/pokemon.css';


const store = configureStore();
const Root = createRoot(React);

store.dispatch(actions.listenToAuth());

services.listenToGPS(store.dispatch);
render(
  <Root store={store} />,
  document.getElementById('root')
);