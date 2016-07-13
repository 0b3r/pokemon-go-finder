import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import gps from './gps';
import pokedex from './pokedex';
import gymdex from './gymdex';
import stopdex from './stopdex';



export default combineReducers({
  gps,
  pokedex,
  gymdex,
  stopdex,
  routing: routerReducer
});
