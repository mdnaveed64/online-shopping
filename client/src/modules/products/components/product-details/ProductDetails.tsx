import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import * as productActions from '../../../../redux/products/product.actions';
import * as productReducer from '../../../../redux/products/product.reducer';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../../layout/components/spinner/Spinner";
import * as orderActions from '../../../../redux/orders/order.actions';


interface URLParamsType{
    productId : string;
}
interface IProps {}
interface IState{
    qty : string;
}

let ProductDetails:React.FC<IProps> = () => {
    let dispatch = useDispatch();
    let history = useHistory();

    let {productId} = useParams<URLParamsType>();
    let [productQty , setProductQty] = useState({
        qty : ''
    });

    // get the product data from Redux Store
    let productState:productReducer.ProductState = useSelector((state : {products : productReducer.ProductState}) => {
        return state.products;
    });

    let {loading, product , errorMessage} = productState;

    useEffect(() => {
        dispatch(productActions.getProduct(productId));
    }, [productId]);

    // updateQtyInput
    let updateQtyInput = (event : React.ChangeEvent<HTMLSelectElement>) => {
        setProductQty({
            qty : event.target.value
        });
    };

    let submitAddToCart = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // dispatch action add to cart
        dispatch(orderActions.addToCart(product,Number(productQty.qty),history));
    };

    return (
        <React.Fragment>
            <section className="bg-brown text-dark p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 font-weight-bold">Selected Product</p>
                        </div>
                    </div>
                </div>
            </section>
            {/*<pre>{JSON.stringify(productQty)}</pre>*/}
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        {
                            Object.keys(product).length > 0 &&
                               <section>
                                   <div className="container mt-3">
                                       <div className="row align-items-center">
                                           <div className="col-md-5 text-center">
                                               <img src={product.image} alt="" className="img-fluid "/>
                                           </div>
                                           <div className="col-md-7  text-left">
                                               <p className="h3">NAME : <b>{product.name}</b></p>
                                               <p className="h3">Brand : <b>{product.brand}</b></p>
                                               <p className="h5">Price : <b className="text-danger">&#8377; {product.price.toFixed(2)}</b></p>
                                               <form onSubmit={submitAddToCart}>
                                                   <div className="form-group">
                                                       <select
                                                           required
                                                           value={productQty.qty}
                                                           onChange={updateQtyInput}
                                                           className="form-control">
                                                           <option value="">Select Qty</option>
                                                           <option value="1">1</option>
                                                           <option value="2">2</option>
                                                           <option value="3">3</option>
                                                           <option value="4">4</option>
                                                           <option value="5">5</option>
                                                       </select>
                                                       <input type="submit" className="btn btn-brown btn-sm text-dark" value="add to Cart"/>
                                                   </div>
                                               </form>
                                               <p>{product.usage}</p>
                                               <p>{product.description}</p>
                                           </div>
                                       </div>
                                   </div>
                               </section>
                        }
                    </React.Fragment>
            }
        </React.Fragment>
    )
}

export default ProductDetails;
