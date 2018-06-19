import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootreducer';
import { loadState } from './core/localstorage';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = {} //loadState();


export default createStore(
    combineReducers(rootReducer),
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
);
