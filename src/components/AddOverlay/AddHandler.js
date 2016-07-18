import { connect } from 'react-redux';
import * as actions from '../../actions';
import C from '../../constants';
import createAddIntroduction from './AddIntroduction';
import createPokemonSelectList from './PokemonSelectList';
import createPokemonConfirm from './PokemonConfirm';
import createAddHow from './AddHow';
import createAddConfirm from './AddConfirm';

export default React => { 

  const AddIntroduction = createAddIntroduction(React);
  const PokemonSelectList = createPokemonSelectList(React);
  const PokemonConfirm = createPokemonConfirm(React);
  const AddHow = createAddHow(React);
  const AddConfirm = createAddConfirm(React);

  const AddHandler = ({
    addState, setAddLocationState, pokemonToAdd,
    pokemon, gym, pokestop, pokemonDB, gymToAdd,
    initAddition, pokestopToAdd, closeAddLocation, setAddLocation,
    playerLat, playerLong, setAddLocationSubmit
  }) => {

    const handleIntro = () => {
      return <AddIntroduction handler={setAddLocationState} />;
    };

    const handlePokemonSelect = () => (
      <PokemonSelectList 
        pokemonList={pokemonDB}
        selectPokemon={pokemonToAdd}
        nextAddState={C.ADD_LOCATION_POKEMON_CONFIRM}/>
    );

    const handlePokemonConfirm = () => (
      <PokemonConfirm 
        {...pokemon} 
        repickAction={
          () => 
          setAddLocationState(C.ADD_LOCATION_POKEMON_SELECT)
        } 
        continueAction={
          () => setAddLocationState(C.ADD_LOCATION_HOW)
        } />
    );

    const handleLocationHow = () => (
      <AddHow 
        hereAction={() => {
          setAddLocation(playerLat, playerLong);
          setAddLocationSubmit();
        }} 
        dropPinAction={() => setAddLocationState(C.ADD_LOCATION_TO_MAP)}/>
    );

    const handleAddGym = () => {
      //
      return (
        <AddHow 
          hereAction={() => {
            gymToAdd(true);
            setAddLocation(playerLat, playerLong);
            setAddLocationSubmit();
          }} 
          dropPinAction={() => {
            gymToAdd(true);
            setAddLocationState(C.ADD_LOCATION_TO_MAP)
          }}/>
      );
    };

    const handleLocationSubmit = () => (
      <AddConfirm close={() => closeAddLocation()}/>
    );

    const handleAddState = {
      [C.ADD_LOCATION_START]: handleIntro(),
      [C.ADD_LOCATION_POKEMON_SELECT]: handlePokemonSelect(),
      [C.ADD_LOCATION_POKEMON_CONFIRM]: handlePokemonConfirm(),
      [C.ADD_LOCATION_GYM]: handleAddGym(),
      [C.ADD_LOCATION_POKESTOP]: handleLocationHow(),
      [C.ADD_LOCATION_HOW]: handleLocationHow(),
      [C.ADD_LOCATION_SUBMIT]: handleLocationSubmit(),
    }

    return (
      <div>
        {handleAddState[addState]}
      </div>
    );
  };

  const mapStateToProps = ({pokemon, addLocation , gps:{lat, long}}) => {
    return {
      ...addLocation,
      playerLat: lat,
      playerLong: long,
      pokemonDB: pokemon
    }
  }

  return connect(
    mapStateToProps,
    actions
  )(AddHandler);
};