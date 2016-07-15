import GoogleMap from 'google-map-react';
import createPlayerMarker from './Markers/PlayerMarker';
import createPokemonMarker from './Markers/PokemonMarker';
import createMapControls from './Controls';

const options = {
  styles: [
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      { "visibility": "on" },
      { "color": "#166b19" }
    ]
  },{
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      { "visibility": "on" },
      { "color": "#ffff33" },
      { "weight": 5.2 },
      { "saturation": -16 }
    ]
  },{
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      { "invert_lightness": true },
      { "color": "#a0f096" },
      { "hue": "#22ff00" },
      { "saturation": 4 },
      { "gamma": 0.62 },
      { "visibility": "on" }
    ]
  },{
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      { "visibility": "on" },
      { "weight": 1.9 },
      { "color": "#109910" }
    ]
  }
]
}

export default React => {

  const PlayerMarker = createPlayerMarker(React);
  const PokemonMarker = createPokemonMarker(React);
  const MapControls = createMapControls(React);

  const Map = ({ lat, long, init, defaultZoom, pokedex, centerPlayer, setMap, toggleAddLocation}) => {

    

    if(!init){
      return <h3>Loading....</h3>
    }

    const goToPlayer = () => {
      centerPlayer(lat, long);
    };

    const addLocation = () => {
      toggleAddLocation();
    };

    const Pokemon = pokedex && pokedex.map( ({id, long, ...data}) => (
      <PokemonMarker 
        key={id}
        lng={long}
        {...data}
      />
    ));

    return (
      <div style={{height: '100%'}}>
        <GoogleMap
          bootstrapURLKeys={{key: 'AIzaSyBbGozazAnpL4URJjRj9gl0y0GAztJ5PLE'}}
          defaultCenter={{lat, lng: long}}
          defaultZoom={defaultZoom}
          onGoogleApiLoaded={setMap}
          yesIWantToUseGoogleMapApiInternals
        >
          <PlayerMarker lat={lat} lng={long} />
          {Pokemon}
        </GoogleMap>
        <MapControls goToPlayer={goToPlayer} addLocation={addLocation}/>
      </div>
    );
  };


  return Map;
}

