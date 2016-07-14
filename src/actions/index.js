import C from '../constants';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: C.FIREBASE_API_KEY,
  authDomain: C.FIREBASE_AUTH_DOMAIN,
  databaseURL: C.FIREBASE_DATABASE_URL,
  storageBucket: C.FIREBASE_STORAGE_BUCKET,
};

firebase.initializeApp(firebaseConfig);

const providers = {
  [C.AUTH_FACEBOOK_PROVIDER]: () => new firebase.auth.FacebookAuthProvider(),
  [C.AUTH_GOOGLE_PROVIDER]: () => new firebase.auth.GoogleAuthProvider(),
  [C.AUTH_TWITTER_PROVIDER]: () => new firebase.auth.TwitterAuthProvider(),
};

const database = firebase.database();

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

export const listenToAuth = () => (dispatch, getState) => {
  dispatch({ type: C.AUTH_OPEN });
  firebase.auth().onAuthStateChanged(user => {
    if (user){ 
      dispatch({
        type: C.AUTH_LOGIN,
        payload: {
          user
        }
      });
    } else {
      if (getState().auth.status !== C.AUTH_ANONYMOUS) {
        dispatch({ type: C.AUTH_LOGOUT });
      }
    }
  });
};

export const openAuth = (platform) => {
  const createProvider = providers[platform];
  const provider = createProvider();
  return (dispatch) => {
    dispatch({ type: C.AUTH_OPEN });
    firebase.auth().signInWithPopup(provider).then(
      ({ user }) => {
        dispatch({
          type: C.AUTH_LOGIN,
          payload: {
            user
          }
        });
      }).catch(
        ({ code, message }) => {
          dispatch({ 
            type: C.FEEDBACK_DISPLAY_ERROR, 
            payload: {
              code,
              message
            }
          });
          dispatch({ type: C.AUTH_LOGOUT });
      });
  }
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: C.AUTH_LOGOUT });
    firebase.auth().signOut().then(function() {
      const message = 'You have been logged out successfully';
      const code = null;
      dispatch({ 
        type: C.FEEDBACK_DISPLAY_MESSAGE, 
        payload: {
          message,
          code
        }
      });
    }, function(error) {
      const message = 'Something went wrong while logging you out';
      const code = '10000';
      dispatch({ 
        type: C.FEEDBACK_DISPLAY_ERROR, 
        payload: {
          code,
          message
        }
      });
    });
  };
};