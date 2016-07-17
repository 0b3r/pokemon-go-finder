const K_WIDTH = 50;
const K_HEIGHT = 50;

const playerMarkerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  borderRadius: K_HEIGHT,


};

export default React => ({playerIcon}) => (
  <img style={playerMarkerStyle}src={playerIcon} />
  
);