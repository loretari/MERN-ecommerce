import React from "react";
import './App.css';
import Homepage from "./pages/Homepage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import ProductList from "./pages/ProductList/ProductList";
import Product from "./pages/Product/Product";
import "react-toastify/dist/ReactToastify.css";
import Success from "./pages/Success";



function App() {

  return (
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route index path= "/" element= {<Homepage/>}/>
            <Route path= "/products/:category" element={<ProductList />} />
            <Route path= "/product/:id" element={<Product />} />
            <Route path= "/login" element= {<Login />}/>
            <Route path= "/register" element={<Register/>}/>
            <Route path= "/cart"  element={<Cart/>}/>
            <Route path= "/success" element={<Success/>}/>


            {/* no match route */}
            <Route
                path="**"
                element={
                    <main style={{ padding: "1rem" }}>
                        <p>There is nothing here!</p>
                    </main>
                }
            />

        </Routes>
      </BrowserRouter>

  );
}

export default App;
