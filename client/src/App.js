import React from "react";
import './App.css';
import Homepage from "./pages/Homepage";
import {BrowserRouter, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {Routes} from "react-router";
import Login from "./pages/Login/Login";



function App() {
  return (
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route index path= "/" element= {<Homepage/>}/>
          <Route path= "/login" element= {<Login />}/>
          <Route path= "/cart"  />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
