import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store';
import createRoot from './components/Root';
import './assets/index.css';


const store = configureStore();
const Root = createRoot(React);

render(
  <Root store={store} />,
  document.getElementById('root')
);