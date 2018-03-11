import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './rootreducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};


export default createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);
