import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import App from './App/core/app';

import store from './App/store';
import { Provider } from 'react-redux';
import { saveState } from './App/core/localstorage';

store.subscribe(() => {
  saveState({
    app: store.getState().app
  });
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container')
);
