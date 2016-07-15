const pokemonSprite = require('../assets/images/pokedex.jpg');

export default React => {

  const Pokemon = ({index}) => {
    const pokemonClass = `pokemon pkgG1 n${index + 1}`;
    return (
      <div className={pokemonClass} 
            style={{backgroundImage: `url(${pokemonSprite})`}}>
      </div>
    );
  };

  return Pokemon;
}

