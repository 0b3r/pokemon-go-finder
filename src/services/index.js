import * as actions from '../actions';
import C from '../constants';

const dispatchSetGPS = (dispatch, init=false) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(({coords}) => {
      const {latitude, longitude} = coords;
      dispatch(actions.setGPS(coords));
      if(init){
        dispatch(actions.initGeoRadius(10, latitude, longitude));
      } else {
        actions.updateGeoRadius(10, latitude, longitude);
      }
      
    });
  }
};

export const listenToGPS = (dispatch) => {
  dispatchSetGPS(dispatch, true);
  setInterval(() => dispatchSetGPS(dispatch), C.GPS_REFRESH_RATE);
}


