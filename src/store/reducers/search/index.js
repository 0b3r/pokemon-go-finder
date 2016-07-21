import C from '../../../constants';
import reducer from '../utils';

const initialState = {
  term: '',
  radius: C.RADIUS_SMALL,
  by: C.SEARCH_BY_POKEMON,
  filters: [C.TYPEOF_POKEMON, C.TYPEOF_GYM, C.TYPEOF_POKESTOP]
};

const reducers = {
  [C.SET_SEARCH_TERM]: (state, {payload:{term}}) => ( 
    Object.assign({}, state, {term})
  ),
  [C.SET_SEARCH_RADIUS]: (state, {payload:{radius}}) => (
    Object.assign({}, state, {radius})
  ),
  [C.SET_SEARCH_BY]: (state, {payload:{by}}) => ( 
    Object.assign({}, state, {by, term: ''})
  ),
  [C.SET_SEARCH_FILTERS]: (state, {payload:{filters}}) => ( 
    Object.assign({}, state, {filters: filters.concat()})
  ),
  [C.SET_SEARCH]: (state, {payload:{term, radius, by}}) => ( 
    {
      term,
      radius,
      by
    }
  )
};

export default (state = initialState, action) => reducer(state, action, reducers);
