import React from 'react';
import * as orderActions from '../../../../redux/orders/order.actions';
import * as orderReducer from '../../../../redux/orders/order.reducer';
import {useDispatch , useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {CartUtil} from "../../../../util/CartUtil";

interface IProps{}

let Cart:React.FC<IProps> = () => {
    let dispatch = useDispatch();

    let orderState:orderReducer.OrderState = useSelector((state : {orders : orderReducer.OrderState}) => {
        return state.orders;
    });

    let {loading , cartItems} = orderState;

    let clickIncrQty = (productId : string) => {
        dispatch(orderActions.incrProductQty(productId));
    };

    let clickDecrQty = (productId : string) => {
        dispatch(orderActions.decrProductQty(productId));
    };

    let clickDeleteProduct = (productId : string) => {
       dispatch(orderActions.deleteCartProduct(productId));
    };


    return (
        <React.Fragment>
            <section className="bg-brown text-dark p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 font-weight-bold">
                               <i className="fa fa-shopping-cart"/> Your Cart</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                cartItems.length > 0 ?
                    <React.Fragment>
                        <section>
                            <div className="container mt-3">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="card">
                                            <div className="card-header bg-dark text-brown">
                                                <p className="h4">Your cart Items</p>
                                            </div>
                                            <div className="card-body">
                                                <table className="table table-hover text-center bg-brown">
                                                    <thead>
                                                    <tr>
                                                        <th>SNO</th>
                                                        <th>Image</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Qty</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        cartItems.length > 0 &&
                                                        <React.Fragment>
                                                            {
                                                                cartItems.map((cartItem, index) => {
                                                                    return (
                                                                        <tr key={cartItem._id}>
                                                                            <td>{index + 1}</td>
                                                                            <td>
                                                                                <img src={cartItem.image} alt="" width="25" height="50"/>
                                                                            </td>
                                                                            <td>{cartItem.name}</td>
                                                                            <td>&#8377; {cartItem.price.toFixed(2)}</td>
                                                                            <td>
                                                                                <i className="fa fa-minus-circle mx-1" onClick={clickDecrQty.bind(this,cartItem._id)}/>
                                                                                {cartItem.qty}
                                                                                <i className="fa fa-plus-circle mx-1" onClick={clickIncrQty.bind(this,cartItem._id)}/>
                                                                            </td>
                                                                            <td>
                                                                                <button className="btn btn-danger btn-sm" onClick={clickDeleteProduct.bind(this,cartItem._id)}>Delete</button>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </React.Fragment>
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-header bg-dark text-brown">
                                                <p className="h4">Your Total</p>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-group">
                                                    <li className="list-group-item bg-brown">
                                                        Total : <b>&#8377; {CartUtil.calcTotal(cartItems).toFixed(2)}</b>
                                                    </li>
                                                    <li className="list-group-item bg-brown">
                                                        Tax : <b>&#8377; {CartUtil.calcTax(cartItems).toFixed(2)}</b>
                                                    </li>
                                                    <li className="list-group-item bg-brown">
                                                        Grand Total : <b>&#8377; {CartUtil.calcGrandTotal(cartItems).toFixed(2)}</b>
                                                    </li>
                                                </ul>
                                                <Link to={`/orders/checkout`} className="btn btn-success btn-sm">Checkout</Link>
                                                <Link to={`/`} className="btn btn-secondary btn-sm">Shop More</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </React.Fragment> :
                    <React.Fragment>
                        <div className="text-center">
                            <p className="h3">-------------- Your Cart is Empty --------------</p>
                            <small>Please Shop Here
                                <Link to={'/'} className="btn btn-brown btn-sm text-dark">Shop Now</Link>
                            </small>
                        </div>
                    </React.Fragment>
            }
        </React.Fragment>
    );
};
export default Cart;