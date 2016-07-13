import C from '../../../constants';
import reducer from '../utils';

const initialState = [];

const reducers = {
  [C.ADD_TO_STOPDEX] : (
    state,{payload:{id, name, lat, long}}
  ) => (
    [{id, name, lat, long}, ...state]
  ),
  [C.EDIT_STOPDEX] : (
    state, {payload:{id, name, lat, long}}
  ) => (
    state.map(s => (
      s.id === id ? 
      Object.assign({}, s, {name, lat, long}) : 
      s
    ))
  ),
  [C.DELETE_FROM_STOPDEX] : (state, {payload:{id}}) => (
    state.filter(s => s.id !== id)
  ),
  [C.SET_STOPDEX] : (state, {payload:{stopdex}}) => stopdex.concat(),
};

export default (state = initialState, action) => reducer(state, action, reducers);
