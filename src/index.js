import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import * as services from './services';
import * as actions from './actions';
import configureStore from './store';
import createRoot from './components/Root';
import './assets/index.css';
import './assets/pokemon.css';


const store = configureStore();
const Root = createRoot(React);

store.dispatch(actions.listenToAuth());
services.listenToGPS(store.dispatch);

// actions.testFirebaseDB();
// actions.storePokemonLocation();
//actions.getInRadius(10);

store.dispatch(actions.getPokemon());

// actions.saveLocation('pokemon', 49.6759298, -112.796540, '-KMr1qRAB1CYA74pIyyJ');
// actions.saveLocation('pokemon', 49.6759598, -112.796440, '-KMr1qRNyvZWW-dUAmtB');
// actions.saveLocation('gym', 49.6758598, -112.796430);
// actions.saveLocation('pokestop', 50.6758598, -112.796430);


render(
  <Root store={store} />,
  document.getElementById('root')
);