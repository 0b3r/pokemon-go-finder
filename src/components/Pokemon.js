



export default React => {
  const pokemonSprite = require('../assets/images/pokedex.png');
  
  const Pokemon = ({index, handler, pokemon}) => {

    const baseSizeWidth = 80;
    const baseSizeHeight = 82;
    const rowSize = 25;
    const positionX = baseSizeWidth * (index % rowSize);
    const positionY = baseSizeHeight * Math.floor(index/rowSize);

    const pokemonMarkerStyle = {
      // initially any map object has left top corner at lat lng coordinates
      // it's on you to set object origin to 0,0 coordinates
      width: baseSizeWidth,
      height: baseSizeHeight,
      backgroundImage: `url(${pokemonSprite})`,
      backgroundPosition: `-${positionX}px -${positionY}px`,
    };

    const _onClick = () => {
      if(handler){
        handler(pokemon);
      }
    }

    return(
      <div 
        onClick={_onClick} 
        className="pokemon" 
        style={pokemonMarkerStyle}></div>
    );
  };

  return Pokemon;
};





// const pokemonSprite = require('../assets/images/pokedex.jpg');

// export default React => {

//   const Pokemon = ({index, handler, pokemon}) => {
//     const pokemonClass = `pokemon pkgG1 n${index+1}`;
//     if(handler){
//       return (
//         <div 
//           className={pokemonClass} 
//           style={{backgroundImage: `url(${pokemonSprite})`}}
//           onClick={() => handler(pokemon)}
//         >
//         </div>
//       );
//     }

//     return (
//       <div 
//         className={pokemonClass} 
//         style={{backgroundImage: `url(${pokemonSprite})`}}
//       >
//       </div>
//     );
    
//   };

//   return Pokemon;
// }

