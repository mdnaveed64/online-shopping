import React, {useEffect} from 'react';
import './App.css';
import NavBar from "./modules/layout/components/navbar/NavBar";
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import MensCollection from "./modules/products/components/mens-collection/MensCollection";
import KidsCollection from "./modules/products/components/kids-collection/KidsCollection";
import WomensCollection from "./modules/products/components/womens-collection/WomensCollection";
import UploadProduct from "./modules/products/components/upload-product/UploadProduct";
import OrderList from "./modules/orders/components/order-list/OrderList";
import UserLogin from "./modules/users/components/user-login/UserLogin";
import UserRegister from "./modules/users/components/user-reigster/UserRegister";
import Cart from "./modules/orders/components/cart/Cart";
import Home from "./modules/layout/components/home/Home";
import Footer from "./modules/layout/components/footer/Footer";
import Alert from "./modules/layout/components/alert/Alert";
import * as userActions from './redux/users/user.actions';
import {useDispatch} from "react-redux";
import ProductDetails from "./modules/products/components/product-details/ProductDetails";
import UserProfile from "./modules/users/components/user-profile/UserProfile";
import CheckOut from "./modules/orders/components/checkout/CheckOut";
import PrivateRoute from "./router/PrivateRoute";
import OrderSuccess from "./modules/orders/components/order-success/OrderSuccess";

let App = () => {
    let dispatch = useDispatch();

    // Get User Info from Server
    useEffect(() => {
        dispatch(userActions.getUserInfo());
    }, []);

  return (
    <React.Fragment>
     <Router>
         <NavBar/>
         <Alert/>
         <Switch>
             <Route exact path="/" component={Home}/>
             <Route exact path="/products/men" component={MensCollection}/>
             <Route exact path="/products/kids" component={KidsCollection}/>
             <Route exact path="/products/women" component={WomensCollection}/>
             <PrivateRoute exact path="/products/upload" component={UploadProduct}/>
             <Route exact path="/products/:productId" component={ProductDetails}/>
             <PrivateRoute exact path="/orders/cart" component={Cart}/>
             <PrivateRoute exact path="/orders/list" component={OrderList}/>
             <PrivateRoute exact path="/orders/checkout" component={CheckOut}/>
             <PrivateRoute exact path="/orders/success" component={OrderSuccess}/>
             <Route exact path="/users/login" component={UserLogin}/>
             <Route exact path="/users/register" component={UserRegister}/>
             <PrivateRoute exact path="/users/profile" component={UserProfile}/>
         </Switch>
        {/* <Footer/>*/}
     </Router>
    </React.Fragment>
  );
}

export default App;
