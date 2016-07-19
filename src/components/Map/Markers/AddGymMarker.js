export default React => {
  const gymMarkerImg = require('../../../assets/images/gymMarker.png');
  
  const AddGymMarker = ({save}) => {

    const containerWidth = 80 + 20;
    const containerHeight = 90 + 107;
  

    const containerStyle = {
      position: 'absolute',
      width: containerWidth,
      height: containerHeight,
      left: -containerWidth / 2,
      top: -containerHeight
    };

    const gymMarkerStyle = {
      width: 35,
      height: 90,
      backgroundImage: `url(${gymMarkerImg})`,
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
          <div style={gymMarkerStyle}></div>
        </div>
      </div>
      );
  };

  return AddGymMarker;
};