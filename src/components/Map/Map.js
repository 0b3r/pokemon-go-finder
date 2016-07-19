import GoogleMap from 'google-map-react';
import createPlayerMarker from './Markers/PlayerMarker';
import createPokemonMarker from './Markers/PokemonMarker';
import createAddPokemonMarker from './Markers/AddPokemonMarker';
import createAddGymMarker from './Markers/AddGymMarker';
import createGymMarker from './Markers/GymMarker';
import createAddPokestopMarker from './Markers/AddPokestopMarker';
import createPokestopMarker from './Markers/PokestopMarker';
import createMapControls from './Controls';
import C from '../../constants';

export default React => {

  const PlayerMarker = createPlayerMarker(React);
  const PokemonMarker = createPokemonMarker(React);
  const GymMarker = createGymMarker(React);
  const PokestopMarker = createPokestopMarker(React);
  const AddPokemonMarker = createAddPokemonMarker(React);
  const AddGymMarker = createAddGymMarker(React);
  const AddPokestopMarker = createAddPokestopMarker(React);
  const MapControls = createMapControls(React);

  const Map = ({ 
    lat, long, init, playerIcon, defaultZoom, locationsInRange, pokemonDB,
    centerPlayer, setMap, openAddLocation, addLocation, setAddLocation,
    setAddLocationState, setAddLocationSubmit
  }) => {

    

    if(!init){
      return <h3>Loading....</h3>
    }

    const InRange = Object.keys(locationsInRange).map((key) => {
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
      } else if(type === C.TYPEOF_POKESTOP){
        return (
          <PokestopMarker 
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
          } else if(addLocation.pokestop){
            return (
              <AddPokestopMarker 
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
          if(addLocation.pokemon || addLocation.gym || addLocation.pokestop){
            setAddLocation(lat, lng);
          }
        }
      }
    }

    // Prod keys: AIzaSyAWc09Z9pEHNFXzSEVBSl-yqoPFLocgnZ4
    // Other Keys: AIzaSyBbGozazAnpL4URJjRj9gl0y0GAztJ5PLE
    //bootstrapURLKeys={{key: 'AIzaSyBbGozazAnpL4URJjRj9gl0y0GAztJ5PLE'}}
    return (
      <div className="map">
        <GoogleMap
          defaultCenter={{lat, lng: long}}
          defaultZoom={defaultZoom}
          onGoogleApiLoaded={setMap}
          yesIWantToUseGoogleMapApiInternals
          onClick={addLocationMarker}
          onChildClick={() => {console.log('test')}}
        >
          
          {
            addLocation.addState !== C.ADD_LOCATION_TO_MAP ? 
            InRange : 
            AddPokemonGymStop()
          }
          <PlayerMarker playerIcon={playerIcon} lat={lat} lng={long} />
        </GoogleMap>
        
      </div>
    );
  };

  // <MapControls 
  //         addLocationState={addLocation.addState} 
  //         goToPlayer={() => centerPlayer(lat, long)} 
  //         addLocation={() => openAddLocation()}/>


  return Map;
}

