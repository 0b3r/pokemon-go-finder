import { connect } from 'react-redux';
import createAddIntroduction from './AddIntroduction';
import createAddHandler from './AddHandler';
import * as actions from '../../actions';
import C from '../../constants';
import Paper from 'material-ui/Paper';

export default React => {

  const professorWillow = require('../../assets/images/Professor_Willow.png');
  const AddIntroduction = createAddIntroduction(React);
  const AddHandler = createAddHandler(React);
  
  const AddOverlay = ({ active, closeAddLocation, addLocationState }) => {

    if(!active || (addLocationState === C.ADD_LOCATION_TO_MAP)){
      return null
    }
    /*
    <button 
            className="btn btn-success pull-right" 
            onClick={closeAddLocation}>
              Close
          </button>*/

    return (
      <div className="add-overlay">
        <div className="add-overlay-modal"></div>
        <div className="add-overlay-wrapper">
          
          <div 
            className="professor-willow" 
            style={{backgroundImage: `url(${professorWillow})`}}>
          </div>
          <div className="add-location-wrapper">
            <Paper zDepth={3}>
              <AddHandler />
            </Paper>
          </div>
        </div>
      </div>
    );
  };

  return AddOverlay;
};