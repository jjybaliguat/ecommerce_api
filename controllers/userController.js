import mongoose from "mongoose";
import asyncHandler from 'express-async-handler'
import User from "../model/userModel.js";

export const createUser = asyncHandler(async(req, res) => {
    const {email, mobile} = req.body
    const emailExist = await User.findOne({email})
    const mobileExist = await User.findOne({mobile})
    if(emailExist){
        res.status(400)
        throw new Error("User already exist.")
    }
    if(mobileExist){
        res.status(400)
        throw new Error("Mobile number already taken, please try another one.")
    }
    const user = await User.create(req.body)
    res.status(200).json(user)
})

export const login = asyncHandler( async(req, res) => {
    const { email, password } = req.body

    const findUser = await User.findOne({email})

    if(findUser && await findUser.isPasswordMatched(password)){
        res.json(findUser)
    }else{
        res.status(400)
        throw new Error("Invalid credentials")
    }
})