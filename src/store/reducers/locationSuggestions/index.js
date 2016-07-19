import C from '../../../constants';
import reducer from '../utils';

const initialState = ['Current Location'];

const reducers = {
  [C.SET_LOCATION_SUGGESTIONS] : (state, {payload:{suggestions}}) => (
    ['Current Location'].concat(suggestions)
  ),
};

export default (state = initialState, action) => reducer(state, action, reducers);
