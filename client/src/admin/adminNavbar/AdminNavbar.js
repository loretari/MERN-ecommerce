import React, {useState} from "react";
import "./adminNavbar.css";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/userSlice";
import {useNavigate} from "react-router";


const AdminNavbar = ({ currentPage, handlePageChange }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);


    function MouseOver(event) {
        event.target.style.background = 'Transparent';
    }

    function MouseOut(event) {
        event.target.style.background = 'Transparent';
    }

    const handleLogout =(e) => {
      e.preventDefault();
      dispatch(logout);
      navigate('/');
    }

    return (
        <>
            <nav className= "navbar" role= "navigation" aria-label= "main navigation">
                <div className= "navbar-brand">
                    <a
                        onClick={() => {
                            setIsActive(!isActive);
                        }}
                        role="button"
                        className={`navbar-burger burger has-text-white ${isActive ? "is-active" : ""}`}

                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div   className={`navbar-menu ${isActive ? "is-active" : ""}`}>
                    <div className="navbar-start">
                        <ul ><li className= "adminLi">
                            <a style = {{color: "white"}} onMouseOver= {MouseOver} onMouseOut= {MouseOut}
                               href= "#home"
                               onClick= {() => handlePageChange('Home')}
                               className= {`${'navbar-item has-text-white'} currentPage === 'Home' 
          ? 'nav-link active' 
          : 'nav-link'  `}
                            >
                                Home
                            </a></li><li className= "adminLi">
                            <a style = {{color: "white"}} onMouseOver= {MouseOver} onMouseOut= {MouseOut}
                               href= "#products"
                               onClick={() => handlePageChange('AdminProducts')}
                               className={`${'navbar-item has-text-white'} currentPage === 'AdminProducts' 
          ? 'nav-link active' 
          : 'nav-link'`}
                            >
                                Products
                            </a></li>
                            <li className= "adminLi">
                                <a style = {{color: "white"}} onMouseOver= {MouseOver} onMouseOut= {MouseOut}
                                   href="#users"
                                   onClick={() => handlePageChange('AdminUsers')}
                                   className={`${'navbar-item has-text-white'} currentPage === 'AdminUsers' 
          ? 'nav-link active' 
          : 'nav-link'`}
                                >
                                    Users
                                </a></li>
                            <li className= "adminLi">
                                <a style = {{color: "white"}} onMouseOver= {MouseOver} onMouseOut= {MouseOut}
                                   href="#recipes"
                                   onClick={() => handlePageChange('Recipes')}
                                   className={`${'navbar-item has-text-white'} currentPage === 'Recipes' 
          ? 'nav-link active' 
          : 'nav-link'`}
                                >
                                    Recipes
                                </a></li>

                            <li className='adminLi'>
                                <a style={{color:"white"}}onMouseOver={MouseOver} onMouseOut={MouseOut}
                                   href="#staff"
                                   onClick={() => handlePageChange('AdminEmployees')}
                                   className={`${'navbar-item has-text-white'} currentPage === 'AdminEmployees' 
          ? 'nav-link active' 
          : 'nav-link'`}
                                >
                                    Staff
                                </a></li>
                            <li className='adminLi'>
                                <a style={{color:"white"}}onMouseOver={MouseOver} onMouseOut={MouseOut}
                                   href="#items"
                                   onClick={() => handlePageChange('Items')}
                                   className={`${'navbar-item has-text-white'} currentPage === 'Items' 
          ? 'nav-link active' 
          : 'nav-link'`}
                                >
                                    Stock
                                </a></li>
                            <button onClick={handleLogout} className="logout">
                                Log Out
                            </button>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default AdminNavbar;