import express from "express";
import { Todo, User } from "../db"
import JWT_SECRET from "../config";
import jwt from "jsonwebtoken";
import { signinInputs, signupInputs } from "../zod";
import authMiddleware from "../middleware";



const userRouter = express.Router();


userRouter.post('/signup', async (req, res) => {
    const parsedInput = signupInputs.safeParse(req.body);

    if(!parsedInput.success){
        res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username
    })

    if(user){
        res.status(411).json({
            message: "User already exists"
        })
    }

    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })

    const userId = newUser.id;

    const token = jwt.sign({
       userId: userId
    },JWT_SECRET);

    res.json( {
        token: token,
        message: 'User created successfully'
    })
})

userRouter.post('/signin', async (req, res) => {
    const parsedInput = signinInputs.safeParse(req.body);

    if(!parsedInput.success){
        res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
        res.json({
            message: "User logged in successfully",
            token: token
        })
    }
    else{
        res.status(411).json({
            message: "User doesnt exist"
        })
    } 
})

userRouter.delete('/delete', authMiddleware, async(req, res) => {
    const id = req.userId;

    try {
        await Todo.deleteMany({
            userId: id
        })
        await User.deleteOne({
            _id: id
        })
        res.status(200).json({
            message: "User account deleted successfully."
        })
    } catch (error) {
        console.error("Unable to complete the request", error);
    }
})

export default userRouter;