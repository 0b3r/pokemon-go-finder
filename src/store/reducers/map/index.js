import C from '../../../constants';
import reducer from '../utils';

const initialState = {
  center: {},
  map: {}
};

// const reducers = {
//   [C.ADD_TO_GYMDEX] : (
//     state,{payload:{id, name, lat, long, owner}}
//   ) => (
//     [{id, name, lat, long, owner}, ...state]
//   ),
//   [C.EDIT_GYMDEX] : (
//     state, {payload:{id, name, lat, long, owner}}
//   ) => (
//     state.map(g => (
//       g.id === id ? 
//       Object.assign({}, g, {name, lat, long, owner}) : 
//       g
//     ))
//   ),
//   [C.DELETE_FROM_GYMDEX] : (state, {payload:{id}}) => (
//     state.filter(g => g.id !== id)
//   ),
//   [C.SET_GYMDEX] : (state, {payload:{gymdex}}) => gymdex.concat(),
// };

const reducers = {
  [C.SET_MAP_CENTER]: (state, {payload:{center}}) => (
    Object.assign({}, state, {center})
  ),
  [C.SET_MAP]: (state, {payload:{map}}) => (
    Object.assign({}, state, {map})
  )
};

export default (state = initialState, action) => reducer(state, action, reducers);
