import * as orderActions from './order.actions';
import {IProduct} from "../../modules/products/models/IProduct";
import {
    DELETE_CART_PRODUCT,
    MAKE_STRIPE_PAYMENT_FAILURE,
    MAKE_STRIPE_PAYMENT_REQUEST,
    MAKE_STRIPE_PAYMENT_SUCCESS, PLACE_ORDER_FAILURE, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS
} from "./order.actions";
import {IOrder} from "../../modules/orders/models/IOrder";


export interface OrderState {
    loading : boolean;
    cartItems : IProduct[];
    order : IOrder;
    orderList : IOrder[];
    errorMessage : string;
}

let initialState:OrderState = {
    loading : false,
    cartItems : [],
    order : {} as IOrder,
    orderList : [] as IOrder[],
    errorMessage : ''
};

export const reducer = (state = initialState , action):OrderState => {
    let {payload , type} = action;
    switch(type) {
        case orderActions.ADD_TO_CART:
            let existing:IProduct = state.cartItems.find(cartItem => cartItem._id === payload.product._id);
            if(existing){return state; }
            return {
                ...state,
                cartItems : [...state.cartItems , payload.product]
            }
        case orderActions.ADD_TO_CART_FAILURE:
            return {
                ...state,
                errorMessage : payload
            };
        case orderActions.INCR_PRODUCT_QTY:
            let incrItems:IProduct[] = state.cartItems.map(cartItem => {
                if(cartItem._id === payload.productId){
                    return {
                        ...cartItem,
                        qty : cartItem.qty + 1
                    }
                }
                return cartItem;
            });
            return {
                ...state,
                cartItems : [...incrItems]
            }
        case orderActions.DECR_PRODUCT_QTY:
            let decrItems:IProduct[] = state.cartItems.map(cartItem => {
                if(cartItem._id === payload.productId){
                    return {
                        ...cartItem,
                        qty : (cartItem.qty - 1 > 0) ? cartItem.qty - 1 : 1
                    }
                }
                return cartItem;
            });
            return {
                ...state,
                cartItems : [...decrItems]
            };
        case orderActions.DELETE_CART_PRODUCT:
            let updatedCartItems:IProduct[] = state.cartItems.filter(cartItem => {
                return cartItem._id !== payload.productId;
            });
            return {
                ...state,
                cartItems : [...updatedCartItems]
            };
        // Make Stripe Payments
        case orderActions.MAKE_STRIPE_PAYMENT_REQUEST:
            return {
                ...state,
                loading : true
            };
        case orderActions.MAKE_STRIPE_PAYMENT_SUCCESS:
            return {
                ...state,
                loading : false
            };
        case orderActions.MAKE_STRIPE_PAYMENT_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage : payload
            };
        // Place an Order
        case orderActions.PLACE_ORDER_REQUEST:
            return {
                ...state,
                loading : true
            };
        case orderActions.PLACE_ORDER_SUCCESS:
            return {
                ...state,
                loading : false,
                order : payload.order
            };
        case orderActions.PLACE_ORDER_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage : payload
            };
        case orderActions.CLEAR_CART:
            return {
                ...state,
                cartItems : [] as IProduct[],
                order : {} as IOrder
            }
        // Get All Orders
        case orderActions.GET_ALL_ORDERS_REQUEST:
            return  {
                ...state,
                loading : true
            };
        case orderActions.GET_ALL_ORDERS_SUCCESS:
            return  {
                ...state,
                loading : false,
                orderList : payload.orders
            };
        case orderActions.GET_ALL_ORDERS_FAILURE:
            return  {
                ...state,
                loading : false,
                errorMessage : payload
            };
        default : return state;
    }
};