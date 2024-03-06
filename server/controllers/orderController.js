import express from "express";
import { Order } from "../models/Order.js";
import { verifyTokenAuth, verifyTokenAdmin } from "../middlewares/verifyToken.js";


const orderController = express.Router();

// create a new cart (everyone can create that)
orderController.post('/', async (req, res) => {
    const order = new Object(req.body);
    try {
        const newOrder = await order.save();
        return res.status(200).json(newOrder);
    } catch (error) {
        return res.status(500).json(error.message)

    }
})

// update existing order (only admin can)
orderController.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        return res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// delete order
orderController.delete('/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        return res.status(200).json("Order successfully deleted!")

    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// get all orders (only admin)
orderController.get('/',  async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// get user orders
orderController.get('/find/:userId', verifyTokenAuth, async (req, res) => {
    try {
        const orders = await Order.findOne({userId: req.params.userId});
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

export default orderController;