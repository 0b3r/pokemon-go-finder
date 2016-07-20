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



export default React => {

  const IconButton = createIconButton(React);

  const SearchBar = ({pokemonDB, suggestions, setSuggestions}) => {

    const _pokemonDataSource = Object.keys(pokemonDB).map(key => {
      return pokemonDB[key].name;
    });

    const _settingsButtonStyle = {
      fontSize: '24px'
    };

    const _iconButtonColor = '#444';


    const service = new google.maps.places.AutocompleteService();

    const _locationInput = (val) => {
      // Check for val stops Missing Parameter Error
      if(val){
        service.getQueryPredictions({ input: val }, (predictions, status) => {
          setSuggestions(predictions.map(place => place.description));
        });
      }
    };
    /*
      
    */
    return (
      <div className="search-wrapper">
        <Paper zDepth={2}>
          <div className="search-autocomplete">
            <AutoComplete
              hintText="Search Pokemon"
              filter={AutoComplete.fuzzyFilter}
              dataSource={_pokemonDataSource}
              maxSearchResults={5}
              fullWidth={true}
            />
          </div>
          <IconMenu
            style={{top: '5px'}}
            iconButtonElement={<Settings style={{cursor: 'pointer'}} color="#999" />}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <MenuItem 
              style={{cursor: 'pointer'}}
              leftIcon={<CheckBoxActive color="#00e100" />} 
              primaryText="Search By Pokemon" />
            <MenuItem 
              style={{cursor: 'pointer'}}
              leftIcon={<CheckBoxInactive color="#999" />}
              primaryText="Search By Location" />
            <MenuItem 
              style={{cursor: 'pointer'}}
              primaryText="Radius" 
              rightIcon={<ArrowDropRight />} 
              menuItems={[
                <MenuItem 
                  style={{cursor: 'pointer'}}
                  leftIcon={<CheckBoxActive color="#00e100" />} 
                  primaryText="10 KM" />,
                <MenuItem 
                  style={{cursor: 'pointer'}}
                  leftIcon={<CheckBoxInactive color="#999" />}
                  primaryText="20 KM" />,
                <MenuItem 
                  style={{cursor: 'pointer'}}
                  leftIcon={<CheckBoxInactive color="#999" />}
                  primaryText="50 KM" />,
              ]}/>
          </IconMenu>
        </Paper>
      </div> 
    );

    /*
    <div style={{padding: '5px', width: '50%', display: 'inline-block'}}>
      <AutoComplete
        hintText="Current Location"
        filter={AutoComplete.fuzzyFilter}
        dataSource={suggestions}
        onUpdateInput={_locationInput}
        maxSearchResults={5}
        fullWidth={true}
      />
    </div>
    */

  }

  return SearchBar;
};