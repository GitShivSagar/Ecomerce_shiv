import React from 'react'
import { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { CHANGEPASSWORD } from '../utility/Constant'
import Header from '../controller/Header'
import Footer from '../controller/Footer'

const ChangePassword = () => {
    const navigate=useNavigate()
    const [oldpassword,setoldpassword]=useState("")
    const [newpassword,setnewpassword]=useState("")
    const [confirmpassword,setconfirmpassword]=useState("")

    const handleSubmit=(e)=>{
        e.preventDefault()
        let params={
            'oldpassword':oldpassword,
            'newpassword':newpassword,
            'confirmpassword':confirmpassword
        }
        console.log("params",params)
        var c_id=localStorage.getItem("id")
        var token=localStorage.getItem("token")

        axios.post(CHANGEPASSWORD+c_id,params,{
            headers:{
                'Authorization':'Bearer'+token,
                'Content-Type':'application/json'
            },
        })
        .then((response)=>{
            console.log(response.data)
            alert(response.data.MSG)
            
        })
        .catch((err)=>{
            console.log(err)
            alert(err.response.data.MSG)
            if(err.response.data.MSG=== "token expires"){
                localStorage.removeItem("token")
                localStorage.removeItem("role")
                navigate("/login")
            }
        })
        setoldpassword("")
        setnewpassword("")
        setconfirmpassword("")
    }

  return (
    <div>
      <Header />
            <h2 style={{ marginTop: 60 }}>CHANGE PASSWORD</h2>
            <section className="bg0 p-b-85">
                <div className="container" >
                    <div className="flex-w flex-tr">
                        <div className="size-210 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md" style={{ margin: 'auto' }}>
                            <form onSubmit={handleSubmit}>
                                <div className="bor8 m-b-20 how-pos4-parent">
                                    <input
                                        className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30"
                                        type="password"
                                        required
                                        name="oldpassword"
                                        onChange={(e) => setoldpassword(e.target.value)}
                                        placeholder="Enter a old Password"
                                    />

                                </div>
                                <div className="bor8 m-b-20 how-pos4-parent">
                                    <input
                                        className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30"
                                        type="password"
                                        name="newpassword"
                                        required
                                        placeholder="Enter a New Password"
                                        onChange={(e) => setnewpassword(e.target.value)}
                                    />
                                </div>
                                <div className="bor8 m-b-20 how-pos4-parent">
                                    <input
                                        className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30"
                                        type="password"
                                        name="confirmpassword"
                                        required
                                        placeholder="Enter a Confirm Password"
                                        onChange={(e) => setconfirmpassword(e.target.value)}
                                    />
                                </div>
                                <button
                                    className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer"
                                    type='submit'
                                >
                                    Change Password
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

export default ChangePassword
