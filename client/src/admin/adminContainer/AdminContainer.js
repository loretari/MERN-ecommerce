import React, {useState} from "react";
import "./adminContainer.css";
import Home from "../home/Home";
import AdminProducts from "../adminProducts/AdminProducts";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import AdminUser from "../adminUser/AdminUser";

const AdminContainer = () => {

    const [currentPage, setCurrentPage] = useState('Home');

    const renderPage = () => {
        if (currentPage === 'Home') {
            return <Home/>
        }
        if (currentPage === 'AdminProducts') {
          return <AdminProducts/>
        }
        return <AdminUser/>
    };

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div>
            <AdminNavbar currentPage = { currentPage } handlePageChange = { handlePageChange }/>
                { renderPage() }
        </div>
    )
}

export default AdminContainer;