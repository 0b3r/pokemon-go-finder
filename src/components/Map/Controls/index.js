import C from '../../../constants';

export default React => {

  const MapControls = ({goToPlayer, addLocation, addLocationState}) => {

    if(addLocationState === C.ADD_LOCATION_TO_MAP){
      return null;
    }

    return (
      <div className="map-controls clearfix">
        <div className="col-xs-3 col-xs-offset-5">
        <button 
          style={{marginRight: '10px'}} 
          className="btn btn-primary" 
          onClick={goToPlayer}>
            Player
        </button>
        <button 
          className="btn btn-success" 
          onClick={addLocation}>
            Add
        </button>
        </div>
      </div>
    );
  }

  return MapControls;
}