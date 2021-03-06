export default React => {
  const pokestopMarkerImg = require('../../../assets/images/pokestopMarker-small.png');
  
  const PokestopMarker = ({index}) => {

    const baseWidth = 35;
    const baseHeight = 65;

    const pokestopMarkerStyle = {
      // initially any map object has left top corner at lat lng coordinates
      // it's on you to set object origin to 0,0 coordinates
      position: 'absolute',
      width: baseWidth,
      height: baseHeight,
      left: -baseWidth / 2,
      top: -baseHeight,
      backgroundImage: `url(${pokestopMarkerImg})`
    };

    return(<div style={pokestopMarkerStyle}></div>);
  };

  return PokestopMarker;
};