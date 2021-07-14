import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import brand from "../../../../assets/img/brand.png";
import * as userActions from '../../../../redux/users/user.actions';
import {useDispatch} from 'react-redux';

interface IUser{
    email : string;
    password : string;
}
interface IUserError{
    emailError : string;
    passwordError : string;
}
interface IProps{}

let UserLogin:React.FC<IProps> = () => {
    let history = useHistory();
    let dispatch = useDispatch();

    let [userState , setUserState] = useState<IUser>({
        email : '',
        password : ''
    });

    let [userErrorState , setUserErrorState] = useState<IUserError>({
        emailError : '',
        passwordError : ''
    });

    // validate Email
    let validateEmail = (event : React.ChangeEvent<HTMLInputElement>) => {
        setUserState({...userState, email : event.target.value});
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        (!regExp.test(event.target.value)) ?
            setUserErrorState({...userErrorState, emailError : 'Enter a Proper Email'}) :
            setUserErrorState({...userErrorState, emailError : ''})
    };

    // validate Password
    let validatePassword = (event : React.ChangeEvent<HTMLInputElement>) => {
        setUserState({...userState, password : event.target.value});
        let regExp = /^[a-zA-Z0-9_]\w{6,14}$/;
        (!regExp.test(event.target.value)) ?
            setUserErrorState({...userErrorState, passwordError : 'Enter a Proper Password'}) :
            setUserErrorState({...userErrorState, passwordError : ''})
    };

    let submitLogin = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(userState);
        dispatch(userActions.loginUser(userState , history));
    };

    return (
        <React.Fragment>
            <section className="bg-brown text-dark p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 font-weight-bold">Login Here</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 m-auto">
                            <div className="card">
                                <div className="card-header bg-dark text-brown">
                                    <p className="h3">Login Here</p>
                                </div>
                                <div className="card-body bg-form-light">
                                    <form onSubmit={submitLogin}>
                                        <div className="form-group">
                                            <input
                                                name="email"
                                                value={userState.email}
                                                onChange={validateEmail}
                                                type="email" className={`form-control ${userErrorState.emailError.length > 0 ? 'is-invalid' : ''}`} placeholder="Email"/>
                                            {userErrorState.emailError.length > 0 ? <small className="text-danger font-weight-bold">{userErrorState.emailError}</small> : ''}
                                        </div>
                                        <div className="form-group mt-3">
                                            <input
                                                name="password"
                                                value={userState.password}
                                                onChange={validatePassword}
                                                type="password" className={`form-control ${userErrorState.passwordError.length > 0 ? 'is-invalid' : ''}`} placeholder="Password"/>
                                            {userErrorState.passwordError.length > 0 ? <small className="text-danger font-weight-bold">{userErrorState.passwordError}</small> : ''}
                                        </div>
                                        <div className="mt-2">
                                            <input type="submit" value="Login" className="btn btn-dark btn-sm text-brown"/>
                                        </div>
                                        <span>New to BrainsKart ?
                                            <Link to="/users/register">
                                                <strong> Register</strong>
                                            </Link>
                                        </span>
                                    </form>
                                </div>
                                <div className="card-footer bg-dark text-center">
                                    <img src={brand} alt="" width="150" height="30"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};
export default UserLogin;