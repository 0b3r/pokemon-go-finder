import C from '../../../constants';
import reducer from '../utils';

// const initialState = {
//   active: true,
//   addState: 'ADD_LOCATION_TO_MAP',
//   pokemon: {
//     index: 5
//   },
//   lat: null,
//   long: null
// };

const initialState = {
  active: false,
  // addState: 'ADD_LOCATION_START'
};

const reducers = {
  [C.ADD_LOCATION_OPEN]: (state, {payload}) => (
    //payload contains addState
    Object.assign({}, state, {active: !state.active, ...payload})
  ),
  [C.ADD_LOCATION_CLOSE]: (state) => ({
    active: false
  }),
  [C.UPDATE_ADD_LOCATION_STATE]: (state, {payload}) => (
    //payload contains addState
    Object.assign({}, state, {...payload})
  ),
  [C.ADD_POKEMON]: (state, {payload:{pokemon}}) => (
    Object.assign({}, state, {pokemon})
  ),
  [C.ADD_GYM]: (state, {payload:{gym}}) => (
    Object.assign({}, state, {gym})
  ),
  [C.ADD_POKESTOP]: (state, {payload:{pokestop}}) => (
    Object.assign({}, state, {pokestop})
  ),
  [C.ADD_LOCATION_LATLNG]: (state, {payload:{lat, long}}) => (
    Object.assign({}, state, {lat, long})
  )
  

};

export default (state = initialState, action) => reducer(state, action, reducers);
