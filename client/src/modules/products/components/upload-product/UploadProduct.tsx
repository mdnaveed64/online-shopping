import React, {useState} from 'react';
import {IProduct} from "../../models/IProduct";
import * as productActions from '../../../../redux/products/product.actions';
import * as userReducer from '../../../../redux/users/user.reducer';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';

interface IProps{}
interface IState{
    product : IProduct
}

let UploadProduct:React.FC<IProps> = () => {
    let history = useHistory();
    let dispatch = useDispatch();

    let [productState , setProductState] = useState<IState>({
        product : {} as IProduct
    });

    let userState:userReducer.UserState = useSelector((state : {users : userReducer.UserState}) => {
        return state.users;
    });

    let {user} = userState;

    let {product} = productState;

    let updateInput = (event : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setProductState({
            product : {
                ...productState.product,
                [event.target.name] : event.target.value
            }
        });
    };

    let updateImage = async (event:React.ChangeEvent<HTMLInputElement | any>) => {
        let imageFile:Blob = event.target.files[0];
        let base64Image:string | ArrayBuffer = await convertBase64String(imageFile);
        setProductState({
            ...productState,
            product : {
                ...productState.product,
                image : base64Image.toString()
            }
        });
    };

    let convertBase64String = (imageFile:Blob):Promise<string | ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.addEventListener('load', () => {
                if(fileReader.result){
                    resolve(fileReader.result);
                }
                else {
                    reject('Error Occurred');
                }
            })
        });
    };

    let submitUploadProduct = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // dispatch to server
        dispatch(productActions.uploadProduct(product , history));
    };

    return (
        <React.Fragment>
            <section className="bg-brown text-dark p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 font-weight-bold">Upoload Products</p>
                        </div>
                    </div>
                </div>
            </section>
          {/*  <pre>{JSON.stringify(productState)}</pre>*/}
            <section>
                <div className="container">
                    {
                        // if user is an ADMIN
                        user && user.isAdmin ?
                            <React.Fragment>
                                <div className="row">
                                    <div className="col mt-3">
                                        <p className="h3">Upload Products Here</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad, dicta earum eligendi eos explicabo fuga id, in labore natus, nobis non provident qui quod ratione reiciendis reprehenderit tempore veritatis!</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8">
                                        <form onSubmit={submitUploadProduct}>
                                            <div className="form-group mt-3">
                                                <input
                                                    required
                                                    name="name"
                                                    value={product.name}
                                                    onChange={updateInput}
                                                    type="text" className="form-control" placeholder="Name"/>

                                            </div>
                                            <div className="form-group mt-3">
                                                <input
                                                    required
                                                    name="brand"
                                                    value={product.brand}
                                                    onChange={updateInput}
                                                    type="text" className="form-control" placeholder="Brand"/>
                                            </div>
                                            <div className="form-group mt-3">
                                                <input
                                                    required
                                                    name="image"
                                                    onChange={updateImage}
                                                    className="form-control" type="file" id="formFile"/>
                                                {
                                                    product.image?.length > 0 &&
                                                    <img src={product.image} alt="" width="20" height="25"/>
                                                }
                                            </div>
                                            <div className="form-group mt-3">
                                                <input
                                                    required
                                                    name="price"
                                                    value={product.price}
                                                    onChange={updateInput}
                                                    type="number" className="form-control" placeholder="Price"/>
                                            </div>
                                            <div className="form-group mt-3">
                                                <input
                                                    required
                                                    name="qty"
                                                    value={product.qty}
                                                    onChange={updateInput}
                                                    type="number" className="form-control" placeholder="Qty"/>
                                            </div>
                                            <div className="form-group mt-3">
                                                <select
                                                    required
                                                    name="category"
                                                    value={product.category}
                                                    onChange={updateInput}
                                                    className="form-control">
                                                    <option value="">Select a Category</option>
                                                    <option value="MEN">Men's Collection</option>
                                                    <option value="WOMEN">Women's Collection</option>
                                                    <option value="KIDS">Kids's Collection</option>
                                                </select>
                                            </div>
                                            <div className="form-group mt-3">
                                    <textarea
                                        required
                                        name="description"
                                        value={product.description}
                                        onChange={updateInput}
                                        rows={3} className="form-control" placeholder="Description"/>
                                            </div>
                                            <div className="form-group mt-3">
                                    <textarea
                                        required
                                        name="usage"
                                        value={product.usage}
                                        onChange={updateInput}
                                        rows={3} className="form-control" placeholder="Usage"/>
                                            </div>
                                            <div className="form-group mt-2">
                                                <input type="submit" className="btn btn-dark text-brown btn-sm" value="Upload"/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </React.Fragment> :
                            <React.Fragment>
                                <div className="container mt-3">
                                    <div className="row">
                                        <div className="col text-center">
                                            <p className="h3 text-danger">
                                                Hey <b>{user.name} !! </b>
                                                You are not Authorized to Upload any Product!!</p>
                                            <small><b>NOTE : If you really wants to upload products, <br/> please contact the Admin to grant you access</b></small>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                    }
                </div>
            </section>
            <div style={{marginBottom : '50px'}}/>
        </React.Fragment>
    );
};
export default UploadProduct;