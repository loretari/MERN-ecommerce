import React from "react";
import "./adminEmployee.css";
import { Link } from "react-router-dom";

const AdminEmployee = () => {




    return (
        <div className="user">
            {/*<div className="userTitleContainer">*/}
            {/*    <Link to="/">*/}
            {/*        <button className="userAddButton" onClick={handleClick}>Back </button>*/}
            {/*    </Link>*/}
            {/*    <h1 className="userTitle">Edit Employee</h1>*/}
            {/*    <Link to="/newEmployee">*/}
            {/*        <button className="userAddButton">Create</button>*/}
            {/*    </Link>*/}
            {/*</div>*/}
            {/*<div className="userContainer">*/}
            {/*    <div className="userShow">*/}
            {/*        <div className="userShowTop">*/}
            {/*            <div className="userShowTopTitle">*/}
            {/*                <span className="userShowUsername">{updatedEmployee[0].firstName} &nbsp;*/}
            {/*                    <span className="userShowUsername">{updatedEmployee[0].lastName}</span></span>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="userShowBottom">*/}
            {/*            <span className="userShowTitle">Created at:</span>*/}
            {/*            <div className="userShowInfo">*/}
            {/*                <span className="userShowInfoTitle">{format(updatedEmployee[0].createdAt)}</span>*/}
            {/*            </div>*/}
            {/*            <span className="userShowTitle">Contact Details:</span>*/}
            {/*            <div className="userShowInfo">*/}
            {/*                <span className="userShowInfoTitle">{updatedEmployee[0].mail}</span>*/}
            {/*            </div>*/}
            {/*            <div className="userShowInfo">*/}

            {/*                <span className="userShowInfoTitle">{updatedEmployee[0].phone}</span>*/}
            {/*            </div>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="userUpdate">*/}
            {/*        <span className="userUpdateTitle">Edit</span>*/}
            {/*        <form className="userUpdateForm">*/}
            {/*            <div className="userUpdateLeft">*/}
            {/*                <div className="userUpdateItem">*/}
            {/*                    <label>Username</label>*/}
            {/*                    <input*/}
            {/*                        type="text"*/}
            {/*                        placeholder=""*/}
            {/*                        className="userUpdateInput"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*                <div className="userUpdateItem">*/}
            {/*                    <label>Email</label>*/}
            {/*                    <input*/}
            {/*                        type="text"*/}
            {/*                        placeholder=""*/}
            {/*                        className="userUpdateInput"*/}
            {/*                    />*/}
            {/*                </div>*/}

            {/*                <button className="userUpdateButton" style={{ marginTop: 20, width: 100 }}>Update</button>*/}
            {/*            </div>*/}
            {/*        </form>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default AdminEmployee;