import { connect } from 'react-redux';
import * as actions from '../actions';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddLocation from 'material-ui/svg-icons/maps/add-location';
import MyLocation from 'material-ui/svg-icons/maps/my-location';



export default React => {


  const TopBar = ({ addLocation, openAddLocation }) => {

    const _addButtonStyle = {
      position: 'absolute',
      bottom: '10px',
      right: '10px'
    };

    const _myLocationButtonStyle = {
      position: 'absolute',
      bottom: '10px',
      left: '10px'
    };

    return (
      <div className="bottom-bar">
        {
          !addLocation.addState ?
          <FloatingActionButton 
            className="topActionBtn"
            style={_addButtonStyle} 
            onClick={openAddLocation}>
              <AddLocation />
          </FloatingActionButton> :
          null
        }
        {
          !addLocation.addState ?
          <FloatingActionButton 
            style={_myLocationButtonStyle} 
            mini={true}
            onClick={openAddLocation}>
              <MyLocation />
          </FloatingActionButton> :
          null
        }
      </div>
    );

  };

  const _mapStateToProps = ({ addLocation }) => ({ addLocation });

  return connect(
    _mapStateToProps,
    actions
  )(TopBar);
};