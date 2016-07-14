import C from '../../../constants';
import reducer from '../utils';

const initialState = {
  center: {},
  map: {}
};

const reducers = {
  [C.SET_MAP_CENTER]: (state, {payload:{center}}) => (
    Object.assign({}, state, {center})
  ),
  [C.SET_MAP]: (state, {payload:{map}}) => (
    Object.assign({}, state, {map})
  )
};

export default (state = initialState, action) => reducer(state, action, reducers);
