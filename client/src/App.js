import React from "react";
import './App.css';
import Homepage from "./pages/Homepage";
import {BrowserRouter, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {Routes} from "react-router";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import ProductList from "./pages/ProductList/ProductList";



function App() {
  return (
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route index path= "/" element= {<Homepage/>}/>
          <Route path= "products/:category" element={<ProductList/>}/>
          <Route path= "/login" element= {<Login />}/>
          <Route path= "/register" element={<Register/>}/>
          <Route path= "/cart"  element={<Cart/>}/>
        </Routes>
      </BrowserRouter>

  );
}

export default App;
