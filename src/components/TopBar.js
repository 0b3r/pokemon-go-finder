import { connect } from 'react-redux';
import createAuth from './Auth';
import C from '../constants';
import * as actions from '../actions';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import ContentAdd from 'material-ui/svg-icons/content/add';
import createIconButton from './shared/IconButton';
import createSearchBar from './SearchBar';


export default React => {

  const Auth = createAuth(React);
  const IconButton = createIconButton(React);
  const SearchBar = createSearchBar(React);

  const TopBar = ({ 
    addLocation, pokemonDB, locationSuggestions,
    openAddLocation, closeAddLocation, setAddLocationState,
    setLocationSuggestions
  }) => {

    const _addButtonStyle = {
      position: 'absolute',
      top: '10px',
      right: '10px'
    };

    const _closeButtonStyle = {
      position: 'absolute',
      top: '10px',
      right: '10px',
      fontSize: '48px'
    };

    const _backButtonStyle = {
      position: 'absolute',
      top: '10px',
      left: '10px',
      fontSize: '48px'
    };

    const _iconButtonColor = '#4d4d4d';

    const _backButtonState = {
      [C.ADD_LOCATION_START]: closeAddLocation,
      [C.ADD_LOCATION_POKEMON_SELECT]: () => (
        setAddLocationState(C.ADD_LOCATION_START)
      ),
      [C.ADD_LOCATION_POKEMON_CONFIRM]: () => (
        setAddLocationState(C.ADD_LOCATION_POKEMON_SELECT)
      ),
      [C.ADD_LOCATION_HOW]: () => (
        setAddLocationState(C.ADD_LOCATION_POKEMON_CONFIRM)
      ),
      [C.ADD_LOCATION_GYM]: () => (
        setAddLocationState(C.ADD_LOCATION_START)
      ),
      [C.ADD_LOCATION_POKESTOP]: () => (
        setAddLocationState(C.ADD_LOCATION_START)
      ),
      [C.ADD_LOCATION_TO_MAP]: () => {
        if(addLocation.pokemon){
          setAddLocationState(C.ADD_LOCATION_HOW)
        } else if (addLocation.gym) {
          setAddLocationState(C.ADD_LOCATION_GYM)
        } else if (addLocation.pokestop) {
          setAddLocationState(C.ADD_LOCATION_POKESTOP)
        }
      }
    }
    
    const showBackButton = (
      addLocation.addState && 
      (
        addLocation.addState !== C.ADD_LOCATION_START &&
        addLocation.addState !== C.ADD_LOCATION_SUBMIT
      )
    );

    // const _autoCompleteRef = (node) => {
    //   console.log(new new google.maps.places.Autocomplete(node.refs.searchTextField.input));
    // }
    

    return (
      <div className="top-bar">
        { 
          showBackButton ?
          <IconButton
            style={_backButtonStyle}
            color={_iconButtonColor}
            type="arrow_back"
            onClick={_backButtonState[addLocation.addState]} /> :
            null
        }
        {
          addLocation.addState ?
          <IconButton 
            style={_closeButtonStyle}
            color={_iconButtonColor}
            type="close"
            onClick={closeAddLocation} /> :
            null
        }
        {
          !addLocation.addState ? 
          <SearchBar 
            suggestions={locationSuggestions}
            setSuggestions={setLocationSuggestions} 
            pokemonDB={pokemonDB} /> :
          null
        }
        {
          !addLocation.addState ? 
          <Auth /> :
          null
        }
        {
          !addLocation.addState ?
          <FloatingActionButton 
            className="topActionBtn"
            style={_addButtonStyle} 
            onClick={openAddLocation}>
              <ContentAdd />
          </FloatingActionButton> :
          null
        }
      </div>
    );

  };

  const _mapStateToProps = ({ addLocation, pokemon, locationSuggestions }) => (
    { 
      addLocation,
      pokemonDB: pokemon,
      locationSuggestions
    }
  );

  return connect(
    _mapStateToProps,
    actions
  )(TopBar);
};