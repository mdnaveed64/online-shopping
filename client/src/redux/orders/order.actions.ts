import {IProduct} from "../../modules/products/models/IProduct";
import {IAddress} from "../../modules/users/models/IUser";
import {AuthUtil} from "../../util/AuthUtil";
import {TokenUtil} from "../../util/TokenUtil";
import axios from "axios";
import * as alertActions from "../alert/alert.actions";
import {UPDATE_ADDRESS_FAILURE, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS} from "../users/user.actions";

export const ADD_TO_CART:string = 'ADD_TO_CART';
export const ADD_TO_CART_FAILURE:string = 'ADD_TO_CART_FAILURE';
export const INCR_PRODUCT_QTY:string = 'INCR_PRODUCT_QTY';
export const DECR_PRODUCT_QTY:string = 'DECR_PRODUCT_QTY';
export const DELETE_CART_PRODUCT:string = 'DELETE_CART_PRODUCT';
export const CLEAR_CART:string = 'CLEAR_CART';

export const MAKE_STRIPE_PAYMENT_REQUEST:string = 'MAKE_STRIPE_PAYMENT_REQUEST';
export const MAKE_STRIPE_PAYMENT_SUCCESS:string = 'MAKE_STRIPE_PAYMENT_SUCCESS';
export const MAKE_STRIPE_PAYMENT_FAILURE:string = 'MAKE_STRIPE_PAYMENT_FAILURE';

export const PLACE_ORDER_REQUEST:string = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS:string = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILURE:string = 'PLACE_ORDER_FAILURE';

export const GET_ALL_ORDERS_REQUEST : string = 'GET_ALL_ORDERS_REQUEST';
export const GET_ALL_ORDERS_SUCCESS : string = 'GET_ALL_ORDERS_SUCCESS';
export const GET_ALL_ORDERS_FAILURE : string = 'GET_ALL_ORDERS_FAILURE';

export const addToCart = (product:IProduct , qty:number, history:any) => {
    return (dispatch) => {
        try {
            product.qty = qty; // update the Qty of the product to selected qty
            dispatch({type : ADD_TO_CART , payload : {product : product}});
            history.push('/orders/cart');
        }
        catch (error) {
            dispatch({type : ADD_TO_CART_FAILURE, payload : error});
        }
    };
};

// incrProductQty
export const incrProductQty = (productId) => {
    return (dispatch) => {
        dispatch({type : INCR_PRODUCT_QTY , payload : {productId : productId}});
    };
};

// decrProductQty
export const decrProductQty = (productId) => {
    return (dispatch) => {
        dispatch({type : DECR_PRODUCT_QTY , payload : {productId : productId}});
    };
};

// delete cart product
export const deleteCartProduct = (productId) => {
    return (dispatch) => {
        dispatch({type : DELETE_CART_PRODUCT , payload : {productId : productId}});
    };
};

// clear cart
export const clearCart = () => {
    return (dispatch) => {
        dispatch({type : CLEAR_CART });
    };
};

export const makeStripePayment = (body, history, order) => {
    return async (dispatch:any) => {
        dispatch({type : MAKE_STRIPE_PAYMENT_REQUEST});
        try {
            // set token
            if(AuthUtil.isLoggedIn()) {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                TokenUtil.setStripeKey(); // setup the stripe key in the request header
                let dataURL:string = `${process.env.REACT_APP_SERVER_URL}/api/payments/checkout`;
                let response = await axios.post(dataURL, body);
                dispatch({type : MAKE_STRIPE_PAYMENT_SUCCESS, payload : response.data});
                dispatch(alertActions.setAlert('Payment is Success' , 'success'));

                // place an order
                dispatch(placeOrder(order, history))
            }
        }
        catch (error) {
            console.error(error?.response?.data);
            dispatch({type : MAKE_STRIPE_PAYMENT_FAILURE, payload : error?.response?.data});
        }
    };
};

// place an order
export const placeOrder = (order, history) => {
    return async (dispatch) => {
        dispatch({type : MAKE_STRIPE_PAYMENT_REQUEST});
        try {
            if(AuthUtil.isLoggedIn()) {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL : string = `${process.env.REACT_APP_SERVER_URL}/api/orders/place`;
                let response = await axios.post(dataURL, order);
                dispatch({type : PLACE_ORDER_SUCCESS , payload : response.data});
                history.push('/orders/success'); // order success page
            }
        }
        catch (error) {
            console.error(error?.response?.data);
            dispatch({type : PLACE_ORDER_FAILURE, payload : error?.response?.data});
        }
    };
};

// GET ALL ORDERS
export const getAllOrders = () => {
    return async (dispatch) => {
        dispatch({type : GET_ALL_ORDERS_REQUEST});
        try {
            if(AuthUtil.isLoggedIn()) {
                let token = AuthUtil.getToken();
                TokenUtil.setTokenHeader(token);
                let dataURL : string = `${process.env.REACT_APP_SERVER_URL}/api/orders`;
                let response = await axios.get(dataURL);
                dispatch({type : GET_ALL_ORDERS_SUCCESS , payload : response.data});
            }
        }
        catch (error) {
            console.error(error?.response?.data);
            dispatch({type : GET_ALL_ORDERS_FAILURE, payload : error?.response?.data});
        }
    };
};