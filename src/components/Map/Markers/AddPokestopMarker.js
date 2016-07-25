export default React => {
  const pokestopMarkerImg = require('../../../assets/images/pokestopMarker-small.png');
  
  const AddPokestopMarker = ({save}) => {

    const containerWidth = 80 + 20;
    const containerHeight = 65 + 102;
  

    const containerStyle = {
      position: 'absolute',
      width: containerWidth,
      height: containerHeight,
      left: -containerWidth / 2,
      top: -containerHeight
    };

    const pokestopMarkerStyle = {
      width: 35,
      height: 65,
      backgroundImage: `url(${pokestopMarkerImg})`,
      marginLeft: '20px',
    };

    return(
      <div style={containerStyle}>
        <div className="addLocationBubble">
          <button 
            className="btn btn-block btn-success" 
            onClick={save}>
              Save
          </button>
          <div style={pokestopMarkerStyle}></div>
        </div>
      </div>
      );
  };

  return AddPokestopMarker;
};