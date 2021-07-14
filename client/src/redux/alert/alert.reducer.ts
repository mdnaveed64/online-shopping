import * as alertActions from './alert.actions';

export interface AlertArray {
    id: string;
    message : string;
    color : string;
}

export interface AlertState {
    alerts : AlertArray[]
}

let initialState:AlertState = {
    alerts : [] as AlertArray[]
};

export const reducer = (state = initialState , action):AlertState => {
    let {type , payload} = action;
    switch(type) {
        case alertActions.SET_ALERT:
            return {
                alerts : [...state.alerts , payload]
            };
        case alertActions.REMOVE_ALERT:
            let updatedAlerts =  state.alerts.filter(alert => alert.id !== payload.id);
            return {
                alerts: [...updatedAlerts]
            }
        default : return state;
    }
};









