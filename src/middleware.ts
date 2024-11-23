import { NextFunction, Request, Response } from "express";
import JWT_SECRET from "./config";
import jwt from "jsonwebtoken";
import { JWTPayload } from "./types/types";


const authMiddleware = (req : Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(403).json({
            message: "Unauthorised access"
        })
        return;
    }

    const token = authHeader.split(' ')[1];
    
    try{
        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
        req.userId = decoded.userId;
        console.log(decoded);
        next();
    }catch(err){    
        res.status(403).json({
            message: "Unauthorised access"
        })
    }
}

export default authMiddleware;
