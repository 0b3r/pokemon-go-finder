import creatPokemon from '../Pokemon';
import pokedexMap from '../../services/pokedexMap';

export default React => { 

  const Pokemon = creatPokemon(React);
  const Pokedex = pokedexMap.map((p,index) => {
    return <Pokemon key={index} index={index} />
  });

  const PokemonSelectList = () => (
    <div className="add-stage-2">
      <span>
        Really! You found a Pokemon in a new location? 
        Can you point it out in the Pokedex?
      </span>
      <div className="add-stage-2-pokemon-list">
        {Pokedex}
      </div>
    </div>
  );

  return PokemonSelectList;
};