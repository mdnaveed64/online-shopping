import {combineReducers} from 'redux';
import * as userReducer from './users/user.reducer';
import * as alertReducer from './alert/alert.reducer';
import * as productReducer from './products/product.reducer';
import * as orderReducer from './orders/order.reducer';

const rootReducer = combineReducers({
    users : userReducer.reducer,
    alerts : alertReducer.reducer,
    products : productReducer.reducer,
    orders : orderReducer.reducer
});
export default rootReducer;

