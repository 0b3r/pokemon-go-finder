import { connect } from 'react-redux';
import * as actions from '../actions';
import C from '../constants';

export default React => {

  const Auth = ({status, displayName, openAuth, logoutUser}) => {

    if(status === C.AUTH_LOGGED_IN){
      return (
        <div>
          <span>Logged in as {displayName}.</span>
          {" "}<button onClick={logoutUser}>Log out</button>
        </div>
      );
    }

    if(status === C.AUTH_AWAITING_RESPONSE){
      return (
        <div>
          <button disabled>authenticating...</button>
        </div>
      );
    }

    return (
      <div>
        <button onClick={() => openAuth(C.AUTH_FACEBOOK_PROVIDER)}>Log in Facebook</button>
        <button onClick={() => openAuth(C.AUTH_GOOGLE_PROVIDER)}>Log in Google</button>
        <button onClick={() => openAuth(C.AUTH_TWITTER_PROVIDER)}>Log in Twitter</button>
      </div>
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