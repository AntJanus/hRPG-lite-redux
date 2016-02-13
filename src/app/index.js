import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './app';
import Reducers from './reducers';

import { storeAuth } from './customMiddleware';

let store = createStore(Reducers, undefined, applyMiddleware(storeAuth, thunkMiddleware));

let rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
