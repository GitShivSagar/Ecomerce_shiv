import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN } from '../utility/Constant'
import axios from 'axios'
import Header from '../controller/Header'
import Footer from '../controller/Footer'



const Login = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")


    const handleLogin = (e) => {
        e.preventDefault()
        let params = {
            email,
            password
        }
        axios.post(LOGIN, params)
            .then((response) => {
                console.log(response)
                const { token, MSG } = response.data
                const { status, role, email, _id } = response.data.Record
                if (status === 1) {
                    localStorage.setItem("id", _id)
                    localStorage.setItem("email", email)
                    localStorage.setItem("token", token)
                    localStorage.setItem("role", role)
                    alert(MSG)
                    role === "admin" ? navigate("/admin") : navigate("/customer")
                }
                else{
                    alert("please contact admin to varify customer")
                }
            })
            .catch((error) => {
                console.log(error)
                
            })
    }

    return (
        <div >
            <Header/>
            <h1 style={{marginTop:80}}>LOGIN</h1>
            <div className="p-t-40" align='center' >
                <form onSubmit={handleLogin}>
                    <div className="bor19 size-218 m-b-20">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18" type="text"
                        required
                            name="email" placeholder="Email *"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>

                    <div className="bor19 size-218 m-b-30">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18" type="password"
                        required
                            name="password" placeholder="Password*"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>


                    <div className="size-218 m-b-10">
                        <p className="stext-107 cl6 txt-right">
                            <Link to="/sendemail">Forgot Password?</Link>
                        </p>
                    </div>

                    <button className="flex-c-m stext-101 cl0 size-125 bg3 bor2 hov-btn3 p-lr-15 trans-04"
                    type='submit'>
                        Login
                    </button>
                    <p className="stext-107 cl6 txt-center">
                    Don't have an account? <Link to='/register'>Register</Link>
                </p>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default Login
