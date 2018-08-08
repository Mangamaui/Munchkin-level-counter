import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootreducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = {};


export default createStore(
    combineReducers(rootReducer),
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
);
