import express from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";

const userController = express.Router();

// update user
userController.put('/:id', async (req, res) => {
    // first check the password is pass
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req. body.password, 10);
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
           //take everything inside req,body and set it again
            $set: req.body
        }, {new: true})
        return res.status(200).json(updateUser)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})


export default userController;