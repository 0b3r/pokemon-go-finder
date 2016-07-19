import { connect } from 'react-redux';
import createTopBar from './TopBar';
import createMap from './Map/Map';
import createAddOverlay from './AddOverlay/';
import * as actions from '../actions';


export default React => {

  const TopBar = createTopBar(React);
  const Map = createMap(React);
  
  const AddOverlay = createAddOverlay(React);

  const Home = ({ 
    gps, map, locationsInRange, pokemonDB, photoURL, setMapCenter, 
    setMap, addLocation, openAddLocation, closeAddLocation, setAddLocation,
    setAddLocationState, setAddLocationSubmit
  }) => {

    return (
      <div className="map-container">
        <TopBar />
        <Map {...gps} {...map} 
          locationsInRange={locationsInRange}
          pokemonDB={pokemonDB}
          centerPlayer={setMapCenter} 
          setMap={setMap}
          openAddLocation={openAddLocation}
          playerIcon={photoURL}
          addLocation={addLocation}
          setAddLocation={setAddLocation}
          setAddLocationState={setAddLocationState}
          setAddLocationSubmit={setAddLocationSubmit}
        />
        <AddOverlay 
          active={addLocation.active}
          addLocationState={addLocation.addState} 
          closeAddLocation={closeAddLocation}/>
      </div>
    );
  }

  const mapStateToProps = ({ 
    gps, map, pokemon, locationsInRange, addLocation, auth:{user:{photoURL}}}
  ) => {
    return {
      gps,
      map,
      addLocation, 
      photoURL,
      locationsInRange, 
      pokemonDB: pokemon
    };
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      centerPlayer: (lat, long) => dispatch(actions.setMapCenter(lat, long)),
      setMap: (map) => dispatch(actions.setMap(map)),
    };
  }

  return connect(
    mapStateToProps,
    actions
  )(Home);
} 