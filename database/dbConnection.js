
import mongoose from "mongoose";


export function dbconnection() {
    mongoose.connect('mongodb://127.0.0.1:27017/E-COMMERCE')
        .then(() => console.log("Database connected"))
        .catch((err) => console.log("Database error",err))
}
