import C from '../../../constants';
import reducer from '../utils';

const initialState = {
  active: true,
  addType: null,
  pokemon: null,
  gym: null,
  pokestop: null,
  lat: null,
  long: null
};

const reducers = {
  [C.ADD_LOCATION_TOGGLE]: ({active}) => (
    Object.assign({}, state, {active: !active})
  ),
  [C.INITIALIZE_ADD]: (state, {payload:{addType}}) => (
    Object.assign({}, state, {addType})
  ),
  [C.ADD_POKEMON]: (state, {payload:{pokemon}}) => (
    Object.assign({}, state, {addType})
  ),
  [C.ADD_GYM]: (state, {payload:{gym}}) => (
    Object.assign({}, state, {gym})
  ),
  [C.ADD_POKESTOP]: (state, {payload:{pokestop}}) => (
    Object.assign({}, state, {pokestop})
  ),
  [C.ADD_LOCATION_LATLNG]: (state, {payload:{lat, long}}) => (
    Object.assign({}, state, {lat, long})
  ),
  [C.ADD_LOCATION_RESET]: (state) => ({
    active: true,
    addType: null,
    pokemon: null,
    gym: null,
    pokestop: null,
    lat: null,
    long: null
  }),

};

export default (state = initialState, action) => reducer(state, action, reducers);
