import dotenv from "dotenv";
dotenv.config();
import mongoose, { model, Schema } from "mongoose";

const connestionStr = process.env.mongoUrl;
console.log(connestionStr);

if (!connestionStr) {
    throw new Error("mongoUrl is not defined in environment variables");
}
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

const contentSchema = new Schema({
    title: {
        type: String
    },
    link: {
        type: String
    },
    tags: [{
        type: mongoose.Types.ObjectId,
        ref: "Tag"
    }],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }

})



export const userModel = model("users", userSchema);
export const contentModel = model("contents", contentSchema)