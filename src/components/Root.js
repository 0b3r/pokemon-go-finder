import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import C from '../constants';
import createMain from './Main';
import createHome from './Home';

export default React => {

  const { PropTypes } = React;

  const Root = ({ store }) => {

    const history = syncHistoryWithStore(browserHistory, store);
    const Main = createMain(React);
    const Home = createHome(React);

    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <Router history={history}>
            <Route path={C.ROOT_PATH} component={ Home } />
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }

  Root.propTypes = {
    store: PropTypes.object.isRequired,
  };

  return Root;

}