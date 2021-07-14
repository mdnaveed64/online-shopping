import React from 'react';
import * as alertReducer from '../../../../redux/alert/alert.reducer';
import {useSelector} from "react-redux";

interface IProps{}

let Alert:React.FC<IProps> = () => {
    let alertState:alertReducer.AlertState = useSelector((state : {alerts : alertReducer.AlertState}) => {
        return state.alerts;
    });

    let {alerts} = alertState;

    return (
        <React.Fragment>
            {
                alerts.length > 0 &&
                <div className={`alert alert-${alerts[0].color} alert-dismissible m-3 fixed-top animated slideInDown`}>
                    <button className="btn-close"/>
                    {
                        alerts.length > 0 &&
                        alerts.map(alert => {
                            return(
                                <div key={alert.id}>
                                    <small className="font-weight-bold">{alert.message}</small><br/>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </React.Fragment>
    );
};
export default Alert;