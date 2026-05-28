import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    product_brand: {
        type: String,
        require: [true, "product brand is required"],
        trim: true
    },
    product_quantity: {
        type: Number,
        require: [true, "product quantity is required"],
        default: 1
    },
    product_description: {
        type: String,
        require: [true, "product description is required"],
        trim: true,
    },

    product_availability: {
        type: String,
        require: [true, "product availability is required"],
        trim: true
    },

    product_color: {
        type: String,
        require: [true, "product color is required"],
        trim: true
    },
    product_mrp: {
        type: Number,
        required: [true, "Product Maximum Retail Price  is required"],
    },
    product_sp: {
        type: Number,
        required: [true, "Product Selling Price  is required"],
    },
    product_discount: {
        type: Number,
        required: [true, "Product Discount is required"]
    },
    product_category: {
        type: String,
        required: [true, "product category"],
        trim: true
    },
    product_variant_name: {
        type: String,
        require: [true, "product variant name is required"],
        trim: true
    },
    product_size: {
        type: String,
        require: [true, "product size is required"]
    },
    product_imageurl: {
        type: Array,
        required: [true, "product image is required"],
        default: [
            {
                name: {
                    type: String,
                    required: [true, "iamge name is required"],
                    trim: true
                },
                mimetype: {
                    type: String,
                    required: [true, "mimetype is required"],
                    trim: true,
                },
                path: {
                    type: String,
                    required: [true, "path is required"],
                    trim: true,
                },
                size: {
                    type: Number,
                    required: [true, "size is required"],
                }
            }
        ]
    }

})
const productModal = mongoose.model("Product", productSchema)

export default productModal