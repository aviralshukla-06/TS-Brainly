import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { AuthRequest } from "./types";
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

    const signingUser = `SELECT id, password FROM users WHERE userName= $1;`
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

    const userRow = insertValue.rows[0];

    const userPass = userRow.password;
    const userId = userRow.id;
    // console.log(userPass);


    const matchPassword = await bcrypt.compare(password, userPass)

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
            id: userId
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


app.post("/api/v1/content", userMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {

    const userId = req.userId;
    const links = req.body.links;
    const title = req.body.title;
    const description = req.body.description;

    const insertContents = `INSERT INTO contents (links, title, description, user_id) VALUES ($1, $2, $3, $4);`;
    await pgClient.query(insertContents, [links, title, description, userId]);



    res.json({
        message: "Content added for id:" + userId
    })
    return;

})
app.get("/api/v1/content", userMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.userId;

    const userDataQuery = `SELECT * FROM contents WHERE user_id = $1 ;`;
    const responseData = await pgClient.query(userDataQuery, [userId]);

    const response = responseData.rows[0];

    if (responseData.rows.length === 0) {
        res.status(403).json({
            message: "No contents found"
        });
        return
    } else {
        res.status(200).json({
            response
        })
    }
    console.log(response);
})

app.put("/api/v1/content", userMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {

    const userId = req.userId;

    const links = req.body.links;
    const title = req.body.title;
    const description = req.body.description;

    const updateQuery = `UPDATE contents SET links = $1, title = $2, description = $3 WHERE user_id = $4;`
    await pgClient.query(updateQuery, [links, title, description, userId]);

    res.json({
        message: "Content updated successfully for id:" + userId
    })
    return;

})

app.delete("/api/v1/content", userMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.userId;

    const deleteQuery = `DELETE FROM contents WHERE user_id = $1 ;`;
    await pgClient.query(deleteQuery, [userId]);

    res.json({
        message: "Content deleted successfully for id:" + userId
    })
    return;
})
// app.post("/api/v1/brain/share", (req, res) => {

// })
// app.get("/api/v1/brain/:sharelinks", (req, res) => {

// })

app.listen(3000)

