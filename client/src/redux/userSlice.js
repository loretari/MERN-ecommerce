import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    isFetching: false,
    error: false,
    token: null,
}

   export const userSlice = createSlice({
       name: "user",
       initialState,
       reducers: {
           loginStart: (state) => {
               state.isFetching = true;
           },
           loginSuccess: (state, action) => {
               state.isFetching = false;
               state.currentUser = action.payload;
               state.token = action.payload.token;
           },
           loginFailure: (state) => {
               state.currentUser = null;
           },
           logout: (state) => {
               state.currentUser = null;
           },
           register: (state, action) => {
               state.isFetching = false;
               state.currentUser = action.payload.others;
               state.token = action.payload.token;
           },

       }
   })

export const { loginStart, loginSuccess, loginFailure, logout, register } = userSlice.actions;
export default userSlice.reducer;