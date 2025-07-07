import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { Client } from "pg";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import z from "zod"
import { userMiddleware } from "./middleware"
import { pgClient } from "./db";
const app = express();
app.use(express.json())
const secret = process.env.JWT_SECRET;


app.post("/api/v1/signup", async (req: Request, res: Response): Promise<void> => {


    const reqBody = z.object({
        userName: z.string(),
        email: z.string(),
        password: z.string()
    });

    const parsedBody = reqBody.safeParse(req.body);
    // const errMsg = parsedBody.error;

    if (!parsedBody.success) {
        res.status(403).json({
            message: parsedBody.error.issues
        });
        return
    }

    const existingUserCheck = `SELECT username FROM users WHERE email= $1;`
    const insertCheckValue = await pgClient.query(existingUserCheck, [req.body.email])

    if (insertCheckValue.rows.length > 0) {
        res.status(411).json({
            message: "User already exists"
        });
        return;
    }

    const { userName, email, password } = parsedBody.data;
    const hashedPass = await bcrypt.hash(password, 5);

    try {
        const newUserCreation = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3);`
        const newUserValues = await pgClient.query(newUserCreation, [userName, email, hashedPass])
        // const createNewUser = await userModel.create({
        //     userName: userName,
        //     firstName: firstName,
        //     lastName: lastName,
        //     password: hashedPass
        // })
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

    const signingUser = `SELECT password FROM users WHERE userName= $1;`
    const insertValue = await pgClient.query(signingUser, [req.body.userName])



    // this way we can extract out password on console 
    // const signingUser = await userModel.findOne({
    //     userName: userName
    // }).select('password')

    // console.log(signingUser?.password);

    if (insertValue.rows.length === 0) {
        res.status(403).json({
            message: "User does Not exist."
        });
        return
    }

    const userPass = insertValue.rows[0];
    console.log(userPass);


    const matchPassword = await bcrypt.compare(password, userPass)

    if (!matchPassword) {
        res.status(403).json({ message: "Incorrect password" });
        return;
    }

    // if (!secret) {
    //     throw new Error("JWT_SECRET is not defined in environment variables");
    // }

    // let token: string | undefined;

    // if (matchPassword) {
    //     token = jwt.sign({
    //         id: signingUser._id
    //     }, secret)
    // } else {
    //     res.status(403).json({
    //         message: "Incorrect details"
    //     });
    //     return
    // }
    // res.status(200).json({
    //     message: "Sign-in successful",
    //     token
    // });

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

