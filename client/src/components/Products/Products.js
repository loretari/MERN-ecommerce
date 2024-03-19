import React, {useEffect, useState} from "react";
import "./products.css";
import {useLocation} from "react-router";
import axios from "axios";
import Product from "../Product/Product";
import {useDispatch, useSelector} from "react-redux";
import { sortProducts} from "../../redux/productSlice";


const Products = ({cat, sort}) => {

    const [products, setProducts] = useState([]);
    // const products = useSelector((state) => state.product.products);
    const category = useLocation().pathname.split("/")[2];
    const dispatch = useDispatch();

    // get products, if there is a category retrieves only few of them otherwise all of them
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/products?category=${category}`)
                if (res.status === 200) {
                    const data = res.data;
                    if (data.length !== 0) {
                        setProducts(data);
                    } else {
                        console.warn("No items found for category:", cat);
                    }
                } else {
                    console.error("Failed to fetch items:", res.statusText);
                }
            } catch (error) {
                console.error('Axios error :', error);
            }
        }
        getProducts();
    }, [cat, category]);



    useEffect(() => {

         dispatch(sortProducts(sort))
            // if (sort === "") {
            //     setProducts(prev => [...prev].sort((a, b) => a.createdAt - b.createdAt))
            // } else if (sort === "asc"){
            //     setProducts(prev => [...prev].sort((a, b) => a.price - b.price))
            // } else {
            //     setProducts(prev => [...prev].sort((a, b) => b.price - a.price))
            // }


    }, [sort, dispatch]);

    const sortedProducts = [...products].sort((a, b) => {

        if (sort === "asc") {
            return a.price - b.price;
        } else if (sort === "desc") {
            return b.price - a.price;
        } else if (sort === "newest"){
           return new Date(b.createdAt) - new Date(a.createdAt)      };
    }
    )
    console.log( sortedProducts);

    return (
        <div className= "products-container">

            {sortedProducts.map((item) => (

              <Product item={item} key = {item.id}/>))}
        </div>
    )
}

export default Products;