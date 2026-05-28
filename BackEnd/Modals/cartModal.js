import mongoose from 'mongoose'
import customerModal from './customerModal.js'


const cartSchema=mongoose.Schema({
    customer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer"
    },
    products:[
        {
            product_id:{
                type:String,
                required:[true,"Product Id is required"],
                trim:true,
            },
            product_brand:{
                type:String,
                required:[true,"Product Brand is required"],
                trim:true,
            },
            product_quantity:{
                type:Number,
                required:[true,"Product Quantity is required"],
            },
            product_variant_name:{
                type:String,
                required:[true,"Product variant name is required"],
                trim:true,
            },
            product_description:{
                type:String,
                required:[true,"Product description is required"],
                trim:true,
            },
            product_price:{
                type:Number,
                required:[true,"Product Price is required"],
            },
            product_imageurl:{
                type:String,
                required:[true,"Product imageurl is required"],
                trim:true,
            },
        }
    ]
})

var cartModal=mongoose.model("Cart",cartSchema)

export default  cartModal