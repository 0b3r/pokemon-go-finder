



export default React => {
  const pokemonSprite = require('../../../assets/images/pokedex.png');
  
  const PokemonMarker = ({index}) => {

    const baseSize = 80;
    const rowSize = 25;
    const positionX = baseSize * (index % rowSize);
    const positionY = baseSize * Math.floor(index/rowSize);

    const pokemonMarkerStyle = {
      // initially any map object has left top corner at lat lng coordinates
      // it's on you to set object origin to 0,0 coordinates
      position: 'absolute',
      width: baseSize,
      height: baseSize,
      left: -baseSize / 2,
      top: -baseSize / 2,
      backgroundImage: `url(${pokemonSprite})`,
      backgroundPosition: `-${positionX}px -${positionY}px`,
    };

    return(<div style={pokemonMarkerStyle}></div>);
  };

  return PokemonMarker;
};