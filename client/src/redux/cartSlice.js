import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    products: [],
    quantity: 0,
    total: 0
}

export const cartSlice = createSlice({
     name: "cart",
    initialState,
    reducers: {
         addProduct: (state, action) => {
             state.quantity += 1;
             state.products.push(action.payload);
             state.total += action.payload.price * action.payload.quantity;
             toast.success(`${action.payload.quantity} ${action.payload.title} added to cart!`, {
                 position: "bottom-left"
             });
         },

        cartEnd: (state, action) => {
             state.products = [];
             state.quantity = 0;
             state.total = 0;
        },

        removeProduct: (state, action) => {
             const id = action.payload._id;
             const newList = JSON.parse(localStorage.getItem("cartItems"));

             const updatedList = newList.filter(product => product._id !== id);

             state.products = updatedList;
             state.quantity -= 1;
             localStorage.setItem('cart', state.quantity);
             localStorage.setItem('cartItems', JSON.stringify(updatedList));
             toast.error("Product removed from cart.", {
                 position: "bottom-left"
             })
        },

        clearCart: (state, action) => {
           state.products = [];
           localStorage.setItem("cartItems", JSON.stringify(state.products));
           state.quantity = 0;
           localStorage.setItem("cart", state.quantity)
            toast.error("Cart cleared!", {
                position: "bottom-left"
            })
        },

        getTotals : (state, action) => {
             let { total, quantity } = state.products.reduce(
                 (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                 },
                 // initial value
                 {
                     total: 0,
                     quantity: 0,
                 }
             );
             total = parseFloat(total.toFixed(2));
             state.quantity = quantity;
             state.total = total;
        }
    }
})

export const {addProduct, cartEnd, removeProduct, getTotals, clearCart} = cartSlice.actions;

export default cartSlice.reducer;