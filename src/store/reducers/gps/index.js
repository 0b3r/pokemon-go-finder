import { combineReducers } from 'redux';
import location from '../location';
import C from '../../../constants';
import reducer from '../utils';


const headingReducers = {
  [C.SET_GPS] : (state, {payload:{heading}}) => heading
};

const altitudeReducers = {
  [C.SET_GPS] : (state, {payload:{altitude}}) => altitude
};

const heading = (state = '', action) => reducer(state, action, headingReducers);
const altitude = (state = '', action) => reducer(state, action, altitudeReducers);


export default combineReducers({
  location,
  heading,
  altitude
})