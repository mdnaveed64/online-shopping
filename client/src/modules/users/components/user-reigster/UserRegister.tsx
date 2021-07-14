import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import brand from "../../../../assets/img/brand.png";
import * as userActions from '../../../../redux/users/user.actions';
import {useDispatch} from 'react-redux';

interface IUser{
    name : string;
    email : string;
    password : string;
}
interface IUserError{
    nameError : string;
    emailError : string;
    passwordError : string;
}
interface IProps{}

let UserRegister:React.FC<IProps> = () => {
    let history = useHistory();
    let dispatch = useDispatch();

    let [userState , setUserState] = useState<IUser>({
        name : '',
        email : '',
        password : ''
    });

    let [userErrorState , setUserErrorState] = useState<IUserError>({
        nameError : '',
        emailError : '',
        passwordError : ''
    });

    // validate User
    let validateUser = (event : React.ChangeEvent<HTMLInputElement>) => {
        setUserState({...userState, name : event.target.value});
        let regExp = /^[a-zA-Z0-9_]{5,10}$/;
        (!regExp.test(event.target.value)) ?
            setUserErrorState({...userErrorState, nameError : 'Enter a Proper Name'}) :
            setUserErrorState({...userErrorState, nameError : ''})
    };

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

    let submitRegister = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(userActions.registerUser(userState , history));
    };

    return (
        <React.Fragment>
            <React.Fragment>
                <section className="bg-brown text-dark p-2">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <p className="h3 font-weight-bold">Register Here</p>
                            </div>
                        </div>
                    </div>
                </section>
               {/* <pre>{JSON.stringify(userState)}</pre>
                <pre>{JSON.stringify(userErrorState)}</pre>*/}
                <section className="p-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 m-auto">
                                <div className="card">
                                    <div className="card-header bg-dark text-brown">
                                        <p className="h3">Register Here</p>
                                    </div>
                                    <div className="card-body bg-form-light">
                                        <form onSubmit={submitRegister}>
                                            <div className="form-group">
                                                <input
                                                    name="name"
                                                    value={userState.name}
                                                    onChange={validateUser}
                                                    type="text" className={`form-control ${userErrorState.nameError.length > 0 ? 'is-invalid' : ''}`} placeholder="Name"/>
                                                {userErrorState.nameError.length > 0 ? <small className="text-danger font-weight-bold">{userErrorState.nameError}</small> : ''}
                                            </div>
                                            <div className="form-group mt-3">
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
                                                <input type="submit" value="Register" className="btn btn-dark btn-sm text-brown"/>
                                            </div>
                                            <span>Already have an Account?
                                            <Link to="/users/login">
                                                <strong> Login</strong>
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
        </React.Fragment>
    );
};
export default UserRegister;