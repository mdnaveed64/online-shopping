import {AuthUtil} from "../../util/AuthUtil";
import {TokenUtil} from "../../util/TokenUtil";
import axios from "axios";
import {IProduct} from "../../modules/products/models/IProduct";
import * as alertActions from '../alert/alert.actions';

export const UPLOAD_PRODUCT_REQUEST:string = 'UPLOAD_PRODUCT_REQUEST';
export const UPLOAD_PRODUCT_SUCCESS:string = 'UPLOAD_PRODUCT_SUCCESS';
export const UPLOAD_PRODUCT_FAILURE:string = 'UPLOAD_PRODUCT_FAILURE';

export const GET_MEN_PRODUCTS_REQUEST:string = 'GET_MEN_PRODUCTS_REQUEST';
export const GET_MEN_PRODUCTS_SUCCESS:string = 'GET_MEN_PRODUCTS_SUCCESS';
export const GET_MEN_PRODUCTS_FAILURE:string = 'GET_MEN_PRODUCTS_FAILURE';

export const GET_WOMEN_PRODUCTS_REQUEST:string = 'GET_WOMEN_PRODUCTS_REQUEST';
export const GET_WOMEN_PRODUCTS_SUCCESS:string = 'GET_WOMEN_PRODUCTS_SUCCESS';
export const GET_WOMEN_PRODUCTS_FAILURE:string = 'GET_WOMEN_PRODUCTS_FAILURE';

export const GET_KIDS_PRODUCTS_REQUEST:string = 'GET_KIDS_PRODUCTS_REQUEST';
export const GET_KIDS_PRODUCTS_SUCCESS:string = 'GET_KIDS_PRODUCTS_SUCCESS';
export const GET_KIDS_PRODUCTS_FAILURE:string = 'GET_KIDS_PRODUCTS_FAILURE';

export const GET_PRODUCT_REQUEST:string = 'GET_PRODUCT_REQUEST';
export const GET_PRODUCT_SUCCESS:string = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE:string = 'GET_PRODUCT_FAILURE';

// Upload a Product : PRIVATE
export const uploadProduct = (product:IProduct , history:any) => {
    return async (dispatch:any) => {
        dispatch({type : UPLOAD_PRODUCT_REQUEST});
        try {
            // set token
            if(AuthUtil.isLoggedIn()){
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let config = {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                };
                let dataURL:string = `${process.env.REACT_APP_SERVER_URL}/api/products/upload`;
                let response = await axios.post(dataURL, product,config);
                dispatch({type : UPLOAD_PRODUCT_SUCCESS, payload : response.data});
                dispatch(alertActions.setAlert(response.data.msg, 'success'));
                history.push('/');
            }
        }
        catch (error) {
            console.error(error?.response?.data);
            dispatch({type : UPLOAD_PRODUCT_FAILURE, payload : error?.response?.data});
        }
    };
};

// Get Men's Collection : PUBLIC
export const getMenProductsCollection = () => {
    return async (dispatch:any) => {
        dispatch({type : GET_MEN_PRODUCTS_REQUEST});
        try {
            let config = {
                headers : {
                    'Content-Type' : 'application/json'
                }
            };
            let dataURL:string = `${process.env.REACT_APP_SERVER_URL}/api/products/men`;
            let response = await axios.get(dataURL,config);
            dispatch({type : GET_MEN_PRODUCTS_SUCCESS, payload : response.data});
        }
        catch (error) {
            console.error(error?.response?.data);
            dispatch({type : GET_MEN_PRODUCTS_FAILURE, payload : error?.response?.data});
        }
    };
};

// Get Women's Collection : PUBLIC
export const getWomenProductsCollection = () => {
    return async (dispatch:any) => {
        dispatch({type : GET_WOMEN_PRODUCTS_REQUEST});
        try {
            let config = {
                headers : {
                    'Content-Type' : 'application/json'
                }
            };
            let dataURL:string = `${process.env.REACT_APP_SERVER_URL}/api/products/women`;
            let response = await axios.get(dataURL,config);
            dispatch({type : GET_WOMEN_PRODUCTS_SUCCESS, payload : response.data});
        }
        catch (error) {
            console.error(error?.response?.data);
            dispatch({type : GET_WOMEN_PRODUCTS_FAILURE, payload : error?.response?.data});
        }
    };
};

// Get Kid's Collection : PUBLIC
export const getKidsProductsCollection = () => {
    return async (dispatch:any) => {
        dispatch({type : GET_KIDS_PRODUCTS_REQUEST});
        try {
            let config = {
                headers : {
                    'Content-Type' : 'application/json'
                }
            };
            let dataURL:string = `${process.env.REACT_APP_SERVER_URL}/api/products/kids`;
            let response = await axios.get(dataURL,config);
            dispatch({type : GET_KIDS_PRODUCTS_SUCCESS, payload : response.data});
        }
        catch (error) {
            console.error(error?.response?.data);
            dispatch({type : GET_KIDS_PRODUCTS_FAILURE, payload : error?.response?.data});
        }
    };
};

// Get Single Product : PUBLIC
export const getProduct = (productId:string) => {
    return async (dispatch:any) => {
        dispatch({type : GET_PRODUCT_REQUEST});
        try {
            let config = {
                headers : {
                    'Content-Type' : 'application/json'
                }
            };
            let dataURL:string = `${process.env.REACT_APP_SERVER_URL}/api/products/${productId}`;
            let response = await axios.get(dataURL,config);
            dispatch({type : GET_PRODUCT_SUCCESS, payload : response.data});
        }
        catch (error) {
            console.error(error?.response?.data);
            dispatch({type : GET_PRODUCT_FAILURE, payload : error?.response?.data});
        }
    };
};