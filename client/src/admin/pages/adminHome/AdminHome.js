import React from "react";
import "./adminHome.css";
import AdminContainer from "../../adminContainer/AdminContainer";

const AdminHome = () => {


    return (
        <div className= "home">
            <div className= "homeWidgets">
                <AdminContainer/>
            </div>
        </div>
    )
}

export default AdminHome;