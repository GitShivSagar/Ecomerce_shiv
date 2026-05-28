import express from 'express'
import customerController from '../Controllers/customerController.js'
//import documentModal from '../Modals/documentModal.js'
import imgUpload from '../utility/singlefilemulter.js'


const Router=express.Router()


Router.post("/addtocart",customerController.addtocart)
Router.get("/cartdetails",customerController.cartdetails)
Router.get('/getkey', (req, res) =>
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
Router.post('/checkout',customerController.checkout)
Router.post('/paymentverification',customerController.paymentVerification)
Router.get('/orderlist',customerController.orderList)
Router.get('/emptycart',customerController.emptycart)
Router.post('/orders',customerController.orders)
Router.put('/deletecart',customerController.deletecart)
Router.put('/editprofile',customerController.editprofile)
Router.post('/uploaddocument',imgUpload.single("upload_doc"),customerController.uploaddocument)
Router.get('/profile',customerController.profile)
Router.post('/changepassword',customerController.changePassword)
Router.get('/profilepic',customerController.profilepic)



export default Router