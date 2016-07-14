import { connect } from 'react-redux';
import createMap from './Map/Map';

export default React => {

  const Map = createMap(React);

  const Home = ({ gps }) => {

    return (
      <div className="home-map-container">
        <Map {...gps} />
      </div>
    );
  }

  const mapStateToProps = ({ gps }, rest) => {
    return {
      gps
    }
  }

  return connect(
    mapStateToProps,
  )(Home);
} 