import React, {useEffect, useState} from "react";
import "./newProduct.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {addProductSuccess} from "../../redux/productSlice";


const NewProduct = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [inStock, setInStock] = useState(true);
    const navigate = useNavigate();

    const { token } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleBack = () => {
        window.location.assign('/admin/home');
    }


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(e.target.files[0]);
        // setImage(e.target.files[0]);

        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewImage(event.target.result);
        };
        reader.readAsDataURL(file)
    }

    const handleCloseImg = () => {
        setImage('');
    }

    // const handleClick = async (e) => {
    //     e.preventDefault()
    //
    //     try {
    //         const formData = new FormData()
    //         let filename = null
    //
    //         if (image) {
    //             filename = Date.now() + image.name
    //             formData.append("filename", filename)
    //             formData.append("image", image)
    //
    //             await fetch(`http://localhost:5001/upload/image`, {
    //
    //                 method: "POST",
    //                 body: formData
    //             })
    //         }
    //
    //         // uploading product
    //         const res = await fetch(`http://localhost:5001/products`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 title,
    //                 description,
    //                 categories,
    //                 image: filename,
    //                 // image: image.name,
    //                 price,
    //                 inStock
    //
    //             })
    //         })
    //
    //         const product = await res.json()
    //         console.log("Product created", product)
    //         navigate(`/product/${product._id}`)
    //
    //     } catch (error) {
    //         console.error(error.message)
    //     }
    // }

    // const handleClick = async  (e) => {
    //     e.preventDefault();
    //
    //     const formData = new FormData();
    //     let filename = null;
    //     formData.append("filename", filename);
    //     formData.append("image", image);
    //     formData.append("title", title);
    //     formData.append("description", description);
    //     formData.append("categories", categories);
    //     formData.append("price", price);
    //
    //     try {
    //
    //        await axios.post("http://localhost:5001/upload/image", formData);
    //
    //
    //         const productData = {
    //             title,
    //             description,
    //             categories,
    //             image: filename,
    //             // image: image.name,
    //             price,
    //             inStock
    //
    //         };
    //         // uploading product
    //
    //         const response = await axios.post("http://localhost:5001/products", productData);
    //         const product = response.data;
    //
    //         dispatch(addProductSuccess(product))
    //         // window.location.assign('/admin/home');
    //
    //         navigate(`/product/${product._id}`)
    //         // console.log(item._id)
    //     } catch (error) {
    //         console.error(error.message);




    //   const handleClick = async  (e) => {
    //       e.preventDefault();
    //
    //       try {
    //           const formData = new FormData();
    //           let filename = null;
    //         if (image) {
    //     filename = Date.now() + image.name;
    //     formData.append('filename', filename);
    //     formData.append('image', image, image.name);
    //     formData.append('title', title);
    //     formData.append('description', description);
    //     formData.append('price', price);
    //
    //     const imageUploadResponse =  await fetch(`http://localhost:5001/upload/image`, {
    //
    //         method: "POST",
    //         body: formData
    //     });
    //
    //     if (imageUploadResponse) {
    //         const imageUploadData = await imageUploadResponse.json();
    //         console.log("Image uploaded successfully:", imageUploadData);
    //     } else {
    //         console.error('Failed to upload image');
    //     }
    //
    // }
    //
    //
    //  // uploading product
    //
    //           const response = await fetch(`http://localhost:5001/products`, {
    //               headers: {
    //                   'Content-Type': 'application/json',
    //
    //               },
    //               method: "POST",
    //               body: JSON.stringify({
    //
    //                   title,
    //                   description,
    //                   categories,
    //                   image: filename,
    //                   // image: image.name,
    //                   price,
    //                   inStock
    //
    //               })
    //           });
    //
    //
    //           const product = await response.json();
    //           console.log("Product created", product);
    //
    //           if (product.image_url) {
    //               const imageUrl = product.image_url;
    //               console.log("Image URL:", imageUrl);
    //           } else {
    //               console.error('Image URL is not provided in the response');
    //
    //
    //
    //           // if (!response) {
    //           //     console.log("Failed to create product)
    //           //
    //           //     if (product.image_url) {
    //           //         const imageResponse = await fetch(product.image_url);
    //           //         if (imageResponse.ok) {
    //           //         const imageData = await imageResponse.blob();
    //           //         const imageUrl = URL.createObjectURL(imageData);
    //           //         console.log("Image URL:", imageUrl);
    //           //
    //           //
    //           //     } else {
    //           //         console.error('Failed to fetch image data from server');
    //           //     }
    //           //
    //           //     } else {
    //           //         console.error('Product image URL is undefined');
    //           //     }
    //           // } else {
    //           //     console.error('Failed to create product');
    //           }
    //           dispatch(addProductSuccess(product))
    //           // window.location.assign('/admin/home');
    //
    //           navigate(`/product/${product._id}`)
    //           // console.log(item._id)
    //
    //       } catch (error) {
    //           console.error(error.message);
    //       }
    //
    //   }


    const handleClick = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData();
            formData.append("image", image);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("categories", categories);
            formData.append("price", price);
            formData.append("inStock", inStock);

            const uploadResponse = await axios.post(
                "http://localhost:5001/upload/image",
                formData
            );

            if (!uploadResponse.data || !uploadResponse.data.image_url) {
                throw new Error("Image URL is not provided in the response");
            }

            const productData = {
                title,
                description,
                categories,
                image: uploadResponse.data.image_url,
                price,
                inStock,
            };

            const response = await axios.post(
                "http://localhost:5001/products",
                productData
            );

            const product = response.data;

            dispatch(addProductSuccess(product));

            navigate(`/product/${product._id}`);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5001/products");
                const products = response.data;
                products.forEach((product) => dispatch(addProductSuccess(product)));
            } catch (error) {
                console.error("Failed to fetch products:", error.message)
            }
        };
        fetchProducts();
    }, [dispatch])

    return (
        <div className="user">

            <Link to= "/admin/home">
                <button onClick={ handleBack } className= "userAddButton">Back</button>
            </Link>
            <div className= "newProduct">
                <h1>New Product</h1>
                <form className= "addProductForm"
                      onSubmit={handleClick} encType= "multipart/form-data"
                >
                    <div className= "addProductItem">
                        <label>Image</label>
                        <input type= "file"
                               id= "image"
                               placeholder= "Image..."
                               onChange={handleImageChange}

                        />
                        {/*{previewImage &&*/}
                        {/*<img id="productImage"*/}
                        {/*     src={previewImage}*/}
                        {/*     alt="Selected Image Preview" />}*/}
                        <img id= "productImage" src={previewImage} alt= "Selected Image Preview" />
                        {/*{image &&*/}
                        {/*<p className= "imageName">*/}
                        {/*    {image.name}*/}
                        {/*<AiOutlineCloseCircle className= "closeIcon"*/}
                        {/*    onClick={handleCloseImg}*/}
                        {/*/>*/}
                        {/*</p>*/}
                        {/*}*/}
                    </div>
                    <div className= "addProductItem">
                        <label>Title:</label>
                        <input type= "text" name= "title" placeholder= ""
                               onChange= {(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className= "addProductItem">
                        <label>Description:</label>
                        <input name = "description" type= "text" placeholder= ""
                               onChange= {(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className= "addProductItem">
                        <label>Categories:</label>
                        <input type= "text" name= "categories" placeholder= ""
                               onChange= {(e) => setCategories(e.target.value)}
                        />
                    </div>

                    <div className= "addProductItem">
                        <label>Price:</label>
                        <input name = "price" type= "number" placeholder= ""
                               onChange= {(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className= "addProductItem">
                        <label>Stock:</label>
                        <select name= "inStock"
                                onChange= {(e) => setInStock(e.target.value)}
                        >
                            <option value= "true">Yes</option>
                            <option value= "false">No</option>
                        </select>
                    </div>
                    <button className= "addProductButton"
                    >Create</button>
                </form>
            </div>
        </div>
    )
}

export default NewProduct;