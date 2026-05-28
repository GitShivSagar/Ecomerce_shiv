import customerModal from "../Modals/customerModal.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import productModal from "../Modals/productModal.js"
import transporter from "../utility/nodemailer.js"
dotenv.config({ path: "./.env" })

class indexController {
    static register = async (req, res) => {
        const { name, email, password, address, mobile, city, state, gender, pincode } = req.body
        console.log(req.body)

        try {
            const isMatch = await customerModal.findOne({ email })
            console.log(isMatch)

            if (isMatch) {
                return res.status(200).json({
                    MSG: "Email already registered"
                })
            }

            var hashpassword = await bcrypt.hash(password, 10)
            console.log("Hashpassword", hashpassword)

            var customer = new customerModal({ name, email, password: hashpassword, address, mobile, city, state, gender, pincode })

            var cust = await customer.save()

            return res.status(200).json({
                MSG: "User registered successfully",
                Record: cust
            })
        } catch (error) {
            return res.status(400).json({
                MSG: "User is not register",
                error: error
            })
        }

    }
    static login = async (req, res) => {
        const { email, password } = req.body
        console.log(req.body)
        try {

            const customer = await customerModal.findOne({ email })
            console.log("Single Record", customer)

            if (customer != null) {
                var isMatch = await bcrypt.compare(password, customer.password)
                console.log(isMatch)

                if (customer.email === email && isMatch) {
                    var token = jwt.sign({ customer_id: customer._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                    return res.status(200).json({
                        MSG: "Login Successfully",
                        token,
                        Record: customer
                    })
                }
                else {
                    return res.status(400).json({
                        MSG: "Email or Password is invalid"
                    })
                }
            }
            else {
                return res.status(400).json({
                    MSG: "Email is not exists"
                })
            }
        } catch (error) {
            return res.status(400).json({
                MSG: "Login Failed",
                error: error.message
            })
        }
    }
    static products = async (req, res) => {
        try {
            const products = await productModal.find()
            console.log(products)
            return res.status(200).json({
                products
            })
        } catch (error) {
            return res.status(400).json({
                MSG: "NO products found",
                error: error
            })
        }
    }
    static productdetails = async (req, res) => {
        const { pid } = req.query
        console.log(req.query)

        try {
            var productdetails = await productModal.findById({ _id: pid })
            return res.status(200).json({
                productdetails
            })

        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }
    static senduserpasswordresetemail = async (req, res) => {
        const { email } = req.body
        console.log(req.body)

        try {
            if (email) {
                const customer = await customerModal.findOne({ email })
                console.log(customer)

                if (customer != null) {

                    const secretkey = customer._id + process.env.JWT_SECRET_KEY
                    const token = jwt.sign({ customer_id: customer._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                    console.log("secretKey",secretkey)
                    console.log("token",token)

                    const link = "http://localhost:3000/forgotpassword?id=" + customer._id + "&token=" + token
                    console.log("Link  =====>", link)

                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: customer.email,
                        subject: "RESET PASSWORD",
                        text: "LINK FOR PASSWORD RESET",
                        html: "<h3> Hii" + customer.name + ", Please copy this Link <a href=" + link + "> and reset password</a></h3>"
                    }

                    await transporter.sendMail(mailOptions)

                    return res.status(200).json({
                        MSG: "PASSWORD reset email  send ... please check your email",
                        _id: customer._id,
                        token: token
                    })
                } else {
                    return res.status(400).json({
                        MSG: "Email does not exist"
                    })
                }
            }
            else {
                return res.status(400).json({
                    MSG: "Email field ar required"
                })
            }
        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }
    static userpasswordreset=async(req,res)=>{
        const {password,confirm_password}=req.body
        const {id,token}=req.query

        console.log("get====>",id,token)
        console.log('password==>',password)
        console.log('confirm_password==>',confirm_password)

        try {
            const customer=await customerModal.findById(id)
            const new_secret=process.env.JWT_SECRET_KEY
            const {customer_id}=jwt.verify(token,new_secret)
            console.log(customer_id)
            if(password && confirm_password){
                if(password !== confirm_password){
                    return res.status(400).json({
                        MSG:"password and confirm_password does not match"
                    })
                }else{
                    const newHashPassword=await bcrypt.hash(password,10)
                    console.log('newHashpassword',newHashPassword)
                    var data=await customerModal.findByIdAndUpdate({_id:customer_id},{
                        $set:{
                            password:newHashPassword
                        }
                    },{
                        new:true,
                        useFindAndModify:false
                    })
                    return res.status(200).json({
                        MSG:'Password reset successfully',
                        Record:data
                    })
                }
            }else{
                return res.status(400).json({
                    MSG:"Both fields are required"
                })
            }
        } catch (error) {
            return res.status(400).json({
                MSG:"Invalid Token",
                error:error
            })
        }
    }
    static filterproduct = async (req, res) => {
        try {
            const { product_category, priceMin, priceMax, ratingMin, inStock } = req.query;
            console.log(req.query)
 
            // Build filter object
            let filter = {};
 
            if (product_category) {
                // Split comma-separated string into an array
                let categoryFilter = product_category
                    ? product_category.split(',').map(cat => cat.trim())
                    : [];
                console.log("Category Filter:",categoryFilter)
 
                filter = categoryFilter.length > 0
                    ? { product_category: { $in: categoryFilter } }
                    : {};
                console.log(filter)
                // filter.product_category = filter;
            }
            if (priceMin || priceMax) {
                filter.product_sellingprice = {};
                if (priceMin)
                    filter.product_sellingprice.$gte = priceMin;
                if (priceMax)
                    filter.product_sellingprice.$lte = priceMax;
            }
            if (ratingMin) {
                filter.product_rating = { $gte: ratingMin };
            }
            if (inStock) {
                filter.product_availability = "In Stock"
            }
            console.log(filter)
            // Fetch products based on filters
            const products = await productModal.find(filter);
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
 
}

export default indexController