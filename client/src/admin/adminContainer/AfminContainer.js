import React, {useState} from "react";
import "./adminContainer.css";
import Home from "../home/Home";

const AdminContainer = () => {

    const [currentPage, setCurrentPage] = useState('Home');

    const renderPage = () => {
        if (currentPage === 'Home') {
            return <Home/>
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