import React from 'react';
import {NavLink} from "react-router-dom";
import brandImg from "../../../../assets/img/brand.png";
import {AuthUtil} from "../../../../util/AuthUtil";
import * as userActions from '../../../../redux/users/user.actions';
import * as userReducer from '../../../../redux/users/user.reducer';
import * as orderReducer from '../../../../redux/orders/order.reducer';
import {useDispatch, useSelector} from "react-redux";

interface IProps{}

let NavBar:React.FC<IProps> = () => {
    let dispatch = useDispatch();

    let userState:userReducer.UserState = useSelector((state : {users : userReducer.UserState}) => {
        return state.users;
    });

    let orderState:orderReducer.OrderState = useSelector((state : {orders : orderReducer.OrderState}) => {
        return state.orders;
    });

    let {isAuthenticated, user} = userState;
    let {cartItems} = orderState;

    let clickLogOut = () => {
        dispatch(userActions.logoutUser());
    };

    return (
        <React.Fragment>
           <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
               <div className="container">
                    <NavLink to="/" className="navbar-brand">
                        <img src={brandImg} alt="" width="130" height="30"/>
                    </NavLink>
                   <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                           data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                           aria-label="Toggle navigation">
                       <span className="navbar-toggler-icon"/>
                   </button>
                   <div className="collapse navbar-collapse" id="navbarNav">
                       <ul className="navbar-nav me-auto">
                           <li className="nav-item">
                               <NavLink to="/products/men" className="nav-link">Men's Wear</NavLink>
                           </li>
                           <li className="nav-item">
                               <NavLink to="/products/kids" className="nav-link">Kids's Wear</NavLink>
                           </li>
                           <li className="nav-item">
                               <NavLink to="/products/women" className="nav-link">Women's Wear</NavLink>
                           </li>
                           {
                               AuthUtil.isLoggedIn() && isAuthenticated &&
                               <li className="nav-item">
                                   <NavLink to="/products/upload" className="nav-link">Upload</NavLink>
                               </li>
                           }

                           {
                               AuthUtil.isLoggedIn() && isAuthenticated &&
                               <li className="nav-item">
                                   <NavLink to="/orders/cart" className="nav-link">
                                       <i className="fa fa-shopping-cart"/>
                                       <span className="badge badge-danger badge-pill">{cartItems.length}</span>
                                   </NavLink>
                               </li>
                           }

                           {
                               AuthUtil.isLoggedIn() && isAuthenticated &&
                               <li className="nav-item">
                                   <NavLink to="/orders/list" className="nav-link">Orders</NavLink>
                               </li>
                           }
                       </ul>
                       <div className="d-flex">
                           <ul className="navbar-nav">
                               {
                                   !AuthUtil.isLoggedIn() && !isAuthenticated ?
                                       <React.Fragment>
                                           <li className="nav-item">
                                               <NavLink to="/users/login" className="nav-link">
                                                   <i className="fa fa-sign-in-alt"/> Login</NavLink>
                                           </li>
                                           <li className="nav-item">
                                               <NavLink to="/users/register" className="nav-link">
                                                   <i className="fa fa-user-cog"/> Register</NavLink>
                                           </li>
                                       </React.Fragment> :
                                       <React.Fragment>
                                           {
                                              user && Object.keys(user).length > 0 &&
                                               <li className="nav-item">
                                                   <NavLink to="/users/profile" className="nav-link">
                                                       <img src={user.avatar} alt="" width="25" height="25" className="rounded-circle"/>
                                                       &nbsp;{user.name}</NavLink>
                                               </li>
                                           }
                                           <li className="nav-item">
                                               <NavLink to="/" className="nav-link" onClick={clickLogOut}>
                                                   <i className="fa fa-sign-out-alt"/> LogOut</NavLink>
                                           </li>
                                       </React.Fragment>
                               }
                           </ul>
                       </div>
                   </div>
               </div>
           </nav>
        </React.Fragment>
    );
};
export default NavBar;