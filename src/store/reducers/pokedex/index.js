import C from '../../../constants';
import reducer from '../utils';

const initialState = [];

const reducers = {
  [C.ADD_TO_POKEDEX] : (
    state,{payload:{id, name, type, lat, long, level}}
  ) => (
    [{id, name, type, level, lat, long}, ...state]
  ),
  [C.EDIT_POKEDEX] : (
    state, {payload:{id, name, type, lat, long, level}}
  ) => (
    state.map(p => (
      p.id === id ? 
      Object.assign({}, p, {name, type, level, lat, long}) : 
      p
    ))
  ),
  [C.DELETE_FROM_POKEDEX] : (state, {payload:{id}}) => (
    state.filter(p => p.id !== id)
  ),
  [C.SET_POKEDEX] : (state, {payload:{pokedex}}) => pokedex.concat(),
};

export default (state = initialState, action) => reducer(state, action, reducers);
