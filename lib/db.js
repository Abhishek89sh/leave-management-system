import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;


export const connectDB = async () => {
    if (!DB_URL) {
        throw new Error("DB URL NOT FOUND");
    }
    try{
        if(mongoose.connection.readyState >= 1){
            console.log("Already Connected");
            return;
        }
        await mongoose.connect(DB_URL);
        if(mongoose.connection.readyState >= 1){
            console.log("Database Connected");
            return;
        }else{
            console.log("Error in connecting database");
            return;
        }
    }catch (err){
        console.log("Error in connecting DATABASE: ",err);
        throw new Error("DB Connection Failed");
    }
}