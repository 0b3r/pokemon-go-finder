import C from '../../../constants';
import reducer from '../utils';

const initialState = {
  user: null,
  status: C.AUTH_ANONYMOUS,
};

const guestWithStatus = (status, username) => ({
  status, 
  user:{
    displayName: username
  }
});

const reducers = {
  [C.AUTH_OPEN]: (state, action) => ( 
    guestWithStatus(C.AUTH_AWAITING_RESPONSE, C.AUTH_GUEST_USERNAME)
  ),
  [C.AUTH_LOGIN]: (state, {payload:{user}}) => ({
    status: C.AUTH_LOGGED_IN,
    user
  }),
  [C.AUTH_LOGOUT]: (state, action) => ( 
    guestWithStatus(C.AUTH_ANONYMOUS, C.AUTH_GUEST_USERNAME)
  )
};

export default (state = initialState, action) => reducer(state, action, reducers);
