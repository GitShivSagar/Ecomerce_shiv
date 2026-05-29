import express from 'express'
import indexRoute from './Routes/indexRoute.js'
import adminRoute from './Routes/adminRoute.js'
import customerRoute from './Routes/customerRoute.js'
import dbConnect from './dbConnect/dbConnect.js'
import cors from 'cors'
// import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config({path:"./.env"})


const server=express()
const PORTNO=process.env.PORT || process.env.PORT_NO || 4000

dbConnect(process.env.DB_URL,process.env.DB_NAME)


server.use(express.urlencoded({
    extended:true
}))



server.use(express.json())
server.use("/multiplefiles",express.static('multiplefiles'))
server.use("/uploaddocuments",express.static('uploaddocuments'))

/*
CORS or Cross-Origin Resource Sharing in Node. js is a mechanism by which a front-end client can make requests for resources to an external back-end server. The single-origin policy does not allow cross-origin requests and CORS headers are required to bypass this feature.
*/
const corsOptions ={
    origin:process.env.Frontend_URL,
    credentials:true
}
 
server.use(cors(corsOptions));
 
server.use(function (req, res, next) {
 
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.Frontend_URL || "http://localhost:3000");
 
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
 
    // Pass to next layer of middleware
    next();
});




server.use("/",indexRoute)
server.use("/admin",adminRoute)
server.use("/customer",customerRoute)



server.listen(PORTNO,()=>{
    console.log("Server is started at:",PORTNO)
})
