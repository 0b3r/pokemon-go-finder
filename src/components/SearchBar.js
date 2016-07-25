import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import Settings from 'material-ui/svg-icons/action/settings';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import CheckBoxActive from 'material-ui/svg-icons/toggle/check-box';
import CheckBoxInactive from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import createIconButton from './shared/IconButton';

import C from '../constants';



export default React => {

  const IconButton = createIconButton(React);

  const SearchBar = ({
    pokemonDB, suggestions, setSuggestions, 
    by, term, radius, filters, map,
    setSearchBy, setSearchRadius, setSearchTerm, setSearchFilters, 
    spoofGPS, unSpoofGPS, snackbarFeedback
  }) => {

    const _pokemonDataSource = Object.keys(pokemonDB).map(key => {
      return pokemonDB[key].name;
    });

    const _settingsButtonStyle = {
      fontSize: '24px'
    };

    const _iconButtonColor = '#444';


    const _autoCompleteservice = new google.maps.places.AutocompleteService();
    let _placeService = null;
    if(map.map.map){
      _placeService = new google.maps.places.PlacesService(map.map.map);
    }
    

    const _locationInput = (val) => {
      // Check for val stops Missing Parameter Error
      if(val !== 'Current Location'){
        _autoCompleteservice.getQueryPredictions({ input: val }, (predictions, status) => {
          setSuggestions(predictions);
        });
      } else {
        unSpoofGPS();
      }
    };

    const _locationSuggestions = suggestions.map(loc => {
      if(loc){
        return loc.description
      }
    });

    const _CheckBox = (actual, expected) => (
      actual === expected ?
      <CheckBoxActive color="#00e100" /> :
      <CheckBoxInactive color="#999" />
    ); 

    const _searchLocation = (chosen, index) => {
      if(_placeService){
        if(chosen !== 'Current Location'){
          if(index > -1){
            _placeService.getDetails(suggestions[index], (place, status) => {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                const lat = place.geometry.location.lat();
                const long = place.geometry.location.lng();
                spoofGPS(lat, long);
              } else {
                const feedback = {
                  type: C.FEEDBACK_DISPLAY_ERROR,
                  message: 'The place supplied could not be found! Try another!',
                  code: '324234'
                };
                snackbarFeedback(feedback);
              }
            });
          } else {
            const feedback = {
              type: C.FEEDBACK_DISPLAY_ERROR,
              message: 'The place supplied could not be found! Try another!',
              code: '324234'
            };
            snackbarFeedback(feedback);
          }
        } else {
          unSpoofGPS();
        }
      }
      setSearchTerm(chosen);
    };

    const _searchPokemon = (chosen) => {
      if(chosen !== 'Current Location'){
        setSearchTerm(chosen);
      } else {
        setSearchTerm('');
      }
      
    };

    const _pokemonInput = (val) => {
      if(val === ''){
        setSearchTerm('');
      }
    }

    const _filterPokemon = filters.indexOf(C.TYPEOF_POKEMON) !== -1;
    const _filterGyms = filters.indexOf(C.TYPEOF_GYM) !== -1;
    const _filterPokestops = filters.indexOf(C.TYPEOF_POKESTOP) !== -1;

    const _toggleFilter = (toggle) => {
      const newFilters = filters.concat();
      const index = filters.indexOf(toggle);
      if(index === -1){
        newFilters.push(toggle);
      } else {
        newFilters.splice(index, 1);
      }
      setSearchFilters(newFilters);
    };

    return (
      <div className="search-wrapper">
        <Paper zDepth={2}>
          <div className="search-autocomplete">
            {
              by === C.SEARCH_BY_LOCATION ?
              <AutoComplete
                hintText="Current Location"
                searchText={term}
                filter={AutoComplete.fuzzyFilter}
                dataSource={_locationSuggestions}
                onUpdateInput={_locationInput}
                maxSearchResults={5}
                fullWidth={true}
                onNewRequest={_searchLocation}
              /> :
              <AutoComplete
                hintText="Search Pokemon"
                searchText={term}
                filter={AutoComplete.fuzzyFilter}
                dataSource={_pokemonDataSource}
                maxSearchResults={5}
                fullWidth={true}
                onNewRequest={_searchPokemon}
                onUpdateInput={_pokemonInput}
              />
            }
          </div>
          <IconMenu
            style={{top: '5px'}}
            iconButtonElement={<Settings style={{cursor: 'pointer'}} color="#999" />}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <MenuItem 
              style={{cursor: 'pointer'}}
              leftIcon={_CheckBox(by, C.SEARCH_BY_POKEMON)} 
              onClick={() => setSearchBy(C.SEARCH_BY_POKEMON)}
              primaryText="Search By Pokemon" />
            <MenuItem 
              style={{cursor: 'pointer'}}
              leftIcon={_CheckBox(by, C.SEARCH_BY_LOCATION)}
              onClick={() => setSearchBy(C.SEARCH_BY_LOCATION)}
              primaryText="Search By Location" />
            <MenuItem 
              style={{cursor: 'pointer'}}
              primaryText="Radius" 
              rightIcon={<ArrowDropRight />} 
              menuItems={[
                <MenuItem 
                  style={{cursor: 'pointer'}}
                  leftIcon={_CheckBox(radius, C.RADIUS_SMALL)} 
                  onClick={() => setSearchRadius(C.RADIUS_SMALL)}
                  primaryText={`${C.RADIUS_SMALL} KM`} />,
                <MenuItem 
                  style={{cursor: 'pointer'}}
                  leftIcon={_CheckBox(radius, C.RADIUS_MEDIUM)}
                  onClick={() => setSearchRadius(C.RADIUS_MEDIUM)}
                  primaryText={`${C.RADIUS_MEDIUM} KM`} />,
                <MenuItem 
                  style={{cursor: 'pointer'}}
                  leftIcon={_CheckBox(radius, C.RADIUS_LARGE)}
                  onClick={() => setSearchRadius(C.RADIUS_LARGE)}
                  primaryText={`${C.RADIUS_LARGE} KM`} />,
              ]}/>
            <MenuItem 
              style={{cursor: 'pointer'}}
              primaryText="Show" 
              rightIcon={<ArrowDropRight />} 
              menuItems={[
                <MenuItem 
                  style={{cursor: 'pointer'}}
                  leftIcon={_CheckBox(_filterPokemon, true)} 
                  onClick={() => _toggleFilter(C.TYPEOF_POKEMON)}
                  primaryText="Pokemon" />,
                <MenuItem 
                  style={{cursor: 'pointer'}}
                  leftIcon={_CheckBox(_filterGyms, true)}
                  onClick={() => _toggleFilter(C.TYPEOF_GYM)}
                  primaryText="Gyms" />,
                <MenuItem 
                  style={{cursor: 'pointer'}}
                  leftIcon={_CheckBox(_filterPokestops, true)}
                  onClick={() => _toggleFilter(C.TYPEOF_POKESTOP)}
                  primaryText="PokeStop" />,
              ]}/>
          </IconMenu>
        </Paper>
      </div> 
    );

  }

  return SearchBar;
};