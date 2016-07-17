import { connect } from 'react-redux';
import createMap from './Map/Map';
import createAddOverlay from './AddOverlay/';
import * as actions from '../actions';


export default React => {

  const Map = createMap(React);
  const AddOverlay = createAddOverlay(React);

  const Home = ({ 
    gps, map, pokedex, photoURL, setMapCenter, 
    setMap, addLocation, openAddLocation, closeAddLocation, setAddLocation,
    setAddLocationState, setAddLocationSubmit
  }) => {

    return (
      <div className="home-map-container">
        <Map {...gps} {...map} 
          pokedex={pokedex}
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
    gps, map, pokedex, addLocation, auth:{user:{photoURL}}}
  ) => {
    return {
      gps,
      map,
      pokedex,
      addLocation, 
      photoURL
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