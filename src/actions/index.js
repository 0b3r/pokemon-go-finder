import C from '../constants';

export const setGPS = ({ 
  accuracy, 
  altitude, 
  altitudeAccuracy, 
  heading, 
  latitude, 
  longitude, 
  speed
}) => ({
  type: C.SET_GPS, 
  payload: {
    accuracy, 
    altitude, 
    altitudeAccuracy, 
    heading, 
    lat: latitude, 
    long: longitude, 
    speed
  }
});

export const setMapCenter = (lat, long) => (dispatch, getState) => {

  const {map:{map:{map}}} = getState();
  map.setCenter(new google.maps.LatLng(lat, long));
  map.setZoom(C.GOOGLE_MAPS_DEFAULT_ZOOM);
  dispatch({
    type: C.SET_MAP_CENTER, 
    payload: {
      center: {
        lat,
        long
      }
    }
  });
};

export const setMap = (map) => ({
  type: C.SET_MAP, 
  payload: { map }
});