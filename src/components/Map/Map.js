import GoogleMap from 'google-map-react';
import createPlayerMarker from './Markers/PlayerMarker';
import createPokemonMarker from './Markers/PokemonMarker';
import createAddPokemonMarker from './Markers/AddPokemonMarker';
import createMapControls from './Controls';
import C from '../../constants';

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
  const AddPokemonMarker = createAddPokemonMarker(React);
  const MapControls = createMapControls(React);

  const Map = ({ 
    lat, long, init, playerIcon, defaultZoom, pokedex, 
    centerPlayer, setMap, openAddLocation, addLocation, setAddLocation,
    setAddLocationState, setAddLocationSubmit
  }) => {

    

    if(!init){
      return <h3>Loading....</h3>
    }

    // const Pokemon = pokedex && pokedex.map( ({id, long, ...data}) => (
    //   <PokemonMarker 
    //     key={id}
    //     lng={long}
    //     {...data}
    //   />
    // ));


    const AddPokemonGymStop = () => {
      if(addLocation.addState === C.ADD_LOCATION_TO_MAP){
        if(addLocation.lat && addLocation.long){
          return (
            <AddPokemonMarker 
              lat={addLocation.lat} 
              lng={addLocation.long} 
              index={addLocation.pokemon.index}
              save={() => setAddLocationSubmit()}
              />
          );
        }
        return [];
      }
    }

    const addLocationMarker = ({x, y, lat, lng, event}) => {
      // Stop propogation (Find better way) e.stopPropagation not working
      if(event.target.tagName !== 'BUTTON'){ 
        if(addLocation.addState === C.ADD_LOCATION_TO_MAP){
          if(addLocation.pokemon){
            setAddLocation(lat, lng);
          }
        }
      }
    }

    return (
      <div style={{height: '100%'}}>
        <GoogleMap
          bootstrapURLKeys={{key: 'AIzaSyBbGozazAnpL4URJjRj9gl0y0GAztJ5PLE'}}
          defaultCenter={{lat, lng: long}}
          defaultZoom={defaultZoom}
          onGoogleApiLoaded={setMap}
          yesIWantToUseGoogleMapApiInternals
          onClick={addLocationMarker}
        >
          <PlayerMarker playerIcon={playerIcon} lat={lat} lng={long} />
          {
            addLocation.addState !== C.ADD_LOCATION_TO_MAP ? 
            [] : 
            AddPokemonGymStop()
          }
        </GoogleMap>
        <MapControls 
          addLocationState={addLocation.addState} 
          goToPlayer={() => centerPlayer(lat, long)} 
          addLocation={() => openAddLocation()}/>
      </div>
    );
  };


  return Map;
}

