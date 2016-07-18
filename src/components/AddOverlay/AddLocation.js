import creatPokemon from '../Pokemon';

export default React => { 
  
  const Pokemon = creatPokemon(React);

  const PokemonConfirm = () => (
    <div className="add-stage-3">
      <span>Is this the one you saw?</span>
      <div>
        <Pokemon index={10} />
      </div>
      <div>
        <button className="btn btn-success">Yes! That's It!</button>
        <button className="btn btn-warning">No.  Let me look again.</button>
      </div>
    </div>
  );

  return PokemonConfirm;
};