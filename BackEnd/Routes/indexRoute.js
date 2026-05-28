import express from 'express'
import indexController from '../Controllers/indexController.js'


const Router=express.Router()

Router.post("/register",indexController.register)
Router.post("/login",indexController.login)
Router.get("/products",indexController.products)
Router.get("/productdetails",indexController.productdetails)
Router.post("/senduserpasswordresetemail",indexController.senduserpasswordresetemail)
Router.post("/userpasswordreset",indexController.userpasswordreset)
Router.get("/filterproduct",indexController.filterproduct)


export default Router