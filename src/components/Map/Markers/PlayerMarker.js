import FloatingActionButton from 'material-ui/FloatingActionButton';
import Location from 'material-ui/svg-icons/toggle/radio-button-checked';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';




export default React => {

  const K_WIDTH = 25;
  const K_HEIGHT = 25;
  const playerMarkerStyle = {
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2
  };

  const PlayerMarker = () => {
    return (
      <MuiThemeProvider>
        <Location style={playerMarkerStyle} color="#00a8e7"/>
      </MuiThemeProvider>
    );
  };

  return PlayerMarker;

};