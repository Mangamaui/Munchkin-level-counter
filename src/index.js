import React from 'react';
import ReactDOM from 'react-dom';

import './app.css';
import App from './APP/core/app';

import store from './APP/store';
import { Provider } from 'react-redux';


store.subscribe(() => {

});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
