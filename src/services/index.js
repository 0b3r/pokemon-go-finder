import * as actions from '../actions';
import C from '../constants';

const dispatchSetGPS = (dispatch, getState, init=false) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(({coords}) => {
      const { radius } = getState().search;
      const { spoof, lat, long } = getState().gps;
      let {latitude, longitude} = coords;
      if(spoof){
        latitude = lat;
        longitude = long;
      } else {
        dispatch(actions.setGPS(coords));
      }
      
      if(init){
        dispatch(actions.initGeoRadius(radius, latitude, longitude));
      } else {
        actions.updateGeo(radius, latitude, longitude);
      }
      
    });
  }
};

export const listenToGPS = (dispatch, getState) => {
  dispatchSetGPS(dispatch, getState, true);
  setInterval(() => dispatchSetGPS(dispatch, getState), C.GPS_REFRESH_RATE);
}


