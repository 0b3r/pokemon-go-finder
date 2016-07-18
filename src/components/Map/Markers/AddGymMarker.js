export default React => {
  const gymMarkerImg = require('../../../assets/images/pokegym-80h.png');
  
  const AddGymMarker = ({save}) => {


    const baseSize = 80;
    const containerWidth = 80 + 20;
    const containerHeight = 200 + 107;
  

    const containerStyle = {
      position: 'absolute',
      width: containerWidth,
      height: containerHeight,
      left: -containerWidth / 2,
      top: -containerHeight
    };

    const gymMarkerStyle = {
      width: 80,
      height: 200,
      backgroundImage: `url(${gymMarkerImg})`,
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