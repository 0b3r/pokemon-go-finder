import GoogleMap from 'google-map-react';
import createPlayerMarker from './Markers/PlayerMarker';
import createPokemonMarker from './Markers/PokemonMarker';
import createMapControls from './Controls';

export default React => {

  const PlayerMarker = createPlayerMarker(React);
  const PokemonMarker = createPokemonMarker(React);
  const MapControls = createMapControls(React);

  const Map = ({ lat, long, init, defaultZoom, pokedex, centerPlayer, setMap}) => {

    

    if(!init){
      return <h3>Loading....</h3>
    }

    const goToPlayer = () => {
      centerPlayer(lat, long);
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
        <MapControls goToPlayer={goToPlayer}/>
      </div>
    );
  };


  return Map;
}

