import {userService} from "../_service/user.service";
import {userConstants} from "../_constants/_constants";
import {TData} from "../_tools/types";

export const userActions = {
    login,
    logout,
    register,
    getData
};


function login(username: string, password: string) {
    return (dispatch: any) => {
        dispatch(request({username}));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    try {dispatch(failure(JSON.parse(error))) ;}
                    catch (e) {dispatch(failure(error));}
                }
            );
    };

    function request(user: any) {return {type: userConstants.LOGIN_REQUEST, user}}
    function success(user: any) {return {type: userConstants.LOGIN_SUCCESS, user}}
    function failure(error: any) {return {type: userConstants.LOGIN_FAILURE, error}}
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(username: string, password: string) {
    return (dispatch: any) => {
        dispatch(request({username}));

        userService.register(username, password)
            .then(
                data => {
                    try {dispatch(success(JSON.parse(data))) ;}
                    catch (e) {dispatch(success(data));}
                },
                error => {
                    try {dispatch(failure(JSON.parse(error))) ;}
                    catch (e) {dispatch(failure(error));}
                }
            );
    };

    function request(user: any) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(data: any) { return { type: userConstants.REGISTER_SUCCESS, data } }
    function failure(error: any) { return { type: userConstants.REGISTER_FAILURE, error } }
}
function getData(username: string, password: string): (dispatch: any) => void {
    return (dispatch: any) => {
        dispatch(dataFetch());
        userService.getData()
            .then(
                data => {
                    dispatch(dataReceived(data));
                }
            ).catch(error => {
                try {dispatch(dataReceiveError(JSON.parse(error))) ;}
                catch (e) {dispatch(dataReceiveError(error));}
            });
    };

    function dataFetch() { return { type: userConstants.DATA_FETCHING } }
    function dataReceived(data: any) { return { type: userConstants.DATA_RECEIVED, data } }
    function dataReceiveError(error: any) { return { type: userConstants.DATA_RECEIVE_ERROR, error } }
}