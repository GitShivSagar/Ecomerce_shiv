import mongoose from "mongoose";

const customerSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Customer Name is required"],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"Customer Email is required"],
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        trim:true,
        maxlength:100,
        minlength:5,
    },
    state:{
        type:String,
        required:[true,"State Name is required"],
        trim:true,
    },
    city:{
        type:String,
        required:[true,"City is required"],
        trim:true,
    },
    pincode:{
        type:Number,
        required:[true,"Customer Name is required"]
    },
    address:{
        type:String,
        required:[true,"Customer Address is required"],
        trim:true
    },
   gender: {
        type: String,
        required: [true, "Gender is required"],
        trim: true
    },
    role:{
        type: String,
        default:"customer"
    },
    status:{
        type: Number,
        default: 1
    },
    info: {
       type: String,
       default:Date()
    },
})

const customerModal=mongoose.model("Customer",customerSchema)


export default customerModal