import axios from 'axios'
import React,{useState} from 'react'
import { REGISTER } from '../utility/Constant'
import Footer from '../controller/Footer'
import Header from '../controller/Header'

const Register = () => {

    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [address,setaddress]=useState("")
    const [pincode,setpincode]=useState("")
    const [state,setstate]=useState("")
    const [city,setcity]=useState("")
    const [mobile,setmobile]=useState("")
    const [gender,setgender]=useState("male")
    const [role,setrole]=useState("customer")

    const handleSubmit=(e)=>{
        e.preventDefault()

        let params={
            name:name,
            email:email,
            password:password,
            address:address,
            state:state,
            city:city,
            pincode:pincode,
            gender:gender,
            mobile:mobile,
            role:role
        }

        console.log(params)

        axios.post(REGISTER,params)
        .then((response)=>{
            console.log(response)
            alert(response.data.MSG)
        })
        .catch((error)=>{
            console.log(error)
        })

        setname("")
        setemail("")
        setpassword("")
        setaddress("")
        setmobile("")
        setstate("")
        setcity("")
        setgender("")
        setpincode("")
        setrole("")
    }
    

    return (
        <div>
            <Header />
            <h1 style={{ marginTop: 80 }}>REGISTER</h1>
            <div className="p-t-30 p-b-40" align='center' >
                <form onSubmit={handleSubmit}>
                    <div className="bor19 size-219 m-b-20">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18" type="text"
                            name="name" placeholder="Name *"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                        />
                    </div>

                    <div className="bor19 size-219 m-b-30">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18" type="text"
                            name="email" placeholder="Email*"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>

                    <div className="bor19 size-219 m-b-30">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18" type="text"
                            name="password" placeholder="Password*"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>
                    <div className="bor19 size-219 m-b-30">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18" type="text"
                            name="mobile" placeholder="Mobile*"
                            value={mobile}
                            onChange={(e) => setmobile(e.target.value)}
                        />
                    </div>
                    <div className="bor19 size-219 m-b-30">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18" type="text"
                            name="email" placeholder="Email*"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </div>
                    <div className="bor19 size-219 m-b-30">
                        <textarea className="stext-111 cl2 plh3 size-116 p-lr-18" type="text"
                            name="address" placeholder="Address*"
                            value={address}
                            onChange={(e) => setaddress(e.target.value)}
                        />
                    </div>
                    <div className="bor19 size-219 m-b-30">
                        <textarea className="stext-111 cl2 plh3 size-116 p-lr-18" type="text"
                            name="role" placeholder="Role*"
                            value={role}
                            onChange={(e) => setrole(e.target.value)}
                        />
                    </div>
                    <div className="bor19 size-219 m-b-20">
                        <select
                            className="form-select stext-111 cl2 plh3 size-116"
                            style={{ fontSize: 13, border: 'none', backgroundColor: 'white', paddingLeft: 16, boxShadow: 'none' }}
                            value={state}
                            onChange={(e) => setstate(e.target.value)}
                        >
                            <option
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
                            <option>Select a City *</option>
                            <option value="Indore">Indore</option>
                            <option value="Ujjain">Ujjain</option>
                            <option value="Kanpur">Kanpur</option>
                            <option value="Mirzapur">Mirzapur</option>
                        </select>
                    </div>
                    <div className="bor19 size-219 m-b-30">
                        <input className="stext-111 cl2 plh3 size-116 p-lr-18" type="text"
                            name="pincode" placeholder="Pincode*"
                            value={pincode}
                            onChange={(e) => setpincode(e.target.value)}
                        />
                    </div>

                    <div className="size-219 m-b-20"
                        style={{ display: 'flex', justifyContent: 'center', marginLeft: -30 }}
                    >
                        <div className="form-check" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <input className="form-check-input" type="radio"
                                name="gender"
                                id="exampleRadios"
                                value="Male"
                                checked={gender === "Male"}
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
                                value="Female"
                                checked={gender === "Female"}
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
                                checked={gender === "Other"}
                                onChange={(e) => setgender(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="exampleRadios3">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other
                            </label>
                        </div>
                    </div>

                    <button className="flex-c-m stext-101 cl0 size-125 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-20">
                        Register
                    </button>

                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default Register
