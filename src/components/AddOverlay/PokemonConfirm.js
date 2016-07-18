import creatPokemon from '../Pokemon';

export default React => { 

  const Pokemon = creatPokemon(React);

  const PokemonConfirm = ({index, repickAction, continueAction}) => (
    <div className="add-stage-4">
      <span>Is this the one?</span>
      <div>
        <Pokemon index={index} />
      </div>
      <div>
        <button className="btn btn-success" onClick={continueAction}>
          Yes! That's it!
        </button>
        <button className="btn btn-warn" onClick={repickAction}>
          No. Let me look again.
        </button>
      </div>
    </div>
  );

  return PokemonConfirm;
};