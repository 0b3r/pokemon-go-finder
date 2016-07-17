import creatPokemon from '../Pokemon';
//import pokedexMap from '../../services/pokedexMap';

export default React => { 

  const Pokemon = creatPokemon(React);
  

  const PokemonSelectList = ({pokemonList, selectPokemon, nextAddState}) => {

    const handler = (pokemon) => {
      selectPokemon(nextAddState, pokemon);
    }

    const Pokedex = Object.keys(pokemonList).map((key) => { 
      let item = pokemonList[key];
      return (
        <Pokemon 
          key={key} 
          index={item.index} 
          handler={handler}
          pokemon={{...item, id:key}}
        />
      );
    });

    // const Pokedex = pokemonList.map((p,index) => (
    //   <Pokemon 
    //     key={index} 
    //     index={index} 
    //     handler={handler}
    //     pokemon={p}
    //   />
    // ));

    return (
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
  };

  return PokemonSelectList;
};