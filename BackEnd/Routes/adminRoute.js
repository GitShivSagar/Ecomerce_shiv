import express from 'express'
import multiplefileupload from "../utility/multiplemulter.js";
import adminController from "../Controllers/adminController.js";

const Router=express.Router()

Router.post("/addproducts",multiplefileupload.array("product_imageurl",12),adminController.addproducts)
Router.delete("/deleteproducts",adminController.deleteproducts)
Router.get("/customerlist",adminController.customerlist)
Router.put("/managecustomer",adminController.managecustomerstatus)


export default Router