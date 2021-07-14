import React, {useEffect} from 'react';
import * as orderActions from '../../../../redux/orders/order.actions';
import * as orderReducer from '../../../../redux/orders/order.reducer';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../../layout/components/spinner/Spinner";

interface IProps{}

let OrderList:React.FC<IProps> = () => {
    let dispatch = useDispatch();

    let orderState:orderReducer.OrderState = useSelector((state : {orders : orderReducer.OrderState}) => {
        return state.orders;
    });

    let {loading, orderList} = orderState;

    useEffect(() => {
        dispatch(orderActions.getAllOrders());
    }, []);

    return (
        <React.Fragment>
            <section className="p-3 bg-brown">
                <div className="container ">
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                <i className="fa fa-list"/> Orders List</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        {
                            orderList.length > 0 ? <React.Fragment>
                                    <div className="container-fluid mt-3">
                                        <div className="row">
                                            <div className="col">
                                                <table className="table table-hover table-striped bg-brains text-center">
                                                    <thead className="bg-dark text-white">
                                                    <tr>
                                                        <th>Order ID</th>
                                                        <th>NAME</th>
                                                        <th>EMAIL</th>
                                                        <th>MOBILE</th>
                                                        <th>ITEMS</th>
                                                        <th>TOTAL</th>
                                                        <th>DATE</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        orderList.length > 0 ? <React.Fragment>
                                                            {
                                                                orderList.map(order => {
                                                                    return (
                                                                        <tr key={order._id}>
                                                                            <td>{order._id.substr(order._id.length - 5)}</td>
                                                                            <td>{order.name}</td>
                                                                            <td>{order.email}</td>
                                                                            <td>{order.mobile}</td>
                                                                            <td>
                                                                                <ul className="list-group">
                                                                                    {
                                                                                        order.items.map(item => {
                                                                                            return (
                                                                                                <React.Fragment>
                                                                                                    <li className="list-group-item">
                                                                                                        NAME : {item.name} {" "}
                                                                                                        Qty : {item.qty} {" "}
                                                                                                        Price : {item.price} {" "}
                                                                                                    </li>
                                                                                                </React.Fragment>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </ul>
                                                                            </td>
                                                                            <td>&#8377;{(Number(order.total) + Number(order.tax)).toFixed(2)}</td>
                                                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </React.Fragment> : null
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment> :
                                <React.Fragment>
                                    <p className="h3">------------ No Orders Found ----------</p>
                                </React.Fragment>
                        }
                    </React.Fragment>
            }
        </React.Fragment>
    );
};
export default OrderList;