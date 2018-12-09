/**
 * Created by Макс on 29.10.2017.
 */
import { combineReducers } from 'redux';
import user from './user';
import { routerReducer } from 'react-router-redux';
var reducers = combineReducers({
    userState: user,
    routing: routerReducer,
});

export default reducers;
