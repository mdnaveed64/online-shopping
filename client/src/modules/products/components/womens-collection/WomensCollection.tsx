import React, {useEffect} from 'react';
import * as productActions from '../../../../redux/products/product.actions';
import * as productReducer from '../../../../redux/products/product.reducer';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../../layout/components/spinner/Spinner";
import {Link, useHistory} from "react-router-dom";
import {IProduct} from "../../models/IProduct";
import * as orderActions from "../../../../redux/orders/order.actions";

interface IProps{}

let WomensCollection:React.FC<IProps> = () => {
    let dispatch = useDispatch();
    let history = useHistory();

    // get Products info from Redux Store
    let productState:productReducer.ProductState = useSelector((state : {products : productReducer.ProductState}) => {
        return state.products;
    });

    let {loading , products , errorMessage} = productState;

    useEffect(() => {
        dispatch(productActions.getWomenProductsCollection());
    }, []);

    // clickAddToCart
    let clickAddToCart = (product : IProduct) => {
        let defaultQty:number = 1;
        dispatch(orderActions.addToCart(product, defaultQty, history));
    };

    return (
        <React.Fragment>
            <section className="bg-brown text-dark p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 font-weight-bold">Women's Collection</p>
                        </div>
                    </div>
                </div>
            </section>

            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        <section className="p-3">
                            <div className="container">
                                <div className="row">
                                    {
                                        products.length > 0 &&
                                        products.map(product => {
                                            return (
                                                <div key={product._id} className="col-md-3">
                                                    <div className="card text-center">
                                                        <Link to={`/products/${product._id}`}>
                                                            <img src={product.image} alt="" width="180" height="330" className="m-auto d-block"/>
                                                        </Link>
                                                        <div className="card-body text-center">
                                                            <ul className="list-group">
                                                                <li className="list-group-item">
                                                                    <p className="h5">{product.name}</p>
                                                                    <span>{product.brand}</span>
                                                                    <p className="h6">&#8377; {product.price.toFixed(2)}</p>
                                                                    <button className="btn btn-brown btn-sm text-dark" onClick={clickAddToCart.bind(this,product)}>Add Cart</button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </section>
                    </React.Fragment>
            }
        </React.Fragment>
    );
};
export default WomensCollection;