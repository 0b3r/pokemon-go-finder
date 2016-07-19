import path from './path';
import map from './map';
import gps from './gps';
import locationsInRange from './locationsInRange';
import firebase from './firebase';
import auth from './auth';
import feedback from './feedback';
import addLocation from './addLocation';
import colors from './colors';
import locationSuggestions from './locationSuggestions';

export default Object.assign({},
  path,
  map,
  gps,
  firebase,
  auth,
  feedback,
  addLocation, 
  locationsInRange,
  locationSuggestions,
  colors
);