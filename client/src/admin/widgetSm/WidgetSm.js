import React, {useEffect, useState} from "react";
import "./widgetSm.css";
import axios from "axios";


const WidgetSm = () => {

    const [users, setUsers] = useState([]);

console.log(users);

    const uniqueIds = new Set();

    users.forEach(user => {
        if (user._id) {
            if (uniqueIds.has(user._id)) {
                console.error(`Duplicate id found: ${user._id}`);
            } else {
                uniqueIds.add(user._id);
            }
        } else {
            console.error(`User object has undefined id: ${JSON.stringify(user)}`);
        }
    });

    console.log("All ids are unique.");

    useEffect(() => {
         const getUsers = async () => {
             try {
                 const response = await axios.get(`http://localhost:5001/users/?new=true`)
                 setUsers(response.data);

             } catch (error) {
                 console.error(error.message)
             }
         }
         getUsers();
    }, [])


    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">Existing Members</span>
            <ul className="widgetSmList">

                {/* sort user by first access*/}
                {users
                    .filter(user => user._id)
                    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                    .map((user) => (

                    <li className="widgetSmListItem" key={user._id}>
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername" key={`${user._id}_username`}>Name: {user.username}</span>
                            <span className="widgetSmUserTitle" key={`${user._id}_email`}>Mail: {user.email}</span>
                            <span className="widgetSmUserTitle" key={`${user._id}_createdAt`}>First Access: {user.createdAt}</span>

                    {/*<li className="widgetSmListItem" key={`${user.id}_item`}>*/}

                    {/*    <div className="widgetSmUser">*/}
                    {/*        <span className="widgetSmUsername">Name: {user.username}</span>*/}
                    {/*        <span className="widgetSmUserTitle">Mail: {user.email}</span>*/}
                    {/*        <span className="widgetSmUserTitle">First Access: {user.createdAt}</span>*/}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WidgetSm;