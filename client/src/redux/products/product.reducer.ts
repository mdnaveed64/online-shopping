import * as productActions from './product.actions';
import {IProduct} from "../../../../models/IProduct";

export interface ProductState {
    loading : boolean;
    product : IProduct;
    products : IProduct[];
    errorMessage : string;
}

let initialState : ProductState = {
    loading : false,
    product : {} as IProduct,
    products : [] as IProduct[],
    errorMessage : ''
};

export const reducer = (state = initialState , action):ProductState => {
    let {type , payload} = action;
    switch(type) {
        // upload a product
        case productActions.UPLOAD_PRODUCT_REQUEST:
            return  {
                ...state,
                loading : true
            };
        case productActions.UPLOAD_PRODUCT_SUCCESS:
            return  {
                ...state,
                loading : false
            };
        case productActions.UPLOAD_PRODUCT_FAILURE:
            return  {
                ...state,
                loading : false,
                errorMessage : payload
            };
        // Get Men Products Collection
        case productActions.GET_MEN_PRODUCTS_REQUEST:
            return {
                ...state,
                loading : true
            };
        case productActions.GET_MEN_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading : false,
                products : payload
            };
        case productActions.GET_MEN_PRODUCTS_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage : payload
            };
        // Get Women Products Collection
        case productActions.GET_WOMEN_PRODUCTS_REQUEST:
            return {
                ...state,
                loading : true
            };
        case productActions.GET_WOMEN_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading : false,
                products : payload
            };
        case productActions.GET_WOMEN_PRODUCTS_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage : payload
            };
        // Get Kids Products Collection
        case productActions.GET_KIDS_PRODUCTS_REQUEST:
            return {
                ...state,
                loading : true
            };
        case productActions.GET_KIDS_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading : false,
                products : payload
            };
        case productActions.GET_KIDS_PRODUCTS_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage : payload
            };
        // Get Single Product Collection
        case productActions.GET_PRODUCT_REQUEST:
            return {
                ...state,
                loading : true
            };
        case productActions.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                loading : false,
                product : payload
            };
        case productActions.GET_PRODUCT_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage : payload
            };
        default : return state;
    }
};