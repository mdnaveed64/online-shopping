import React, {useEffect, useState} from 'react';
import * as userActions from '../../../../redux/users/user.actions';
import * as userReducer from '../../../../redux/users/user.reducer';
import {useDispatch , useSelector} from "react-redux";
import Spinner from "../../../layout/components/spinner/Spinner";
import {IAddress} from "../../models/IUser";

interface IProps{}

let UserProfile:React.FC<IProps> = () => {
    let dispatch = useDispatch();

    let [enableState , setEnableState] = useState({
        isEnable : false
    });

    let [addressState , setAddressState] = useState<IAddress>({
        mobile : '',
        flat : '',
        street : '',
        landmark : '',
        city : '',
        state : '',
        country : '',
        pin : ''
    });

    let changeAddressInput = (event : React.ChangeEvent<HTMLInputElement>) => {
        setAddressState({
            ...addressState,
            [event.target.name] : event.target.value
        });
    };

    let switchEnableState = (event : React.ChangeEvent<HTMLInputElement>) => {
        setEnableState({
            isEnable: event.target.checked
        })
    };

    // read the user data from Redux Store
    let userState:userReducer.UserState = useSelector((state : {users : userReducer.UserState}) => {
        return state.users;
    });

    let {loading , user} = userState;

    // update the user data from store to local state
    useEffect(() => {
        setAddressState({
            ...addressState,
            mobile : user && user.address ? user.address.mobile : '',
            flat : user && user.address ? user.address.flat : '',
            street : user && user.address ? user.address.street : '',
            landmark : user && user.address ? user.address.landmark : '',
            city : user && user.address ? user.address.city : '',
            state : user && user.address ? user.address.state : '',
            country : user && user.address ? user.address.country : '',
            pin : user && user.address ? user.address.pin : ''
        })
    }, [user]);



    let submitUpdateAddress = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(userActions.updateAddress(addressState));
        setEnableState({
            isEnable: false
        });
    };

    return (
        <React.Fragment>
            <section className="bg-brown text-dark p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 font-weight-bold">
                               <i  className="fa fa-user-circle"/> Your Profile</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        {
                            Object.keys(user).length > 0 &&
                            <section>
                                <div className="container mt-3">
                                    <div className="row">
                                        <div className="col-md-4 text-center">
                                            <img src={user.avatar} alt="" className="img-fluid rounded-circle profile-img"/>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card">
                                                <div className="card-header bg-dark text-brown">
                                                    <p className="h4">Your Information</p>
                                                </div>
                                                <div className="card-body bg-brown">
                                                    <ul className="list-group">
                                                        <li className="list-group-item">
                                                            NAME : {user.name}
                                                        </li>
                                                        <li className="list-group-item">
                                                            Email : {user.email}
                                                        </li>
                                                        <li className="list-group-item">
                                                            Mobile : {user.address?.mobile}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="card mt-3">
                                                <div className="card-header bg-dark text-brown">
                                                    <div className="row">
                                                        <div className="col">
                                                            <p className="h4 float-left">Billing Address</p>
                                                        </div>
                                                        <div className="col">
                                                            <span className="form-check form-switch float-right">
                                                                <input
                                                                    onChange={switchEnableState}
                                                                    className="form-check-input" type="checkbox"
                                                                       id="flexSwitchCheckChecked"/>
                                                                    <label className="form-check-label"
                                                                           htmlFor="flexSwitchCheckChecked">Enable Address</label>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body bg-brown">
                                                    {
                                                        !enableState.isEnable &&
                                                        <ul className="list-group">
                                                            <li className="list-group-item">
                                                                <small>Mobile : {addressState.mobile}</small><br/>
                                                                <small>Flat : {addressState.flat}</small><br/>
                                                                <small>Street : {addressState.street}</small><br/>
                                                                <small>Landmark : {addressState.landmark}</small><br/>
                                                                <small>City : {addressState.city}</small><br/>
                                                                <small>State : {addressState.state}</small><br/>
                                                                <small>Country : {addressState.country}</small><br/>
                                                                <small>Pin : {addressState.pin}</small><br/>
                                                            </li>
                                                        </ul>
                                                    }
                                                    {
                                                        enableState.isEnable &&
                                                            <form onSubmit={submitUpdateAddress} className="animation zoomIn">
                                                                <div className="input-group mb-3">
                                                                    <span className="input-group-text bg-dark text-brown">Mobile</span>
                                                                    <input
                                                                        autoFocus
                                                                        required
                                                                        name="mobile"
                                                                        value={addressState.mobile}
                                                                        onChange={changeAddressInput}
                                                                        type="text" className="form-control"/>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <span className="input-group-text bg-dark text-brown">Flat</span>
                                                                    <input
                                                                        required
                                                                        name="flat"
                                                                        value={addressState.flat}
                                                                        onChange={changeAddressInput}
                                                                        type="text" className="form-control"/>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <span className="input-group-text bg-dark text-brown">Street</span>
                                                                    <input
                                                                        required
                                                                        name="street"
                                                                        value={addressState.street}
                                                                        onChange={changeAddressInput}
                                                                        type="text" className="form-control"/>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <span className="input-group-text bg-dark text-brown">Landmark</span>
                                                                    <input
                                                                        required
                                                                        name="landmark"
                                                                        value={addressState.landmark}
                                                                        onChange={changeAddressInput}
                                                                        type="text" className="form-control"/>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <span className="input-group-text bg-dark text-brown">City</span>
                                                                    <input
                                                                        required
                                                                        name="city"
                                                                        value={addressState.city}
                                                                        onChange={changeAddressInput}
                                                                        type="text" className="form-control"/>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <span className="input-group-text bg-dark text-brown">State</span>
                                                                    <input
                                                                        required
                                                                        name="state"
                                                                        value={addressState.state}
                                                                        onChange={changeAddressInput}
                                                                        type="text" className="form-control"/>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <span className="input-group-text bg-dark text-brown">Country</span>
                                                                    <input
                                                                        required
                                                                        name="country"
                                                                        value={addressState.country}
                                                                        onChange={changeAddressInput}
                                                                        type="text" className="form-control"/>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <span className="input-group-text bg-dark text-brown">Pin</span>
                                                                    <input
                                                                        required
                                                                        name="pin"
                                                                        value={addressState.pin}
                                                                        onChange={changeAddressInput}
                                                                        type="text" className="form-control"/>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <input type="submit" className="btn btn-dark btn-sm text-brown" value="Update"/>
                                                                </div>
                                                            </form>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{marginBottom : '150px'}}/>
                            </section>
                        }
                    </React.Fragment>
            }
        </React.Fragment>
    );
};
export default UserProfile;