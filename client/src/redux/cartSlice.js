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
             })
         }
    }
})

export const {addProduct} = cartSlice.actions;

export default cartSlice.reducer;