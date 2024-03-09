import React, {useState} from "react";
import "./adminContainer.css";
import Home from "../home/Home";
import AdminProducts from "../adminProducts/AdminProducts";

const AdminContainer = () => {

    const [currentPage, setCurrentPage] = useState('Home');

    const renderPage = () => {
        if (currentPage === 'Home') {
            return <Home/>
        }
        if (currentPage === 'AdminProducts') {
          return <AdminProducts/>
        }
    };

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div>
            <div currentPage = { currentPage } hanndlePageChange = { handlePageChange }>
                { renderPage() }</div>
        </div>
    )
}

export default AdminContainer;