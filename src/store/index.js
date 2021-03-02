import {combineReducers, createStore, applyMiddleware} from 'redux';
import Reducer from './reducer';
import thunk from 'redux-thunk';

const RootReducer = combineReducers({
    pokemon: Reducer
})

const Store = createStore(RootReducer, applyMiddleware(thunk))

export default Store;