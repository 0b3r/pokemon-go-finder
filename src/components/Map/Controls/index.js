
export default React => {

  const MapControls = ({goToPlayer}) => {

    return (
      <div className="map-controls">
        <button onClick={goToPlayer}>Player</button>
      </div>
    );
  }

  return MapControls;
}