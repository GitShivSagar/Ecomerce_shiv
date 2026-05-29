import mongoose from "mongoose";

const dbConnect=async(DB_URL,DB_NAME)=>{
    try {
        await mongoose.connect(DB_URL+DB_NAME)
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log("Database not Connected")
        console.log(error)
    }
}

export default dbConnect