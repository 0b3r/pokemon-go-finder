import C from '../constants';
import firebase from 'firebase';
import GeoFire from 'geofire';
import pokedex from '../services/pokedexMap';

const firebaseConfig = {
  apiKey: C.FIREBASE_API_KEY,
  authDomain: C.FIREBASE_AUTH_DOMAIN,
  databaseURL: C.FIREBASE_DATABASE_URL,
  storageBucket: C.FIREBASE_STORAGE_BUCKET,
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const pokemonRef = database.ref('pokemon');
const locationsRef = database.ref('locations');
const locationInfoRef = database.ref('locationInfo');
const locationsGeo = new GeoFire(locationsRef);

let geoQuery;

const providers = {
  [C.AUTH_FACEBOOK_PROVIDER]: () => new firebase.auth.FacebookAuthProvider(),
  [C.AUTH_GOOGLE_PROVIDER]: () => new firebase.auth.GoogleAuthProvider(),
  [C.AUTH_TWITTER_PROVIDER]: () => new firebase.auth.TwitterAuthProvider(),
};



export const getPokemon = () => (dispatch) => {
  database.ref('pokemon').once('value').then(function(snapshot) {
    dispatch({ 
      type: C.SET_POKEMON, 
      payload: {
        pokemon: snapshot.val() 
      }
    });
  });
};

export const initGeoRadius = (radius, lat, long) => (dispatch) => {
  geoQuery = locationsGeo.query({
    center: [lat,long],
    radius
  });

  geoQuery.on("key_entered", function(key, [lat, long]) {
    locationInfoRef.child(key).on('value', function(snapshot){
      const item = {
        [key]: Object.assign({}, {lat, long}, snapshot.val())
      };
      dispatch({type:C.ADD_IN_RANGE, payload: item});
    });
  });
};

export const updateGeoRadius = (radius, lat, long) => {
  geoQuery.updateCriteria({
    center: [lat,long],
    radius
  });
};


export const saveLocation = (type, uid, lat, long, id = null) => {

  const locationKey = locationsRef.push().key;
  locationsGeo.set(locationKey, [lat, long]).then(
    () => {
      locationInfoRef.child(locationKey).set({
        id,
        type,
        uid
      });
    }, 
    (error) => {
      console.log(error);
    }
  );

}


// export const testFirebaseDB = () => {

//   pokedex.forEach((p,i) => {
//     // console.log(i, p);

//     const pokemonData = {
//       index: i,
//       name: p.name,
//       type: {}
//     };

//     p.type.forEach((t, v) => {
//       pokemonData.type[t.toLowerCase()] = true;
//     });

//     const newPokeKey = firebase.database().ref().child('pokemon').push().key;

//     firebase.database().ref('pokemon/' + newPokeKey).set(pokemonData);
//   });
  
// }

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
  provider.addScope('email');
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

export const openAddLocation = () => (
  {
    type:C.ADD_LOCATION_OPEN,
    payload: {
      addState: C.ADD_LOCATION_START
    }
  }
);
export const closeAddLocation = () => (
  {
    type:C.ADD_LOCATION_CLOSE,
    payload: {
      addState: C.ADD_LOCATION_START
    }
  }
);

export const setAddLocationState = (addState) => ({
  type: C.UPDATE_ADD_LOCATION_STATE,
  payload: { addState }
});

export const setAddLocationSubmit = () => (dispatch, getState) => {

  const {lat, long, ...state} = getState().addLocation;
  const {user} = getState().auth;

  if(state.pokemon){
    saveLocation(C.TYPEOF_POKEMON, user.uid, lat, long, state.pokemon.id);
  } 
  else if(state.gym){
    saveLocation(C.TYPEOF_GYM, user.uid, lat, long);
  }
  else if(state.pokestop){
    saveLocation(C.TYPEOF_POKESTOP, user.uid, lat, long);
  }

  dispatch({
    type: C.UPDATE_ADD_LOCATION_STATE,
    payload: { addState: C.ADD_LOCATION_SUBMIT }
  });
}

export const pokemonToAdd = (addState, pokemon) => (dispatch) => {
  dispatch(setAddLocationState(addState));
  dispatch({
    type: C.ADD_POKEMON,
    payload: { pokemon }
  });
};

export const gymToAdd = (gym) => ({
  type: C.ADD_GYM,
  payload: { gym }
});

export const pokestopToAdd = (pokestop) => ({
  type: C.ADD_POKESTOP,
  payload: { pokestop }
});

export const setAddLocation = (lat, long) => ({
  type: C.ADD_LOCATION_LATLNG,
  payload: { lat, long }
});

export const setLocationSuggestions = (suggestions) => ({
  type: C.SET_LOCATION_SUGGESTIONS,
  payload: {
    suggestions
  }
});













