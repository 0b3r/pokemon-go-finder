import { combineReducers } from 'redux';
import C from '../../../constants';
import reducer from '../utils';

const initalState = {
  init: false
};

const reducers = {
  [C.SET_GPS] : (state, {payload:{
    accuracy,
    altitude,
    altitudeAccuracy,
    heading,
    lat,
    long,
    speed
  }}) => (
  Object.assign({}, 
    {
      accuracy,
      altitude,
      altitudeAccuracy,
      heading,
      lat,
      long,
      speed,
      init: true
    }
  ))
};

export default (state = initalState, action) => (
  reducer(state, action, reducers)
);
