export default React => {
  const gymMarkerImg = require('../../../assets/images/gymMarker.png');
  
  const GymMarker = ({index}) => {

    const baseWidth = 35;
    const baseHeight = 90;

    const gymMarkerStyle = {
      // initially any map object has left top corner at lat lng coordinates
      // it's on you to set object origin to 0,0 coordinates
      position: 'absolute',
      width: baseWidth,
      height: baseHeight,
      left: -baseWidth / 2,
      top: -baseHeight,
      backgroundImage: `url(${gymMarkerImg})`
    };

    return(<div style={gymMarkerStyle}></div>);
  };

  return GymMarker;
};