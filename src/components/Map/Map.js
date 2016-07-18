import GoogleMap from 'google-map-react';
import createPlayerMarker from './Markers/PlayerMarker';
import createPokemonMarker from './Markers/PokemonMarker';
import createAddPokemonMarker from './Markers/AddPokemonMarker';
import createAddGymMarker from './Markers/AddGymMarker';
import createGymMarker from './Markers/GymMarker';
import createMapControls from './Controls';
import C from '../../constants';

export default React => {

  const PlayerMarker = createPlayerMarker(React);
  const PokemonMarker = createPokemonMarker(React);
  const GymMarker = createGymMarker(React);
  const AddPokemonMarker = createAddPokemonMarker(React);
  const AddGymMarker = createAddGymMarker(React);
  const MapControls = createMapControls(React);

  const Map = ({ 
    lat, long, init, playerIcon, defaultZoom, locationsInRange, pokemonDB,
    centerPlayer, setMap, openAddLocation, addLocation, setAddLocation,
    setAddLocationState, setAddLocationSubmit
  }) => {

    

    if(!init){
      return <h3>Loading....</h3>
    }

    const Pokemon = Object.keys(locationsInRange).map((key) => {
      const {type, lat, long, id} = locationsInRange[key];
      if(type === C.TYPEOF_POKEMON){
        const {index} = pokemonDB[id];
        return (
          <PokemonMarker 
            key={key}
            lng={long}
            lat={lat}
            index={index}
          />
        );
      } else if(type === C.TYPEOF_GYM){
        return (
          <GymMarker 
            key={key}
            lng={long}
            lat={lat}
          />
        );
      } else {
        return [];
      }

    });

    const AddPokemonGymStop = () => {
      if(addLocation.addState === C.ADD_LOCATION_TO_MAP){
        if(addLocation.lat && addLocation.long){
          if(addLocation.pokemon){
            return (
              <AddPokemonMarker 
                lat={addLocation.lat} 
                lng={addLocation.long} 
                index={addLocation.pokemon.index}
                save={() => setAddLocationSubmit()}
                />
            );
          } else if(addLocation.gym){
            return (
              <AddGymMarker 
                lat={addLocation.lat} 
                lng={addLocation.long}
                save={() => setAddLocationSubmit()}/>
            );
          }
        }
        return [];
      }
    }

    const addLocationMarker = ({x, y, lat, lng, event}) => {
      // Stop propogation (Find better way) e.stopPropagation not working
      if(event.target.tagName !== 'BUTTON'){ 
        if(addLocation.addState === C.ADD_LOCATION_TO_MAP){
          if(addLocation.pokemon || addLocation.gym){
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
          
          {
            addLocation.addState !== C.ADD_LOCATION_TO_MAP ? 
            Pokemon : 
            AddPokemonGymStop()
          }
          <PlayerMarker playerIcon={playerIcon} lat={lat} lng={long} />
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

