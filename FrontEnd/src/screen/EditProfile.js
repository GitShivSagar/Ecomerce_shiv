import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { EDITPROFILE, PROFILE } from '../utility/Constant'
import axios from 'axios'
import Header from '../controller/Header'
import Footer from '../controller/Footer'



const EditProfile = () => {

    const navigate=useNavigate()
    const [name,setname]=useState("")
    const [mobile,setmobile]=useState("")
    const [gender,setgender]=useState("")
    const [address,setaddress]=useState("")
    const [state,setstate]=useState("")
    const [city,setcity]=useState("")
    const [pincode,setpincode]=useState("")
    const [role,setrole]=useState("")

    useEffect(()=>{
        getCustomerProfile()
    },[])


    const getCustomerProfile=()=>{
        let c_id=localStorage.getItem("id")
        console.log("cid",c_id)
        axios.get(PROFILE+c_id)
        .then((response)=>{
            console.log(response.data.record)
            const {name,city,address,state,pincode,mobile,gender,role}=response.data.record
            setname(name)
            setaddress(address)
            setmobile(mobile)
            setpincode(pincode)
            setgender(gender)
            setcity(city)
            setstate(state)
            setrole(role)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        let params={
            name:name,
            mobile:mobile,
            address:address,
            state:state,
            city:city,
            pincode:pincode,
            gender:gender,
            role:role
        }
        console.log(params)
        var id=localStorage.getItem("id")
        var token=localStorage.getItem("token")
        axios.put(EDITPROFILE+id,params,{
            headers:{
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }
        })

        .then((response)=>{
            console.log(response)
            getCustomerProfile()
            alert(response.data.MSG)
        })
        .catch((err)=>{
            console.log(err)
            alert(err.response.data.MSG)
            if(err){
                localStorage.removeItem("id")
                localStorage.removeItem("token")
                navigate("/login")
            }
        })
    }

  return (
    <div>
       <Header />
            <h3 style={{ marginTop: 60 }}>EDITPROFILE</h3>
            <div className="p-t-10 p-b-30" align='center'>
                <form onSubmit={handleSubmit}>
                    <div className="bor19 size-219 m-b-20">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18"
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            placeholder="Name *" />
                    </div>
                    

                    <div className="bor19 size-219 m-b-20">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18"
                            type="text"
                            name="mobile"
                            value={mobile}
                            onChange={(e) => setmobile(e.target.value)}
                            placeholder="Mobile *" />
                    </div>
                    <div className="bor19 size-219 m-b-20">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18"
                            type="text"
                            name="role"
                            value={role}
                            onChange={(e) => setrole(e.target.value)}
                            placeholder="Role *" />
                    </div>

                    <div className="bor19 size-219 m-b-20">
                        <select
                            className="form-select stext-111 cl2 plh3 size-116"
                            style={{ fontSize: 13, border: 'none', backgroundColor: 'white', paddingLeft: 16, boxShadow: 'none' }}
                            value={state}
                            onChange={(e) => setstate(e.target.value)}

                        >
                            <option selected
                            >Select a State *</option>                  <option value="M.P">M.P</option>
                            <option value="U.P">U.P</option>
                        </select>
                    </div>

                    <div className="size-219 m-b-20 bor19">
                        <select
                            className="form-select stext-111 cl2 plh3 size-116 p-lr-14"
                            style={{ fontSize: 13, border: 'none', backgroundColor: 'white', paddingLeft: 16, boxShadow: 'none' }}
                            value={city}
                            onChange={(e) => setcity(e.target.value)}
                        >
                            <option selected
                            >Select a City *</option>                  <option value="Indore">Indore</option>
                            <option value="Ujjain">Ujjain</option>
                            <option value="Kanpur">Kanpur</option>
                            <option value="Mirzapur">Mirzapur</option>
                        </select>
                    </div>
                    <div className="bor19 size-219 m-b-20">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18"
                            type="text"
                            name="pincode"
                            value={pincode}
                            onChange={(e) => setpincode(e.target.value)}
                            placeholder="Pincode *" />
                    </div>
                    <div className="bor19 size-219 m-b-20">
                        <textarea className="stext-111 cl2 plh3 size-120 p-lr-18 p-tb-25" name="msg" placeholder="Enter a Address*"
                            value={address}
                            onChange={(e) => setaddress(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="size-219 m-b-20"
                        style={{ display: 'flex', justifyContent: 'center', marginLeft: -30 }}
                    >
                        <div className="form-check" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <input className="form-check-input" type="radio"
                                name="gender"
                                id="exampleRadios"
                                value="male"
                                checked={gender === "male"}
                                onChange={(e) => setgender(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="exampleRadios">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Male
                            </label>
                        </div>
                        <div className="form-check"
                            style={{ display: 'flex', justifyContent: 'space-evenly' }}
                        >
                            <input className="form-check-input" type="radio"
                                name="gender"
                                id="exampleRadios2"
                                value="female"
                                checked={gender === "female"}
                                onChange={(e) => setgender(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="exampleRadios2">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Female
                            </label>
                        </div>
                        <div className="form-check" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <input className="form-check-input" type="radio"
                                name="gender" id="exampleRadios3"
                                value="Other"
                                checked={gender === "other"}
                                onChange={(e) => setgender(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="exampleRadios3">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other
                            </label>
                        </div>
                    </div>
                    <button className="flex-c-m stext-101 cl0 size-125 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-20">
                        Update
                    </button>
                </form>
            </div>
            <Footer />
    </div>
  )
}

export default EditProfile
