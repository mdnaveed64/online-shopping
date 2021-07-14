import React from "react";
import {Route , Redirect} from 'react-router-dom';
import {AuthUtil} from "../util/AuthUtil";

let PrivateRoute = ({component : Component , ...rest}) => {
    return <Route {...rest} render={(props) => {
        return !AuthUtil.isLoggedIn() ? <Redirect to="/users/login"/> : <Component {...props}/>
    }}/>
};
export default PrivateRoute;