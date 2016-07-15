import { connect } from 'react-redux';
import createMap from './Map/Map';
import createAddOverlay from './AddOverlay/';
import * as actions from '../actions';


export default React => {

  const Map = createMap(React);
  const AddOverlay = createAddOverlay(React);

  const Home = ({ gps, map, pokedex, setMapCenter, setMap, addLocation, toggleAddLocation}) => {

    return (
      <div className="home-map-container">
        <Map {...gps} {...map} 
          pokedex={pokedex}
          centerPlayer={setMapCenter} 
          setMap={setMap}
          toggleAddLocation={toggleAddLocation}
        />
        {addLocation.active ? <AddOverlay toggleAddLocation={toggleAddLocation} /> : null}
      </div>
    );
  }

  const mapStateToProps = ({ gps, map, pokedex, addLocation}) => {
    return {
      gps,
      map,
      pokedex,
      addLocation
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