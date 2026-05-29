import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { CUSTOMERLIST, MANAGECUSTOMER } from '../utility/Constant'
import Footer from '../controller/Footer'
import Header from '../controller/Header'

const ManageCustomer = () => {
    var [clist,setclist]=useState([])

    useEffect(()=>{
        getCustomerList()
    },[])

    const getCustomerList=()=>{
        axios.get(CUSTOMERLIST)
        .then((response)=>{
            console.log(response.data.customers)
            setclist(response.data.customers)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handleManageCustomer=(cid,s)=>{
        if(s === 1){
            let url=MANAGECUSTOMER+cid+"&s=block"
            console.log(url)
            axios.put(url)
            .then((response)=>{
                console.log(response)
                getCustomerList()
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        else if(s === 0){
            let url=MANAGECUSTOMER+cid+"&s=verify"
            console.log(url)
            axios.put(url)
            .then((response)=>{
                console.log(response)
                getCustomerList()
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    const handleDeleteCustomer=(cid)=>{
        console.log(cid)
        let url=MANAGECUSTOMER+cid
        console.log(url)
        axios.put(url)
        .then((response)=>{
            console.log(response.data.MSG)
            alert(response.data.MSG)
            getCustomerList()
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div>
      <Header />
            <h1 style={{ marginTop: 60 }}>Manage Customer</h1>
            {clist.length > 0 ?
                <div className="col-lg-12 col-xl-12 m-b-50">
                    <div className="wrap-table-shopping-cart">
                        <table className="table-shopping-cart">
                            <thead>
                                <tr className="table_head">
                                    <th className="column-1">S.No</th>
                                    <th className="column-1">Name</th>
                                    <th className="column-2">Email</th>
                                    <th className="column-2">Address</th>
                                    <th className="column-2">Mobile</th>
                                    <th className="column-2">Gender</th>
                                    <th className="column-2" colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clist.map((customer, index) =>
                                    customer.role === "admin" ? null :
                                        <tr className="table_row" key={index}>
                                            <td className="column-3">{index + 1}</td>
                                            <td className="column-1">
                                                {customer.name}
                                            </td>
                                            <td className="column-2">
                                                {customer.email}
                                            </td>
                                            <td className="column-2">
                                                {customer.address}
                                            </td>
                                            <td className="column-2">
                                                {customer.mobile}
                                            </td>
                                            <td className="column-2">
                                                {customer.gender}
                                            </td>
                                            <td className="column-2">
                                                <button
                                                    className="flex-c-m stext-101 cl0 size-121 bg10 bor1  p-lr-15 trans-04 pointer"
                                                    onClick={() => handleDeleteCustomer(customer._id)}
                                                >DELETE</button>
                                            </td>
                                            <td className="column-2">
                                                {customer.status === 0 ?
                                                    <button
                                                        className="flex-c-m stext-101 cl0 size-121 bg11 bor1  p-lr-15 trans-04 pointer"
                                                        onClick={() => handleManageCustomer(customer._id, customer.status)}
                                                    >VERIFY</button> :
                                                    <button
                                                        className="flex-c-m stext-101 cl0 size-121 bg12 bor1  p-lr-15 trans-04 pointer"
                                                        onClick={() => handleManageCustomer(customer._id, customer.status)}
                                                    >BLOCK</button>}
                                            </td>
                                        </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div> : <div align='center'>
                    <h1>No Customer Found</h1>
                </div>}

            <Footer />
    </div>
  )
}

export default ManageCustomer
