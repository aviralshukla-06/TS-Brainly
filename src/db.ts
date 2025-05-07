import { model, Schema } from "mongoose";

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