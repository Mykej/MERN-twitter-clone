//src/actions/session_actions.js

//although there's only one function here so far, let's import the whole filesince we will be adding more later
import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const logout = () => dispatch => {
    //Remove the token from local storage
    localStorage.removeItem('jwtToken')
    //Remove the token from the common axios header
    APIUtil.setAuthtoken(false)
    //dispatch a logout action
    dispatch(logoutUser())
};