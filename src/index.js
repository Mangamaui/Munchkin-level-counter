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


resizeScreen();

window.addEventListener("resize", resizeScreen);

/**
*   reset screen height for mobile devices
*/
function resizeScreen() {

    if(window.innerWidth <= 500) {
        const EL = document.getElementById('container');
        EL.style.height = window.innerHeight + "px";
    }


}
