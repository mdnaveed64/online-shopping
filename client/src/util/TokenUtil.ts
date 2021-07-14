import axios from 'axios';

export class TokenUtil {

    public static setTokenHeader(token:string){
        if(token){
            axios.defaults.headers['x-auth-token'] = token;
        }
        else {
            delete axios.defaults.headers['x-auth-token'];
        }
    }

    public static setStripeKey(){
        axios.defaults.headers['Authorization'] = `Bearer pk_test_51Gp6XPGiODtWn5F0vtxvFvIwcU5cOQfH2ltufOmqQBXYEw5SGaWrg9uBP90Kl2CJaGFIrpFP79jQvDwM43vfjFuJ0097fvqDzq`;
    }

}