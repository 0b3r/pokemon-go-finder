import createMap from './Map';

export default React => {

  const Map = createMap(React);

  const Home = () => {

    return (
      <div className="home-map-container">
        <Map />
      </div>
    );
  }

  return Home;
} 