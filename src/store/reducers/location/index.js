import C from '../../../constants';
import reducer from '../utils';

const initialState = {
  lat: null,
  long: null
};

const reducers = {
  [C.SET_GPS] : (state, {payload:{lat, long}}) => (
    Object.assign({}, {lat, long})
  )
};

export default (state = initialState, action) => reducer(state, action, reducers);