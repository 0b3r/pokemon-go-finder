import { connect } from 'react-redux';
import createTopBar from './TopBar';
import createBottomBar from './BottomBar';
import createMap from './Map/Map';
import createAddOverlay from './AddOverlay/';
import * as actions from '../actions';
import Snackbar from 'material-ui/Snackbar';


export default React => {

  const TopBar = createTopBar(React);
  const BottomBar = createBottomBar(React);
  const Map = createMap(React);
  
  const AddOverlay = createAddOverlay(React);

  const Home = ({ 
    gps, map, search, locationsInRange, pokemonDB, photoURL, setMapCenter, 
    setMap, addLocation, openAddLocation, closeAddLocation, setAddLocation,
    setAddLocationState, setAddLocationSubmit, feedback, snackbarFeedbackDismiss
  }) => {

    const _errorSnackbar = {
      background: '#ff6464'
    };

    const _successSnackbar = {
      background: '#34d834'
    };

    const _snackbars = feedback.map((msg, index) => {
      return (<Snackbar
        key={index}
        open={true}
        style={{zIndex: '15'}}
        bodyStyle={msg.error ? _errorSnackbar : _successSnackbar}
        message={msg.message}
        autoHideDuration={5000}
        onRequestClose={() => snackbarFeedbackDismiss(index)}
      />);
    });

    return (
      <div className="map-container">
        <TopBar />
        <Map {...gps} {...map} 
          locationsInRange={locationsInRange}
          pokemonDB={pokemonDB}
          centerPlayer={setMapCenter} 
          setMap={setMap}
          openAddLocation={openAddLocation}
          addLocation={addLocation}
          setAddLocation={setAddLocation}
          setAddLocationState={setAddLocationState}
          setAddLocationSubmit={setAddLocationSubmit}
          search={search}
        />
        <AddOverlay 
          active={addLocation.active}
          addLocationState={addLocation.addState} 
          closeAddLocation={closeAddLocation}/>

        <BottomBar />
        {
          _snackbars
        }
        
      </div>
    );
  }

  const mapStateToProps = ({ 
    gps, map, pokemon, locationsInRange, addLocation, feedback, search
  }) => {
    return {
      gps,
      map,
      addLocation, 
      locationsInRange, 
      feedback,
      search,
      pokemonDB: pokemon
    };
  }

  return connect(
    mapStateToProps,
    actions
  )(Home);
} 