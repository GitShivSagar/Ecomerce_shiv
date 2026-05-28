import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FORGOTPASSWORD } from '../utility/Constant'

const ForgotPassword = () => {

    const navigate = useNavigate()
    const [password, setpassword] = useState("")
    const [confirm_password, setconfirm_password] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        let params = {
            password: password,
            confirm_password: confirm_password
        }
        var id = localStorage.getItem("id")
        var forgottoken = localStorage.getItem("forgottoken")
        var url = FORGOTPASSWORD + id + "&token=" + forgottoken
        axios.post(url, params)
            .then((response) => {
                console.log(response)
                alert(response.data.MSG)
                navigate("/login")
            })
            .catch((err) => {
                console.log(err)
                alert("password not reset,error")
            })
    }

    return (
        <div>
            <section className="bg0 p-t-20 p-b-85">
                <div className="container" >
                    <div className="flex-w flex-tr">
                        <div className="size-210 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md" style={{ margin: 'auto' }}>
                            <form onSubmit={handleSubmit}>
                                <h3 className="mtext-105 cl2 txt-center p-b-30">
                                    Reset Password
                                </h3>
                                <div className="bor8 m-b-20 how-pos4-parent">
                                    <input
                                        className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        placeholder="Enter New Passowrd"
                                    />
                                </div>

                                <div className="bor8 m-b-20 how-pos4-parent">
                                    <input
                                        className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30"
                                        type="confirm_password"
                                        name="confirm_password"
                                        value={confirm_password}
                                        onChange={(e) => setconfirm_password(e.target.value)}
                                        placeholder="Enter Confirm_Password"
                                    />
                                </div>

                                <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer" style={{ marginTop: 20 }}>
                                    Reset Password
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ForgotPassword
