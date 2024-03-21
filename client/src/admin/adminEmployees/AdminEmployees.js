import React, {useEffect} from "react";
import "./adminEmployees.css";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {DataGrid} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteEmployeeSuccess, getEmployeeFailure, getEmployeeSuccess} from "../../redux/employeeSlice";
import axios from "axios";

const AdminEmployees = () => {

    const employees = useSelector((state) => state.employee.employees)

    const dispatch = useDispatch();

    useEffect(() => {
        const getEmployees = async () => {

            try {
                const res = await axios.get(`http://localhost:5001/admin/employee`)

                if (res.status === 200) {
                    const data = res.data;
                    dispatch (getEmployeeSuccess(data));
                } else {
                    console.error("Failed to fetch employees")
                }

            } catch (error) {
                console.error("Axios error:", error.message)
                dispatch(getEmployeeFailure(error))
            }
        }
        getEmployees();

        }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteEmployeeSuccess, {id})
    }
    

    const columns = [
        // { field: '_id', headerName: 'ID', width: 200 },
        {
            field: "firstName",
            headerName: "Name",
            width: 160,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        {params.row.firstName}
                    </div>
                );
            },
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            width: 150,
            editable: true,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
            editable: true,
        },
        {
            field: 'mail',
            headerName: 'Mail',
            width: 130,
            editable: true,
        },
        {
            field: 'salary',
            headerName: 'Salary',
            width: 130,
            editable: true,
        },
        {
            field: "phone",
            headerName: "Phone",
            width: 130,
        },
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/admin/employee" + params.row.id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutlineOutlinedIcon
                            className="productListDelete"
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </>
                );
            },
        },

    ];

    return (
        <div className= "createNewEmployee">
            <Link to= "/newEmployee">
                <button className= "newProductButton">Create Employee</button>
            </Link>
            <DataGrid
                rows = {employees}
                columns = {columns}
                getRowId = {(row) => row.id}
                pageSize={8}
                rowsPerPageOptions={[8]}
                // checkboxSelection
                disableSelectionOnClick
            />
        </div>
    )

}

export default AdminEmployees;