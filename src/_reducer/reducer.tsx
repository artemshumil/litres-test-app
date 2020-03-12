import {userConstants} from "../_constants/_constants";
import {Simulate} from "react-dom/test-utils";

export function users(state = {
    loggedIn: false,
    data_fetching: false,
    data: null,
    message: null
}, action: any) {
    state.message = null;
    switch (action.type) {
        case userConstants.DATA_RECEIVED:
            return {
                ...state,
                data: action.data,
                data_fetching: false
            };
        case userConstants.DATA_RECEIVE_ERROR:
            return {
                ...state,
                data: null,
                data_fetching: false,
                message: action.error.message
            };
        case userConstants.DATA_FETCHING:
            return {
                ...state,
                data_fetching: true
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true
            };
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                loggedIn: false,
                message: action.error.message
            };
        case userConstants.LOGOUT:
            return {
                ...state,
                data: null,
                data_fetching: false,
                loggedIn: false
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                message: action.data.messate
            };
        case userConstants.REGISTER_FAILURE:
            return {
                ...state,
                message: action.error.message
            };
        default:
            return state
    }
}