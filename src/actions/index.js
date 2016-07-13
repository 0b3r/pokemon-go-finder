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