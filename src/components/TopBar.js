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
    addLocation, pokemonDB, locationSuggestions, search, map,
    openAddLocation, closeAddLocation, setAddLocationState,
    setLocationSuggestions, setSearchBy, setSearchRadius, setSearchTerm,
    setSearchFilters, spoofGPS, unSpoofGPS, snackbarFeedback
  }) => {

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

    const _authStyle = {
      position: 'absolute',
      top: '10px',
      right: '10px'
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
            {...search}
            snackbarFeedback={snackbarFeedback}
            spoofGPS={spoofGPS}
            unSpoofGPS={unSpoofGPS}
            map={map}
            setSearchFilters={setSearchFilters}
            setSearchTerm={setSearchTerm}
            setSearchRadius={setSearchRadius}
            setSearchBy={setSearchBy}
            suggestions={locationSuggestions}
            setSuggestions={setLocationSuggestions} 
            pokemonDB={pokemonDB} /> :
          null
        }
        {
          !addLocation.addState ? 
          <Auth style={_authStyle}/> :
          null
        }
      </div>
    );

  };

  const _mapStateToProps = ({ 
    addLocation, pokemon, locationSuggestions, search, map
  }) => (
    { 
      addLocation,
      pokemonDB: pokemon,
      locationSuggestions,
      search,
      map
    }
  );

  return connect(
    _mapStateToProps,
    actions
  )(TopBar);
};