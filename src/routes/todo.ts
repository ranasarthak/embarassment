import express from 'express';
import authMiddleware from '../middleware';
import { createTodoInputs } from '../zod';
import { Todo } from '../db';

const todoRouter = express.Router();

todoRouter.post('/', authMiddleware, async(req,res) => {
    const parsedInput = createTodoInputs.safeParse(req.body);
    if(!parsedInput.success){
        res.status(400).json({
            message: "Invalid inputs."
        })
    }else{
        await Todo.create({
            userId: req.userId,
            title: req.body.title,
            description: req.body.description,
        })
        
        res.status(200).json({
            message: "New Todo created"
        })
    }
})

todoRouter.get('/', authMiddleware, async(req, res) => {
    try{
        const todos = await Todo.find({
            userId: req.userId
        });
        res.json({
            todos: todos
        })
    }catch(error){
        console.error("No todos found for the given Id", error);
    }  

   
})

todoRouter.put('/:id', authMiddleware, async(req, res) => {
    const id = req.params.id
    try{
        await Todo.updateOne({
            userId: req.userId,
            _id: id
        },{
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed
        })
        res.json({
            message: "Updated successfully"
        })
    }catch(error){
        console.error("Unable to complete the request", error);
    }
})

todoRouter.delete('/:id', authMiddleware, async(req, res) => {
    
    const id = req.params.id

    try{
        await Todo.deleteOne({
            userId: req.userId,
            _id: id
        })

        res.json({
            message: "Todo deleted successfully."
        })
    }catch(error){
        console.error("No matching todo found", error);
    }
})


export default todoRouter;
