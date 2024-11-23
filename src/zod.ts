import { randomUUID } from "crypto";
import zod from "zod";

export const signupInputs = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})

export const signinInputs = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

export const createTodoInputs = zod.object({
    title: zod.string(),
    description: zod.string()    
})
 


