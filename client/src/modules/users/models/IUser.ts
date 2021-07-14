export interface IAddress {
    flat : string;
    street : string;
    landmark : string;
    city : string;
    state : string;
    country : string;
    pin : string;
    mobile : string;
}

export interface IUser{
    _id? : string;
    name : string;
    email : string;
    password : string;
    avatar : string;
    isAdmin : boolean;
    address : IAddress
}