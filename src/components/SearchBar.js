import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
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

    return (
      <div className="pokemon-search-wrapper">
        <Paper zDepth={2}>
          <div style={{padding: '5px', width: '50%', display: 'inline-block'}}>
            <AutoComplete
              hintText="Search Pokemon"
              filter={AutoComplete.fuzzyFilter}
              dataSource={_pokemonDataSource}
              maxSearchResults={5}
              fullWidth={true}
            />
          </div>
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
        </Paper>
      </div> 
    );

  }

  return SearchBar;
};