import { connect } from 'react-redux';
import * as actions from '../actions';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddLocation from 'material-ui/svg-icons/maps/add-location';
import MyLocation from 'material-ui/svg-icons/maps/my-location';



export default React => {

  const Component = ({ lat, long, gps, addLocation, openAddLocation, setMapCenter }) => {

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

    const _centerPlayer = () => {
      if(lat && long){
        setMapCenter(lat, long);
      }
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
            onClick={_centerPlayer}>
              <MyLocation />
          </FloatingActionButton> :
          null
        }
      </div>
    );

  };

  const _mapStateToProps = ({ addLocation, gps }) => ({ addLocation, ...gps});

  return connect(
    _mapStateToProps,
    actions
  )(Component);
};