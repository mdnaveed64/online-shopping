import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import * as userReducer from '../../../../redux/users/user.reducer';
import * as orderActions from '../../../../redux/orders/order.actions';
import * as orderReducer from '../../../../redux/orders/order.reducer';
import {useDispatch, useSelector} from "react-redux";
import {CartUtil} from "../../../../util/CartUtil";
import StripeCheckout from 'react-stripe-checkout';
import stripeImage from '../../../../assets/img/uibrains.jpg';

interface IProps{}

const stripeAPIKey = process.env.REACT_APP_STRIPE_API_KEY;
let CheckOut:React.FC<IProps> = () => {
    console.log(process.env.REACT_APP_STRIPE_API_KEY);

    let dispatch = useDispatch();
    let history = useHistory();

    let userState:userReducer.UserState = useSelector((state : {users : userReducer.UserState}) => {
        return state.users;
    });


    let {loading , user} = userState;

    let orderState:orderReducer.OrderState = useSelector((state : {orders : orderReducer.OrderState}) => {
        return state.orders;
    });

    let {cartItems} = orderState;

    // Accept the Stripe payment form
    let handleToken = async (token?, addresses?) => {
        const body = {
            product : {
                name : `${cartItems[0].name} & Others`,
                amount : CartUtil.calcGrandTotal(cartItems) * 100,
                currency : 'INR',
            },
            customer : {
                name : addresses.billing_name,
                address : {
                    line1: addresses.billing_address_line1,
                    postal_code: addresses.billing_address_zip,
                    city: addresses.billing_address_city,
                    state: addresses.billing_address_state,
                    country: addresses.billing_address_country,
                }
            },
            description : "Shopping from BrainsKart",
            email : token.email,
            source : token.id,
            stripeTokenType : token.type
        };

        // Order Items
        let items = cartItems.map(cartItem => {
            return {
                name : cartItem.name,
                brand : cartItem.brand,
                price : cartItem.price,
                qty : cartItem.qty
            }
        })
        let order = {
            items : items,
            tax : CartUtil.calcTax(cartItems),
            total : CartUtil.calcTotal(cartItems)
        };

        // dispatch action
        dispatch(orderActions.makeStripePayment(body,history, order));
    }


    return (
        <React.Fragment>
            <section className="bg-brown text-dark p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 font-weight-bold">
                                <i  className="fa fa-shopping-cart"/> Checkout Items</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header bg-dark text-brown">
                                    <div className="row">
                                        <div className="col">
                                            <p className="h4 float-left">Billing Address</p>
                                        </div>
                                        <div className="col">
                                            <Link to={`/users/profile`} className="btn btn-brown text-dark btn-sm float-right">Update Address</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {
                                        user && user.address &&
                                        <ul className="list-group">
                                            <li className="list-group-item bg-brown">
                                                <small>Mobile : {user.address.mobile}</small><br/>
                                                <small>Flat : {user.address.flat}</small><br/>
                                                <small>Street : {user.address.street}</small><br/>
                                                <small>Landmark : {user.address.landmark}</small><br/>
                                                <small>City : {user.address.city}</small><br/>
                                                <small>State : {user.address.state}</small><br/>
                                                <small>Country : {user.address.country}</small><br/>
                                                <small>Pin : {user.address.pin}</small><br/>
                                            </li>
                                        </ul>
                                    }
                                </div>
                            </div>
                            <div className="card mt-3">
                                <div className="card-header bg-dark text-brown">
                                    <p className="h4">Payment Details</p>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                   id="flexRadioDefault1"/>
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    Cash On Delivery
                                                </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault"
                                                   id="flexRadioDefault2"/>
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    Credit Card Payment
                                                </label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header bg-dark text-brown">
                                    <p className="h4">Your Cart</p>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group">
                                        {
                                            cartItems.length > 0 &&
                                                cartItems.map(cartItem => {
                                                   return (
                                                       <li key={cartItem._id} className="list-group-item">
                                                           <div className="row align-items-center">
                                                               <div className="col-md-2">
                                                                   <img src={cartItem.image} alt="" width="50" height="75"/>
                                                               </div>
                                                               <div className="col-md-8">
                                                                   <small>{cartItem.name}</small><br/>
                                                                   <small><b>&#8377; {cartItem.price.toFixed(2)}</b></small><br/>
                                                                   <small>Qty : {cartItem.qty}</small>
                                                               </div>
                                                           </div>
                                                       </li>
                                                   )
                                                })
                                        }
                                    </ul>
                                    <ul className="list-group mt-2">
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
                                    {/*PAY with Card Button*/}
                                    <StripeCheckout
                                        token={handleToken}
                                        billingAddress
                                        stripeKey={stripeAPIKey}
                                        name="Stripe Payment"
                                        amount={CartUtil.calcGrandTotal(cartItems) * 100}
                                        description="Payments with Stripe"
                                        currency="INR"
                                        zipCode
                                        image={stripeImage}
                                        panelLabel="Pay for {{amount}}">
                                    </StripeCheckout>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};
export default CheckOut;