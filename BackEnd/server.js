import Razorpay from 'razorpay'
import dotenv from 'dotenv'
dotenv.config({path:"./.env"})


var  instance=new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_API_SECRET
})

console.log(process.env.RAZORPAY_API_KEY,process.env.RAZORPAY_API_SECRET)
console.log("Insatnce obj",instance.orders)

export default instance