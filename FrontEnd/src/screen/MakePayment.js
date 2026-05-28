import React from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Header from '../controller/Header'
import Footer from '../controller/Footer'
import {CHECKOUT,GETKEY} from  "../utility/Constant"

const MakePayment = () => {
  const location = useLocation()
  console.log("makepayment")
  const checkOutHandler = async (amount) => {
    try {
      const { data: { key } } = await axios.get(GETKEY)
      const { data: { order } } = await axios.post(CHECKOUT, {amount})


      console.log("orders", order)

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Shiv Sagar",
        description: "Tutorial of razorpay",
        image: "https://avatars.githubusercontent.com/u/75520279?v=4",
        order_id: order.id,
        callback_url: "http://localhost:5000/customer/paymentverification",
        prefill: {
          name: "Shiv sagar",
          email: "shivsagarstd77@gmail.com",
          contact: "7509783882",
        },
        notes: {
          "addres": "Razorpay Corporate Office"
        },
        theme: {
          "color": "#121212"
        }
      }
      console.log(options)
      console.log("window:", window)
      const razor = new window.Razorpay(options);
      console.log(razor)
      razor.open()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Header />
      <h1 style={{ marginTop: 60 }}>Payment</h1>
      <button className="btn btn-sm btn-success"
        onClick={() => checkOutHandler(location.state)}
      >Pay ₹ {location.state} with Razorpay</button>
      <Footer />
    </div>
  )
}


export default MakePayment