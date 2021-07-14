import * as userActions from './user.actions';
import {IUser} from "../../modules/users/models/IUser"; // client model

export interface UserState {
    loading : boolean;
    user : IUser;
    token : string;
    isAuthenticated : boolean;
    errorMessage : string;
}

let initialState : UserState = {
    loading : false,
    user : {} as IUser,
    token : '',
    isAuthenticated : false,
    errorMessage : ''
};

export const reducer = (state = initialState , action) => {
    let {type , payload} = action;
    switch(type) {
        // Register a User
        case userActions.REGISTER_USER_REQUEST:
            return {
                ...state,
                loading : true
            };
        case userActions.REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading : false
            };
        case userActions.REGISTER_USER_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage : payload
            };
        // Login a User
        case userActions.LOGIN_USER_REQUEST:
            return {
                ...state,
                loading : true
            };
        case userActions.LOGIN_USER_SUCCESS:
            localStorage.setItem(process.env.REACT_APP_FEATURE_KEY,payload.token);
            return {
                ...state,
                loading : false,
                token : payload.token,
                isAuthenticated : true,
            };
        case userActions.LOGIN_USER_FAILURE:
            localStorage.removeItem(process.env.REACT_APP_FEATURE_KEY);
            return {
                ...state,
                loading : false,
                token : '',
                isAuthenticated : false,
                errorMessage : payload
            };
            // Logout User
        case userActions.LOGOUT_USER:
            localStorage.removeItem(process.env.REACT_APP_FEATURE_KEY);
            return {
                ...state,
                loading : false,
                token : '',
                isAuthenticated : false,
            };
         // GET USER Info
        case userActions.GET_USER_INFO_REQUEST:
            return  {
                ...state,
                loading: true
            };
        case userActions.GET_USER_INFO_SUCCESS:
            return  {
                ...state,
                loading: false,
                user : payload,
                isAuthenticated : true
            };
        case userActions.GET_USER_INFO_FAILURE:
            return  {
                ...state,
                loading: false,
                errorMessage : payload
            };
        // Update User Address
        case userActions.UPDATE_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userActions.UPDATE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case userActions.UPDATE_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage : payload
            };
        default : return state;
    }
};