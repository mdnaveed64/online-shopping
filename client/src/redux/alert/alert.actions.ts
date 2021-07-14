import {v4} from 'uuid';

export const SET_ALERT:string = 'SET_ALERT';
export const REMOVE_ALERT:string = 'REMOVE_ALERT';

export const setAlert = (message:string , color : string) => {
    let id = v4();
    return (dispatch) => {
        dispatch({type : SET_ALERT , payload : {id , message , color}});
        setTimeout(() => {
            dispatch(removeAlert(id));
        } , 2000);
    };
};

export const removeAlert = (id:string) => {
    return (dispatch) => {
        dispatch({type : REMOVE_ALERT , payload : {id : id}});
    };
};