import React, {useEffect, useState} from "react";
import "./adminProducts.css";
import {DataGrid} from "@mui/x-data-grid";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {deleteProductSuccess, getProductSuccess} from "../../redux/productSlice";
import axios from "axios";


const AdminProducts = () => {

     // const products = useSelector((state) => state.product.products);
     const [products, setProducts] = useState([]);

     const dispatch = useDispatch();

    //get products, if there is a category retrieves only few of them otherwise all of them
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/products/`)
                if (res.status === 200) {
                        setProducts(res.data);
                    } else {
                        console.error("Failed to fetch items:", res.statusText);
                    }
            } catch (error) {
                console.error('Axios error config:', error);
            }

        }
        getProducts();
    }, []);


    useEffect(() => {
         dispatch (getProductSuccess())
     }, [dispatch]);

     const handleDelete = (id) => {
         dispatch (deleteProductSuccess (id));
     }

     const columns = [
         {
             field: "_id", headerName: "ID", width: 100
         },
         {
             field: "product",
             headerName: "Product",
             width: 200,
             renderCell: (params) => {
                 return (
                     <div className="productListItem">
                         <img className="productListImg" src={params.row.image} alt="" />
                         {params.row.title}
                     </div>
                 );
             },
         },
         {
             field: "inStock",
             headerName: "Stock",
             width: 200,
         },

         {
             field: "price",
             headerName: "Price",
             width: 200,
         },


         {
             field: "action",
             headerName: "Action",
             width: 150,
             renderCell: (params) => {
                 return (
                     <>
                         <Link to= {"/admin/product/" + params.row._id}>
                             <button className="productListEdit">Edit</button>
                         </Link>
                         <DeleteOutlineOutlinedIcon
                             className="productListDelete"
                             onClick={() => handleDelete(params.row._id)}
                         />
                     </>
                 );
             },
         },

     ]

    return (
        <div className= "creatNewProduct">
            <Link to= "/newProduct">
                <button className= "newProductButton">Create New Product</button>
            </Link>
            <DataGrid
                rows = {products}
                columns = {columns}
                getRowId = {(row)=> row._id}
                pageSize={8}
                rowsPerPageOptions={[8]}
                disableSelectionOnClick
            />
        </div>
    )
}

export default AdminProducts;