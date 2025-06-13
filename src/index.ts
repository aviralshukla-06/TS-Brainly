import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import z from "zod"
import { userMiddleware } from "./middleware"
import { contentModel, userModel } from "./db";
const app = express();
app.use(express.json())

const secret = process.env.JWT_SECRET;

app.post("/api/v1/signup", async (req: Request, res: Response): Promise<void> => {


    const reqBody = z.object({
        userName: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        password: z.string().min(8)
    });

    const parsedBody = reqBody.safeParse(req.body);
    // const errMsg = parsedBody.error;

    if (!parsedBody.success) {
        res.status(403).json({
            message: parsedBody.error.issues
        });
        return
    }

    const existingUser = await userModel.findOne({
        userName: req.body.userName
    })

    if (existingUser) {
        res.status(411).json({
            message: "User already exists"
        })
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
        res.status(500).json({
            message: "An error occurred while creating the user"
        })
        return
    }

    res.json({
        message: "User created successfully"
    })

})



app.post("/api/v1/signin", async (req: Request, res: Response): Promise<void> => {

    const { userName, password } = req.body

    const signingUser = await userModel.findOne({
        userName: userName
    })



    // this way we can extract out password on console 
    // const signingUser = await userModel.findOne({
    //     userName: userName
    // }).select('password')

    // console.log(signingUser?.password);

    if (!signingUser) {
        res.status(403).json({
            message: "User does Not exist."
        });
        return
    }

    if (!signingUser?.password) {
        res.status(500).json({
            message: "Password not found for this user in DB"
        });
        return
    }


    const matchPassword = await bcrypt.compare(password, signingUser?.password)

    if (!matchPassword) {
        res.status(403).json({ message: "Incorrect password" });
        return;
    }

    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    let token: string | undefined;

    if (matchPassword) {
        token = jwt.sign({
            id: signingUser._id
        }, secret)
    } else {
        res.status(403).json({
            message: "Incorrect details"
        });
        return
    }
    res.status(200).json({
        message: "Sign-in successful",
        token
    });

})


app.post("/api/v1/content", userMiddleware, (req: Request, res: Response): void => {

    const link = req.body.link;
    const type = req.body.type;

    const details =

        contentModel.create({
            link,
            type,
            //@ts-ignore
            userId: req.userId,
            tags: []
        })

    res.json({
        message: "Content added"
    })
    return;

})
app.get("/api/v1/content", (req, res) => {

})
// app.delete("/api/v1/content", (req, res) => {

// })
// app.post("/api/v1/brain/share", (req, res) => {

// })
// app.get("/api/v1/brain/:shareLink", (req, res) => {

// })

app.listen(3000)

