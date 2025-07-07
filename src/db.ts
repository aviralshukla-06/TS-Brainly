import dotenv from "dotenv";
dotenv.config();
import { Client } from "pg";

const connectionStr = process.env.PG_URL;
// console.log(connectionStr);

if (!connectionStr) {
    throw new Error("PostgreSQL is not defined in environment variables");
}
export const pgClient = new Client({
    connectionString: connectionStr
});

pgClient.connect()
    .then(() => console.log("PostSql connected"))
    .catch(err => console.log("Connection err: ", err))


// const contentSchema = new Schema({
//     title: {
//         type: String
//     },
//     link: {
//         type: String
//     },
//     tags: [{
//         type: mongoose.Types.ObjectId,
//         ref: "Tag"
//     }],
//     userId: {
//         type: mongoose.Types.ObjectId,
//         ref: "User",
//         required: true
//     }

// })



// export const userModel = model("users", userSchema);
// export const contentModel = model("contents", contentSchema)