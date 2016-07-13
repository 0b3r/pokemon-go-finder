import { combineReducers } from 'redux';
import C from '../../../constants';
import reducer from '../utils';

const initalState = {}

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
      speed
    }
  ))
};

export default (state = initalState, action) => (
  reducer(state, action, reducers)
);
