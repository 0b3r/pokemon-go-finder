import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import gps from './gps';
import pokedex from './pokedex';
import gymdex from './gymdex';
import stopdex from './stopdex';
import map from './map';
import feedback from './feedback';



export default combineReducers({
  auth,
  gps,
  map,
  pokedex,
  gymdex,
  stopdex,
  feedback,
  routing: routerReducer
});
