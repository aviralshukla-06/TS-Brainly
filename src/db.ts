const connestionStr = process.env.mongoUrl
import mongoose, { model, Schema } from "mongoose";

mongoose.connect(connestionStr);

const userSchema = new Schema({
    userName: {
        unique: true,
        type: String,
        require: true,
    },
    firstName: {
        unique: true,
        type: String,
        require: true,
    },
    lastName: {
        unique: true,
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
        minLength: 8
    }
})



export const userModel = model("User", userSchema);