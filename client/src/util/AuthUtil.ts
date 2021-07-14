export class AuthUtil {

    public static isLoggedIn():boolean{
        return !!localStorage.getItem(process.env.REACT_APP_FEATURE_KEY);
    }

    public static getToken():string{
        return localStorage.getItem(process.env.REACT_APP_FEATURE_KEY);
    }
}