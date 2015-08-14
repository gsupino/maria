import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import * as reducers from '../reducers';
import loggerMiddleware from './loggerMiddleware';
import fetchMiddleware from './fetchMiddleware';
import thunMiddleware from './thunkMiddleware';
import callAPIMiddleware from './apiMiddleware';

const reducer = combineReducers(reducers);

export default function(data={}) {
    let finalCreateStore;
    if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
        const { devTools, persistState } = require('redux-devtools');
        finalCreateStore = compose(
            applyMiddleware( thunMiddleware,callAPIMiddleware,loggerMiddleware,fetchMiddleware),
            devTools(),
            persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
            createStore
        );
    } else {
        finalCreateStore = applyMiddleware(thunMiddleware,callAPIMiddleware,loggerMiddleware,fetchMiddleware)(createStore);
    }
    return finalCreateStore(reducer, data);
}

