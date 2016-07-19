import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import gps from './gps';
import map from './map';
import feedback from './feedback';
import addLocation from './addLocation';
import locationsInRange from './locationsInRange';
import locationSuggestions from './locationSuggestions';

import pokemon from './pokemon';

export default combineReducers({
  auth,
  gps,
  map,
  feedback,
  addLocation,
  pokemon,
  locationsInRange,
  locationSuggestions,
  routing: routerReducer
});

