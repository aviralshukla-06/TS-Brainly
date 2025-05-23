import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(403).json({
            message: "No token provided"
        })
    }

    if (!authHeader || !secret) {
        throw new Error("Either secret or token is not defined");
    }
    try {
        const decodedToken = jwt.verify(authHeader, secret)
        if (decodedToken) {
            //@ts-ignore
            req.userId = decodedToken.id
            next()
        }
    } catch (err) {
        return res.status(403).json({
            message: "Invalid or Expired Token"
        });
    }


}