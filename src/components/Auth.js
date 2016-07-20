import { connect } from 'react-redux';
import Account from 'material-ui/svg-icons/action/account-circle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';


import * as actions from '../actions';
import C from '../constants';

export default React => {

  const Auth = ({style, status, displayName, openAuth, logoutUser}) => {

    const _profileButtonClass = (status === C.AUTH_ANONYMOUS) || 
      (status === C.AUTH_AWAITING_RESPONSE) ? 
      'anonymousProfile' : 'authenticatedProfile';

    const _menuItemStyle = {
      cursor: 'pointer'
    };

    return (
      <IconMenu
        style={style}
        iconButtonElement={
          <FloatingActionButton 
            className={_profileButtonClass}>
              <Account />
          </FloatingActionButton>
        }
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        touchTapCloseDelay={100}>
          {
            status === C.AUTH_LOGGED_IN ?
            <MenuItem 
              style={_menuItemStyle} 
              onClick={logoutUser} 
              primaryText="Log Out" /> :
            null
          }
          {
            status === C.AUTH_ANONYMOUS ?
            <div className="login-with-title">Login With:</div>:
            null
          }
          {
            status === C.AUTH_ANONYMOUS ?
            <MenuItem 
              style={_menuItemStyle} 
              onClick={() => openAuth(C.AUTH_FACEBOOK_PROVIDER)} 
              primaryText="Facebook" /> :
            null
          }
          {
            status === C.AUTH_ANONYMOUS ?
            <MenuItem 
              style={_menuItemStyle} 
              onClick={() => openAuth(C.AUTH_GOOGLE_PROVIDER)} 
              primaryText="Google" /> :
            null
          }
      </IconMenu>
    );
  }

  const mapStateToProps = ({auth:{status,user}}) => {

    const { displayName } = user ? user : '';

    return { 
      status, 
      displayName 
    };
  };

  return connect(
    mapStateToProps,
    actions
  )(Auth);
};