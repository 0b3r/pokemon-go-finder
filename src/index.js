import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import * as services from './services';
import configureStore from './store';
import createRoot from './components/Root';
import './assets/index.css';


const store = configureStore();
const Root = createRoot(React);

services.watchGPS(store.dispatch);

render(
  <Root store={store} />,
  document.getElementById('root')
);