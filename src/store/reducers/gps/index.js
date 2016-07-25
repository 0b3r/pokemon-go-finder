import { combineReducers } from 'redux';
import C from '../../../constants';
import reducer from '../utils';

const initalState = {
  init: false,
  defaultZoom: C.GOOGLE_MAPS_DEFAULT_ZOOM
};

const reducers = {
  [C.SET_GPS] : (state, {payload:{
    accuracy,
    altitude,
    altitudeAccuracy,
    heading,
    lat,
    long,
    speed, 
    spoof
  }}) => (
  Object.assign({}, state,
    {
      accuracy,
      altitude,
      altitudeAccuracy,
      heading,
      lat,
      long,
      speed,
      init: true,
      spoof
    }
  ))
};

export default (state = initalState, action) => (
  reducer(state, action, reducers)
);
