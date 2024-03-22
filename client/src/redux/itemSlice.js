import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items: [],
    isFetching: false,
    error: false,

}

// register a new user
export const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        //get all Items (no action because is only fetching)
        getItemStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        getItemSuccess: (state, action) => {
            state.isFetching = false
            state.items = action.payload
        },
        getItemFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        //delete Items
        deleteItemStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        deleteItemSuccess: (state, action) => {
            state.isFetching = false
            //we remove the Item whose id matches with our specific Item
            state.items.splice(
                state.items.findIndex((item) => item._id === action.payload),1
            )
        },
        deleteItemFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        //update Items
        updateItemStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        updateItemSuccess: (state, action) => {
            state.isFetching = false
            state.items[
                state.items.findIndex((item) => item._id === action.payload.id)] = action.payload.item

        },
        updateItemFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        //add Item
        addItemStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        addItemSuccess: (state, action) => {
            state.isFetching = false
            state.items.push(action.payload)

        },
        addItemFailure: (state) => {
            state.isFetching = false
            state.error = true
        }
    },
    })

export const {addItemFailure, addItemStart, addItemSuccess,
    deleteItemFailure, deleteItemStart, deleteItemSuccess,
    getItemFailure, getItemStart, getItemSuccess, updateItemFailure,
    updateItemStart, updateItemSuccess} = itemSlice.actions;
export default itemSlice.reducer;