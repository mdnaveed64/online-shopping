import {IProduct} from "../modules/products/models/IProduct";

export class CartUtil {

    private static PRODUCT_TAX:number = 5.0;

    public static calcTotal(cartItems : IProduct[]):number{
        let tempTotal : number = 0;
        for(let cartItem of cartItems){
            tempTotal += (cartItem.price * cartItem.qty);
        }
        return tempTotal;
    }

    public static calcTax(cartItems : IProduct[]):number{
        return CartUtil.calcTotal(cartItems) * CartUtil.PRODUCT_TAX / 100;
    }

    public static calcGrandTotal(cartItems : IProduct[]):number{
        return CartUtil.calcTotal(cartItems) + CartUtil.calcTax(cartItems);
    }

}