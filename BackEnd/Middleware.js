import customerModal from './Modals/customerModal.js'
import jwt from 'jsonwebtoken'



const checkCustomerAuth = async(req, res,next)  => {
    let token
    const { authorization } = req.headers
    console.log("Authorization", authorization)

    try {
        if (authorization && authorization.startsWith('Bearer')) {
            const arr = authorization.split(' ')
            console.log("arr", arr)

            token = arr[1]
            const { customer_id } = jwt.verify(token, process.env.JWT_SECRET_KEY)
            console.log("customer_id", customer_id)

            var customer = await customerModal.findById(customer_id)
            console.log("customer", customer)
            next()
        }
    } catch (error) {
        return res.status(400).json({
            MSG:"Token Expires",
            error:error
        })
    }
    if(!token){
        return res.status(400).json({
            MSG:"Unauthorized user,No Token"
        })
    }
}

export default checkCustomerAuth