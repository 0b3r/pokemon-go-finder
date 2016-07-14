import C from '../../../constants';
import reducer from '../utils';

const initialState = [];

const reducers = {
  [C.FEEDBACK_DISMISS]: (state, {payload:{id}}) => ( 
    state.filter((item, index) => index !== id)
  ),
  [C.FEEDBACK_DISPLAY_ERROR]: (state, {payload:{code, message}}) => (
    state.concat({ 
      message, 
      code, 
      error: true 
    })
  ),
  [C.FEEDBACK_DISPLAY_MESSAGE]: (state, {payload:{message}}) => ( 
    state.concat({ 
      message, 
      code, 
      error: false 
    })
  )
};

export default (state = initialState, action) => reducer(state, action, reducers);
