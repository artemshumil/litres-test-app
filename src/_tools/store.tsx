import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {users} from "../_reducer/reducer";
// import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();

export const store = createStore(
    users,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);