import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import gps from './gps';
import pokedex from './pokedex';
import gymdex from './gymdex';
import stopdex from './stopdex';
import map from './map';



export default combineReducers({
  gps,
  map,
  pokedex,
  gymdex,
  stopdex,
  routing: routerReducer
});
