



export default React => {
  const pokemonSprite = require('../../../assets/images/pokedex.png');
  
  const PokemonMarker = ({index, save}) => {


    const baseSize = 80;
    const containerWidth = baseSize + 20;
    const containerHeight = baseSize + 107;
    const rowSize = 25;
    const positionX = baseSize * (index % rowSize);
    const positionY = baseSize * Math.floor(index/rowSize);

    const containerStyle = {
      position: 'absolute',
      width: containerWidth,
      height: containerHeight,
      left: -containerWidth / 2,
      top: -containerHeight
    };

    const pokemonMarkerStyle = {
      width: baseSize,
      height: baseSize,
      backgroundImage: `url(${pokemonSprite})`,
      backgroundPosition: `-${positionX}px -${positionY}px`,
    };

    return(
      <div style={containerStyle}>
        <div className="addLocationBubble">
          <button 
            className="btn btn-block btn-success" 
            onClick={save}>
              Save
          </button>
          <div style={pokemonMarkerStyle}></div>
        </div>
      </div>
      );
  };

  return PokemonMarker;
};