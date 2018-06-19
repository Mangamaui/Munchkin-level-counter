import React from 'react';
import ReactDOM from 'react-dom';

import './app.css';
import App from './APP/core/app';

import store from './APP/store';
import { Provider } from 'react-redux';
import { saveState } from './APP/core/localstorage';

store.subscribe(() => {
  saveState({
    app: store.getState().app
  });
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
