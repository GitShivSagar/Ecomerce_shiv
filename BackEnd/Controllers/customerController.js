import cartModal from "../Modals/cartModal.js";
import instance from "../server.js";
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import fs from 'fs'
import orderModal from "../Modals/orderModal.js";
import customerModal from "../Modals/customerModal.js";
import Payment from "../Modals/paymentModal.js";
import documentModal from "../Modals/documentModal.js";
dotenv.config({ path: "./config/config.env" })


class customerController {
    static addtocart = async (req, res) => {
        const { product_id, product_brand, product_variant_name, product_description, product_price, product_imageurl, product_quantity } = req.body
        console.log(req.body)

        const { customer_id } = req.query
        console.log("customer_Id", customer_id)

        try {
            let cart = await cartModal.findOne({ customer_id })
            console.log(cart)
            if (cart) {
                let itemIndex = cart.products.findIndex(p => p.product_id == product_id)
                console.log("index", itemIndex)
                if (itemIndex > -1) {
                    let productItem = cart.products[itemIndex]
                    productItem.product_quantity = product_quantity
                    cart.products[itemIndex] = productItem
                } else {
                    cart.products.push({ product_id, product_brand, product_variant_name, product_description, product_price, product_imageurl, product_quantity })
                }
                cart = await cart.save()
                return res.status(200).json({
                    MSG: "New Product Added to cart Successfully",
                    cartdetails: cart
                })
            }
            const newCart = new cartModal({
                customer_id,
                products: [{ product_id, product_brand, product_variant_name, product_description, product_price, product_imageurl, product_quantity }]
            })

            const data = await newCart.save()
            return res.status(200).json({
                MSG: "Product added to cart successfully",
                cartdetails: data
            })
        } catch (error) {
            return res.status(400).json({
                MSG: 'Product not added',
                error: error
            })
        }
    }
    static cartdetails = async (req, res) => {
        const { customer_id } = req.query
        console.log("customer_id", customer_id)

        try {
            let cart = await cartModal.findOne({ customer_id })
            console.log("cart====>", cart)

            return res.status(200).json({
                cart
            })
        } catch (error) {
            return res.status(400).json({
                error: error
            })
        }
    }
    static checkout = async (req, res) => {
        const options = {
            amount: Number(req.body.amount) * 100,
            currency: "INR"
        }
        console.log("Checkout", options)

        try {
            const order = await instance.orders.create(options)
            console.log("Orders", order)
            return res.status(200).json({
                MSG: "Order Created successfully",
                success: true,
                order
            })
        } catch (error) {
            console.log("chedckout obj", error)
            return res.status(400).json({
                error
            })
        }
    }
    static paymentVerification = async (req, res) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
        console.log("Request Body", req.body)

        const body = razorpay_order_id + "|" + razorpay_payment_id

        const expectedSignature = crypto
            .createHmac("sha256",
                process.env.RAZORPAY_API_SECRET)
            .update(body.toString())
            .digest("hex")

        console.log(expectedSignature)


        const isAuthentic = expectedSignature === razorpay_signature;

        console.log(isAuthentic)
        if (isAuthentic) {
            // Database comes here
            var result = await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });
            console.log(result)
            res.redirect(
                `http://localhost:3000/customer/paymentsuccess?reference=${razorpay_payment_id}`
            );
        } else {
            res.status(400).json({
                success: false,
            });
        }
    }
    static orderList = async (req, res) => {
        const { customer_id } = req.query
        try {
            var orders = await orderModal.find({ customer_id })
            return res.status(200).json({
                success: true,
                orderlist: orders,
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error
            })
        }

    }
    static emptycart = async (req, res) => {
        const { customer_id } = req.query
        try {
            await cartModal.deleteMany({ customer_id })
            return res.status(200).json({
                MSG: "Cart is empty"
            })
        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }
    static orders = async (req, res) => {
        const { customer_id, orders } = req.body
        try {
            let existingOrder = await orderModal.findOne({ customer_id })
            if (existingOrder) {
                existingOrder.orders.push(...orders)
                await existingOrder.save()
                return res.status(200).json({
                    MSG: "order updated successfully"
                })
            }

            await orderModal.create({ customer_id, orders })
            return res.status(200).json({
                MSG: "order created successfully"
            })

        } catch (error) {
            console.error("Error processing order:", error);
            res.status(400).json({
                message:
                    "Something went wrong"
            });
        }
    }
    static deletecart = async (req, res) => {
        const { _id, product_id } = req.query
        console.log(req.query)

        try {
            var cartdetails = await cartModal.findOne({ _id })
            console.log("cartdetails", cartdetails)

            if (cartdetails != null) {
                var newarr = cartdetails.products.filter((cart) => { cart.product_id !== product_id })
                console.log(newarr)

                const updateddetails = await cartModal.findByIdAndUpdate(
                    { _id },
                    {
                        $set: {
                            products: newarr
                        }
                    },
                    {
                        new: true,
                        newFindAndModify: false
                    }
                )
                return res.status(200).json({
                    MSG: "product deleted successfully",
                    cart: updateddetails
                })
            }
        } catch (error) {
            return res.status(400).json({
                msg: "Product Not Deleted",
                Error: error
            })
        }
    }
    static editprofile = async (req, res) => {
        const { id } = req.query
        const { name, mobile, gender, address, city, state, pincode,role } = req.body
        console.log("id", id)
        console.log(req.body)

        try {
            var updateDetails = await customerModal.findByIdAndUpdate({ _id: id },
                {
                    $set: {
                        name, mobile, address, gender, state, city, pincode,role
                    }
                },
                {
                    new: true,// it return updated document
                    useFindAndModify: false
                }
            )
            return res.status(200).json({
                MSG: "Profile updated successfully",
                record: updateDetails
            })
        } catch (error) {
            return res.status(400).json({
                MSG: "Profile not updated successfully",
                error: error
            })
        }
    }
    static uploaddocument=async(req,res)=>{
        const {customer_id}=req.body
        const upload_doc=req.file.path
        console.log("upload_docc",upload_doc)
        console.log("customer_id",customer_id)

       try {
        var doc=await documentModal.findOne({customer_id:customer_id})
        console.log("customer record",doc)

        if(doc){
            var array=doc.upload_doc.split('/')
            console.log("oldfilename",array)
            var oldfilename=array[array.length-1]
            console.log("previousfilename",oldfilename)
            fs.unlink(`./uploaddocuments/${oldfilename}`,(err)=>{
                 if (err) {
                        console.log("File is not deleted:", err)
                    } else {
                        console.log("File delete successfully")
                    }
            })
            await documentModal.findByIdAndDelete({
                _id:doc._id
            },
        {
            new:true,
            useFindAndModify:false
        })
        }

        const uploaddata=new documentModal({
        upload_doc:`http://localhost:${process.env.PORT_NO}/`+upload_doc,customer_id
        })

        await uploaddata.save()

        return res.status(200).json({
            MSG:"Image uploaded successfully",
            record:uploaddata
        })
       } catch (error) {
        return res.status(200).json({
            MSG:"Image not uploaded successfully"
        })
       }

    }
    static profile = async (req, res) => {
        const { id } = req.query
        try {
            const record = await customerModal.findById({ _id: id }).select("-password")
            console.log("record", record)
            return res.status(200).json({
                record
            })
        } catch (error) {
            return res.status(400).json({
                MSG: "error",
                error: error.message
            })
        }
    }
    static changePassword = async (req, res) => {
        const { id } = req.query
        const { oldpassword, newpassword, confirmpassword } = req.body
        console.log("id", id)
        console.log("password and confirm password", oldpassword, newpassword, confirmpassword)

        try {
            if (oldpassword && newpassword && confirmpassword) {
                const customerdetails = await customerModal.findById(id)
                console.log("REcord", customerdetails)
                if (customerdetails != null) {
                    const oldhashpass = customerdetails.password
                    const checkpass = await bcrypt.compare(oldpassword, oldhashpass)
                    console.log("Check", checkpass)
                    if (checkpass) {
                        if (newpassword === confirmpassword) {
                            const newhashpass = await bcrypt.hash(newpassword, 10)
                            const updatedcustomer = await customerModal.findByIdAndUpdate({ _id: customerdetails._id },
                                {
                                    $set: {
                                        password: newhashpass
                                    },
                                },
                                {
                                    new: true,
                                    useFindAndModify: false
                                }
                            )
                            return res.status(200).json({
                                MSG: "Password Changed Successfully",
                                Record: customerdetails
                            })
                        } else {
                            return res.status(400).json({
                                MSG: "newpassword and old password does not matched",
                                error: error
                            })
                        }
                    }
                    else {
                        return res.status(400).json({
                            MSG: "your old password does not match ",
                            error: error
                        })
                    }
                }
            }else{
                return res.status(400).json({
                    MSG:"all fields must required",
                    error:error
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    static profilepic=async(req,res)=>{
        const {customer_id}=req.query
        console.log("id",customer_id)
        try {
            const customerdetails=await documentModal.findOne({customer_id:customer_id})
            console.log("customerdeatils",customerdetails)
            if(customerdetails){
                return res.status(200).json({
                    MSG:"Data found",
                    record:customerdetails
                })
            }else{
                return res.status(400).json({
                    MSG:"Data not found",
                    error:error
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default customerController