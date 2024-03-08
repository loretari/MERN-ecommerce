import React, {useEffect, useState} from "react";
import "./product.css";
import {Link, useLocation} from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import NewsLetter from "../../components/Newsletter/Newsletter";
import Footer from "../../components/Footer/Footer";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import {useDispatch} from "react-redux";
import axios from "axios";
import {addProduct} from "../../redux/cartSlice";


const Product = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    // retrieving single product
    useEffect(() => {
           const getProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:5001/products/find/`+ id)
             setProduct(res.data);
        } catch (error) {
            console.error(error)
        }
        }
   getProduct()
    }, [id]);


    // handling quantity to put in the cart
    const handleQty = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity-1)
        } else {
            setQuantity(quantity+1)
        }
    }

    // update cart
    //calling the product action and passing price and quantity as payload
    const handleCart = () => {
        dispatch(addProduct({...product, quantity}))
    }

    return (
        <div>
            <Navbar />
        <div style={{ background: "#c5f0fc" }}>
      <Link to="/">
        <KeyboardBackspaceOutlinedIcon />
        </Link>
         </div>
            <div className= "product-wrapper">
                <div className= "product-imgContainer">
                    <img src={product.image} className= "productPage-image" alt= "product"/>
                </div>
                <div className= "product-infoContainer">
                    <h1>{product.title}</h1>
                    <p className= "product-desc">{product.description}</p>
                    <div className= "product-price">
                        <span>$ {product.price}</span>
                    </div>

                    <div className= "product-addContainer">
                        <div className= "product-amountContainer">
                            <svg onClick= {() => handleQty("dec")}
                                 className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                                 focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="RemoveIcon">
                                <path d="M19 13H5v-2h14v2z"></path>
                            </svg>
                            <div className= "product-amount">{quantity}</div>
                            <svg onClick= {() => handleQty("inc")}
                                 className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                                 focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddIcon">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                            </svg>
                        </div>
                        <button
                            onClick={handleCart}
                            className= "product-button">ADD TO CART</button>
                    </div>
                </div>
            </div>
            <NewsLetter />
            <Footer />
        </div>

    )
}

export default Product;