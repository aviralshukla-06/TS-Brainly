import { NextFunction, Response } from "express";
import { AuthRequest } from "./types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;

// interface AuthRequest extends Request {
//     userId?: string;
// }

export const userMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    // if (!authHeader) {
    //     res.status(403).json({
    //         message: "No token provided"
    //     })
    // }

    if (!authHeader || !secret) {
        throw new Error("Either secret or token is not defined");
        return;
    }

    try {
        const decodedToken = jwt.verify(authHeader, secret) as { id: number };
        if (decodedToken) {
            req.userId = decodedToken.id;
            next()
        }
    } catch (err) {
        res.status(403).json({
            message: "Invalid or Expired Token"
        });
        return
    }

}