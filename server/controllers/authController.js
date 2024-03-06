import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const authController = express.Router();

// /auth/register register using cryptojs to encrypt password
authController.post('/register', async (req, res) => {
    try {
        const isExisting = await User.findOne({
            email: req.body.email
        })
        if (isExisting) {
            throw new Error("Already such an account with this email. Try a new one!");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({ ...req.body, password: hashedPassword });
        const {password, ...others} = newUser._doc;
        const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET)
        return res.status(201).json({others, token})

    } catch (error) {
        return res.status(500).json(error.message)
    }
})


// login
authController.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({
          email: req.body.email,
          username: req.body.username,
      })
        if (!user) {
            return res.status(401).json("No user existing with that username")
        }
        const comparePass = await bcrypt.compare(req.body.password, user.password);
        if (!comparePass) {
            throw new Error("Wrong password!")
        }

        // send everything but yhe pwd back
        const { password, ...others } = user._doc;
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {expiresIn: "360"})

        return res.cookie('access_token', token, {httpOnly: true}).status(200).json({...others, token});

    } catch (error) {
        return res.status(500).json({error: "Internal server error"})
    }
})




export default authController;