import mongoose from "mongoose";

const documentSchema=mongoose.Schema({
    upload_doc:{
        type:String,
        required:[true,'Image is required'],
        trim:true,
    },
    customer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer"
    }
})

var documentModal=mongoose.model("document",documentSchema)

export default documentModal