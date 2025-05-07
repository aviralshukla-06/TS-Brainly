import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import z from "zod"
import { userModel } from "./db";
const app = express();
app.use(express.json())

const secret = process.env.JWT_SECRET;

app.post("/api/v1/signup", async (req: Request, res: Response) => {

    const reqBody = z.object({
        userName: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        password: z.string().min(8)
    });

    const parsedBody = reqBody.safeParse(req.body);
    // const errMsg = parsedBody.error;

    if (!parsedBody.success) {
        return res.status(403).json({
            message: parsedBody.error.issues
        });
    }

    const { userName, firstName, lastName, password } = parsedBody.data;
    const hashedPass = await bcrypt.hash(password, 5);

    try {
        const createNewUser = await userModel.create({
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            password: hashedPass
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "An error occurred while creating the user"
        })
    }

    res.json({
        message: "User created successfully"
    })




})
// app.post("/api/v1/signin", (req, res) => {

// })
// app.post("/api/v1/content", (req, res) => {

// })
// app.get("/api/v1/content", (req, res) => {

// })
// app.delete("/api/v1/content", (req, res) => {

// })
// app.post("/api/v1/brain/share", (req, res) => {

// })
// app.get("/api/v1/brain/:shareLink", (req, res) => {

// })


