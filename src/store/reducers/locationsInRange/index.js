import C from '../../../constants';
import reducer from '../utils';

// const initialState = [
// {
//   id: v4(),
//   index: 15,
//   name: 'Pigey',
//   type: ['Flying'],
//   level: 0,
//   lat: 49.6759288,
//   long: -112.796530
// }
// ];

const initialState = {};

const reducers = {
  [C.ADD_IN_RANGE] : (state,{payload}) => (
    Object.assign({}, state, {...payload})
  ),
  [C.REMOVE_IN_RANGE] : (state,{payload:key}) => {
    const newState = Object.assign({}, state);
    delete newState[key.key];
    return newState
  }
};

export default (state = initialState, action) => reducer(state, action, reducers);
