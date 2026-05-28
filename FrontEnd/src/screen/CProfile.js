import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { PROFILE, PROFILEPIC, UPLOAD_DOC } from '../utility/Constant'
import Header from '../controller/Header'
// import Footer from '../controller/Footer'
import axios from 'axios'


const CProfile = () => {
    const [profilepic,setprofilepic]=useState("")
    const [uploaddoc,setuploaddoc]=useState("")

    const [customerdetails,setcustomerdetails]=useState({})

    useEffect(()=>{
        getCustomerProfilePic()
        getCustomerProfile()
    },[])

    const saveFile=(e)=>{
        console.log(e.target.files.length)
        console.log(e.target.files[0])
        setuploaddoc(e.target.files[0])
    }

    const getCustomerProfile=()=>{
        var id=localStorage.getItem("id")
        console.log("ID",id)
        axios.get(PROFILE+id)
        .then((response)=>{
            console.log(response.data)
            setcustomerdetails(response.data.record)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const getCustomerProfilePic=()=>{
        var id=localStorage.getItem("id")
        axios.get(PROFILEPIC+id)
        .then((response)=>{
            console.log(response)
            console.log(response.data.record.upload_doc)
            setprofilepic(response.data.record.upload_doc)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        var id=localStorage.getItem("id",)
        console.log("id",id)
        console.log("uploaddoc",uploaddoc)

        const formdata=new FormData()
        formdata.append("customer_id",id)
        formdata.append("upload_doc",uploaddoc)// yaha apr upload_doc me error tha phele uploaddoc tha par backend file me upload_doc tha isliye error thi 
        axios.post(UPLOAD_DOC,formdata,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        .then((response)=>{
            console.log(response)
            alert("profile pic upload successfully")
            setuploaddoc("")
            getCustomerProfilePic()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

  return (
    <div>
      <Header />
      <div className="row" style={{ marginTop: 80 }}>
        <div className="order-md-2 col-md-7 col-lg-8 p-b-70" align='left'>
          <div className="p-t-7 p-l-85 p-l-15-lg p-l-0-md">
            <h3 className="mtext-111 cl2 p-b-16">
              {/* Name:{customerdetails.name} */}
            </h3>


            <div className="bor16 p-l-29 p-b-9 m-t-0">
              <p className="stext-114 cl6 p-r-40 p-b-11">
                Name: {customerdetails.name}<br></br>
                Email: {customerdetails.email}<br></br>
                Mobile: {customerdetails.mobile}<br></br>
                Gender: {customerdetails.gender}<br></br>
                Address:- {customerdetails.city} {customerdetails.state} {customerdetails.pincode}
              </p>
              
            </div>
          </div>
        </div>

        <div className="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30">
          <div className="hov-img0">
            <img src={profilepic}
              alt="IMG"
            />
          </div>
          <div align="center">
            <form onSubmit={handleSubmit}>
              <input type='file' 
              onChange={saveFile}
              name='upload_doc'/> <br></br>
              <button className="flex-c-m stext-101 cl0 size-125 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-20"
              type='submit'
              >
                Upload Pic
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  )
}

export default CProfile
