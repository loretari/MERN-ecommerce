import React, {useEffect, useState} from "react";
import "./cart.css";
import StripeCheckout from "react-stripe-checkout";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {clearCart, removeProduct} from "../../redux/cartSlice";


const Cart = () => {

    const stripePKey = "pk_test_51OyH9cIsGEkE0xD4nCXnSdQInI9sZdChNKtanSr4RjpDQcbyqwVtx0SnymUHPwtzjeaFHvWtxxPWV7FDDowbVUxy00wpiRgNWy"
    const cart = useSelector((state) => state.cart);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const user  = useSelector((state) => state.user.currentUser);

    const dispatch = useDispatch();

    const [stripeToken, setStripeToken] = useState(null);
    const {token} = useSelector((state) => state.user);

    const onToken = async (token) => {
        setStripeToken(token);
    }
    //     try {
    //         const response = await axios.post(`http://localhost:5001/orders`, {
    //             products: cart.products,
    //             total: cart.total,
    //             // total: cart.total,
    //             // token: stripeToken,
    //             userId: user._id,
    //         },
    //    {
    //            headers: {
    //                "Authorization": `Bearer ${token}`
    //              },
    //             }
    //             );
    //         console.log(response.data);
    //         dispatch(clearCart());
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };


   useEffect(() => {
       const paymentRequest = async () => {
           if (stripeToken) {
               try {

                   const orderData = {
                       products: cart.products.map((product) => ({
                           _id: product._id,
                           title: product.title,
                           description: product.description,
                           categories: product.categories,
                           price: product.price,
                           image: product.image,
                           inStock: product.inStock,
                           createdAt: product.createdAt,
                           updatedAt: product.updatedAt,
                           __v: product.__v,
                           quantity: product.quantity,
                       })),
                       address: "your_address_here",
                       amount: cart.total,
                       userId: user._id,

                   }
                   const res = await axios.post("http://localhost:5001/orders",
                       orderData,
                       {
                       headers: {
                           "Authorization": `Bearer ${user.token}`
                       },
                   })
                   console.log(res.data);
                   dispatch(clearCart());

               } catch (error) {
                   console.error(error);
               }
           }
       };

// paymentRequest();
           stripeToken && paymentRequest();
   }, [stripeToken, cart.total, dispatch, user.token, user._id]);

console.log(stripeToken)


   const handleCart = (product) => {
        dispatch(removeProduct(product))
       console.log(product);
   }

   const handleClearCart = () => {
        dispatch(clearCart())
   }

    return (
        <div>
            <Navbar />
            <div className= "cart-wrapper">
                <h1 className= "cart-title">YOUR BAG</h1>
                <div className= "cart-top">
                    <Link
                        onClick={() => window.scrollTo(0, 0)}
                        to= "/"
                    >
                        <button className= "cart-topButton">CONTINUE SHOPPING</button>
                    </Link>
                    <div className= "cart-topText">
                        <span>You have {cart.quantity} items in your cart</span>
                    </div>
                </div>
                {cart.products.length===0?<div style={{fontSize:24, display:"flex", justifyContent:"center", marginTop:60, marginBottom:80 }}>
                        Your cart is currently empty
                    </div>
                    :(

                        <div className= "cart-bottom">
                            <div className= "cart-info">
                                {/*<div className= "cart-hr" />*/}
                                <button className= "clear-cart clear-btn"
                                        onClick={() => handleClearCart()}>
                                    Clear Cart
                                </button>
                                {cart.products?.map((product, _id) => (

                                    <div key={_id} className= "cart-product">
                                        <div className= "cart-productDetail">
                                            <img src={product.image} alt= "product"/>
                                            <div className= "cart-details">
                                        <span >
                                            <b>Product:</b> {product.title}
                                        </span>
                                                <span>
                                            <b>Description:</b> {product.description}
                                        </span>
                                                <span>
                                            <b>ID:</b> {product._id}
                                        </span>
                                            </div>
                                        </div>
                                        <div className= "cart-priceDetail">
                                            <button className= "remove-button"
                                                    onClick={() => handleCart(product)}>
                                                REMOVE FROM CART
                                            </button>
                                            <div className= "cart-productAmountContainer">
                                                <svg
                                                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                                                    focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                                                    data-testid="RemoveIcon">
                                                    <path d="M19 13H5v-2h14v2z"></path>
                                                </svg>

                                                <div className= "cart-productAmount">Qty: {product.quantity}</div>
                                                <svg
                                                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                                                    focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                                                    data-testid="AddIcon">
                                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                </svg>
                                            </div>
                                            <div className= "cart-productPrice">$ {product.price * product.quantity }</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className= "cart-summary">
                                <h1 className= "cart-orderSummary">ORDER SUMMARY</h1>
                                <div className= "cart-summaryItem">
                                    <span>Subtotal</span>
                                    <span>$ {cart.total }.00</span>
                                </div>


                                <div className= "cart-summaryItemTotal" type="total">
                                    <span>Total</span>
                                    <span>$ {cart.total}.00</span>
                                </div>

                                {user? (
                                        <StripeCheckout
                                            name="LorDesIgn"
                                            billingAddress
                                            shippingAddress
                                            description={`Your total is $${cart.total}`}
                                            amount={cart.total * 100}
                                            token={onToken}
                                            stripeKey={stripePKey}
                                        >
                                            <button className="cart-button">CHECKOUT NOW</button>
                                        </StripeCheckout>
                                    )  : (
                                    // <Success />
                                        <Link to= "/login">
                                            <button>LOG IN TO CHECKOUT </button>
                                        </Link>

                                    )}
                            </div>
                        </div>
                    )}
            </div>
            <Footer />
        </div>

    )
}

export default Cart;