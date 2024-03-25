import React, {useEffect, useState} from "react";
import "./widgetLg.css";
import { format } from "timeago.js/esm/format";
import axios from "axios";


const WidgetLg = () => {

    const [orders, setOrders] = useState([]);

    console.log(orders);


    const Button = ({type}) => {
        return <button className= {"widgetLgButton" + type}>{ type }</button>
    }

    useEffect(() => {
       const getOrders = async () => {
           try {
               const response = await axios.get(`http://localhost:5001/orders`)

               setOrders(response.data);
           } catch (error) {
               console.error(error.message);
           }
       }
       getOrders();
    }, []);

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest transactions</h3>
            <div className="widgetLgTable">
                <div className="widgetLgTr">
                    <div className="widgetLgTh">Customer Id</div>
                    <div className="widgetLgTh">Date</div>
                    <div className="widgetLgTh">Amount</div>
                    <div className="widgetLgTh">Status</div>
                </div>
                {orders
                    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                    .map((order)=>(
                        <div className="widgetLgTr">
                            <div className="widgetLgUser">

                                <span className="widgetLgName">{order.userId}</span>
                            </div>
                            <div className="widgetLgDate">{format(order.createdAt)}</div>
                            <div className="widgetLgAmount">$ {order.amount}</div>
                            <div className="widgetLgStatus">
                                <Button type={order.status} />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default WidgetLg;