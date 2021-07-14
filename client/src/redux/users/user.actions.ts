import axios from 'axios';
import * as alertActions from '../alert/alert.actions';
import {AuthUtil} from "../../util/AuthUtil";
import {TokenUtil} from "../../util/TokenUtil";
import {IAddress} from "../../modules/users/models/IUser";

export const REGISTER_USER_REQUEST:string = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS:string = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE:string = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST:string = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS:string = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE:string = 'LOGIN_USER_FAILURE';

export const GET_USER_INFO_REQUEST:string = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS:string = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE:string = 'GET_USER_INFO_FAILURE';

export const UPDATE_ADDRESS_REQUEST:string = 'UPDATE_ADDRESS_REQUEST';
export const UPDATE_ADDRESS_SUCCESS:string = 'UPDATE_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_FAILURE:string = 'UPDATE_ADDRESS_FAILURE';

export const LOGOUT_USER:string = 'LOGOUT_USER';

interface IUser {
    name? : string;
    email : string;
    password : string;
}

// register a User
export const registerUser = (user:IUser, history:any) => {
    return async (dispatch:any) => {
        dispatch({type : REGISTER_USER_REQUEST});
        try {
            let dataURL:string = `${process.env.REACT_APP_SERVER_URL}/api/users/register`;
            let response = await axios.post(dataURL,user);
            dispatch({type : REGISTER_USER_SUCCESS, payload : response.data});
            dispatch(alertActions.setAlert(response.data.msg ,'success')) // alert message
            history.push('/users/login');
        }
        catch (error) {
            console.error(error);
            dispatch({type : REGISTER_USER_FAILURE , payload : error});
            let errorList = error?.response?.data?.errors;
            if(errorList){
                for(let error of errorList){
                    dispatch(alertActions.setAlert(error.msg , 'danger'))
                }
            }
        }
    };
};

// Login a User
export const loginUser = (user:IUser, history:any) => {
    return async (dispatch:any) => {
        dispatch({type : LOGIN_USER_REQUEST});
        try {
            let dataURL:string = `${process.env.REACT_APP_SERVER_URL}/api/users/login`;
            let response = await axios.post(dataURL,user);
            dispatch({type : LOGIN_USER_SUCCESS, payload : response.data});
            // get the user Info
            dispatch(getUserInfo());
            dispatch(alertActions.setAlert(response.data.msg ,'success')) // alert message
            history.push('/');
        }
        catch (error) {
            console.error(error);
            dispatch({type : LOGIN_USER_FAILURE , payload : error});
            let errorList = error?.response?.data?.errors;
            if(errorList){
                for(let error of errorList){
                    dispatch(alertActions.setAlert(error.msg , 'danger'))
                }
            }
        }
    };
};

// Get User Info : PRIVATE
export const getUserInfo = () => {
    return async (dispatch:any) => {
        dispatch({type : GET_USER_INFO_REQUEST});
        try {
            // set token
            if(AuthUtil.isLoggedIn()){
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);

                let dataURL:string = `${process.env.REACT_APP_SERVER_URL}/api/users`;
                let response = await axios.get(dataURL);
                dispatch({type : GET_USER_INFO_SUCCESS, payload : response.data});
            }
        }
        catch (error) {
            console.error(error);
            dispatch({type : GET_USER_INFO_FAILURE , payload : error});
            let errorList = error?.response?.data?.errors;
            if(errorList){
                for(let error of errorList){
                    dispatch(alertActions.setAlert(error.msg , 'danger'))
                }
            }
        }
    };
};

// Logout User
export const logoutUser = () => {
    return (dispatch) => {
        dispatch({type : LOGOUT_USER});
    };
};

// Update / Create Address : PRIVATE
export const updateAddress = (address:IAddress) => {
    return async (dispatch:any) => {
        dispatch({type : UPDATE_ADDRESS_REQUEST});
        try {
            // set token
            if(AuthUtil.isLoggedIn()){
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);

                let dataURL:string = `${process.env.REACT_APP_SERVER_URL}/api/users/address`;
                let response = await axios.post(dataURL, address);
                dispatch({type : UPDATE_ADDRESS_SUCCESS, payload : response.data});
                dispatch(alertActions.setAlert(response.data.msg , 'success'));
            }
        }
        catch (error) {
            console.error(error);
            dispatch({type : UPDATE_ADDRESS_FAILURE , payload : error});
            let errorList = error?.response?.data?.errors;
            if(errorList){
                for(let error of errorList){
                    dispatch(alertActions.setAlert(error.msg , 'danger'))
                }
            }
        }
    };
};

