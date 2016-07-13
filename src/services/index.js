import * as actions from '../actions';
import C from '../constants';

const dispatchSetGPS = (dispatch) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(({coords}) => (
      dispatch(actions.setGPS(coords))
    ));
  }
};

export const watchGPS = (dispatch) => {
  dispatchSetGPS(dispatch);
  setInterval(() => dispatchSetGPS(dispatch), C.GPS_REFRESH_RATE);
}

