import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SEND_EMAIL } from '../utility/Constant'
import Header from "../controller/Header"
import Footer from "../controller/Footer"
import axios from 'axios'

const SendEmail = () => {
  const navigate = useNavigate()
  const [email, setemail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    let params = {
      email: email
    }

    console.log(email)
    axios.post(SEND_EMAIL, params)
      .then((response) => {
        console.log(response)
        alert(response.data.MSG)
        localStorage.setItem("id", response.data._id)
        localStorage.setItem("forgottoken", response.data.token)
        setemail("")
        navigate("/forgotpassword")
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <Header />
      <section className="bg0 p-t-20 p-b-85">
        <div className="container" >
          <div className="flex-w flex-tr">
            <div className="size-210 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md" style={{ margin: 'auto' }}>
              <form onSubmit={handleSubmit}>
                <h4 className="mtext-105 cl2 txt-center p-b-30">
                  Forgot Password
                </h4>
                <div className="bor8 m-b-20 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Your Email Address"
                  />
                </div>

                <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer" style={{ marginTop: 20 }}>
                  Send Email
                </button>
              </form>


            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default SendEmail
