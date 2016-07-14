import { connect } from 'react-redux';
import createMap from './Map/Map';
import * as actions from '../actions';


export default React => {

  const Map = createMap(React);
  

  const Home = ({ gps, map, pokedex, setMapCenter, setMap}) => {

    return (
      <div className="home-map-container">
        <Map {...gps} {...map} 
          pokedex={pokedex}
          centerPlayer={setMapCenter} 
          setMap={setMap}
        />
      </div>
    );
  }

  const mapStateToProps = ({ gps, map, pokedex}, rest) => {
    return {
      gps,
      map,
      pokedex
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