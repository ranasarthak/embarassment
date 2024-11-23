import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017");

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength:20
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 15
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 15
    }
})

const todoSchema = new mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false,
    }
})

export const User = mongoose.model('User', userSchema);
export const Todo = mongoose.model('Todo', todoSchema);


