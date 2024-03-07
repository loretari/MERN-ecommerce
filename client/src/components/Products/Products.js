import React, {useEffect, useState} from "react";
import "./products.css";
import {useLocation} from "react-router";
import axios from "axios";

const Products = ({ cat, sort }) => {

     const [products, setProducts] = useState([]);
     const category = useLocation().pathname.split("/")[2];

    //get products, if there is a category retrieves only few of them otherwise all of them
   useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/products?category=${category}`)
                if (res.ok) {
                    const data = await res.json();
                    if (data.length !==0) {
                        setProducts(data);
                    } else {
                        console.warn("No items found for category:", cat);
                    }
                    setProducts(data);
                } else {
                    console.error("Failed to fetch itemsL", res.statusText);
                }
            } catch (error) {
                console.error('Axios error config:', error.config);
            }
        }
         getProducts();
   }, [cat, category]);

   useEffect(() => {
       if (sort === "") {
           setProducts(prev => [...prev].sort((a, b) => a.createdAt - b.createdAt))
       } else if (sort === "asc"){
           setProducts(prev => [...prev].sort((a, b) => a.price - b.price))
           } else {
              setProducts(prev => [...prev].sort((a, b) => b.price - a.price))
}
   }, [sort]);

    return (
          <div className= "products-container">
              {products.map((item) => (
                  <div>item = {item} key = {item.id}</div>
              ))}
          </div>
    )
}

export default Products;