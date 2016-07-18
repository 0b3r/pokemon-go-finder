import C from '../../../constants';
import reducer from '../utils';
import v4 from 'node-uuid';

const initialState = {};

const reducers = {
  [C.SET_POKEMON] : (state, {payload:{pokemon}}) => ({...pokemon}),
};

export default (state = initialState, action) => reducer(state, action, reducers);
