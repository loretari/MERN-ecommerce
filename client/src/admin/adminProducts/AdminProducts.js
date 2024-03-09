import React, {useState} from "react";
import "./adminProducts.css";
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { app } from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {updateProductSuccess} from "../../redux/productSlice";



const AdminProducts = () => {

    const location = useLocation();
    const productId = location.pathname.split('/')[3];
    const updatedProduct = useSelector((state) => state.product.products.find(product => product._id === productId));

    const [product, setProduct] = useState(updatedProduct);
    const [category, setCategory] = useState([]);
    const [img, setImg] = useState(null);

    const dispatch = useDispatch();

    const handleBack = () => {
        window.location.assign('/admin/home');
    }

    const handleChange = (e) => {
       setProduct (prev => {
           return {...prev, [e.target.name] : e.target.value}
       })
    }

    const handleCategories = (e) => {
       setCategory (e.target.value.split(','));
    }

    const handleClick = (e) => {
        e.preventDefault()

            //give the image an unique name
            const imageName = new Date().getTime() + img.name
            const storage = getStorage(app)
            const StorageRef = ref(storage, imageName)
            const uploadTask = uploadBytesResumable(StorageRef, img);

            //Firebase to manage the photo upload
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    //console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            // console.log('Upload is paused');
                            break;
                        case 'running':
                            //console.log('Upload is running');
                            break;
                        default:
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        //new product data
                        console.log({...product, image:downloadURL, categories:category});
                        const newProduct = { ...product, image: downloadURL, categories: category }
                        //console.log(newProduct)
                        dispatch(updateProductSuccess (newProduct))
                        window.location.assign('/admin/home')
                    });
                }
            );

    }

    return (
        <div className="user">
            <div className="userTitleContainer">

                <Link to= "/">
                    <button onClick={ handleBack } className= "userAddButton">Back</button>
                </Link>
                <h1 className="userTitle">Edit Product</h1>
                <Link to="/newProduct">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src= {updatedProduct.image}
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{updatedProduct.title}</span>

                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Price</span>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">$ {updatedProduct.price}</span>
                        </div>
                        <span className="userShowTitle">Description</span>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">{updatedProduct.description}</span>
                        </div>

                        <span className="userShowTitle">In Stock</span>

                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">{updatedProduct.inStock}</span>
                        </div>


                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Title</label>
                                <input
                                    name= "title"
                                    type="text"
                                    placeholder=""
                                    onChange={handleChange}
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Description</label>
                                <input
                                    name= "description"
                                    type="text"
                                    placeholder=""
                                    onChange={handleChange}
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Categories:</label>
                                <input
                                    type="text"
                                    placeholder=""
                                    onChange={handleCategories}
                                />
                            </div>

                            <div className="userUpdateItem">
                                <label>Price</label>
                                <input
                                    name= "price"
                                    type="number"
                                    placeholder=""
                                    onChange={handleChange}
                                    className="userUpdateInput"
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>In Stock</label>
                                <select
                                    name= "inStock" id= "idStock"
                                    onChange={handleChange}>
                                    <option value= "true">Yes</option>
                                    <option value= "false">No</option>
                                </select>
                            </div>

                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <input type="file" id="file" onChange={ e => setImg(e.target.files[0])}/>
                                <label htmlFor="file">

                                </label>
                                <input type="file" id="file" style={{ display: "none" }} />
                            </div>
                            <button className="userUpdateButton"
                                onClick={handleClick}
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminProducts;