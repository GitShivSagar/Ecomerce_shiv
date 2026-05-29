import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
import { ORDERLIST } from '../utility/Constant'
import Footer from '../controller/Footer'
import Header from '../controller/Header'
import { Link } from 'react-router-dom'


const MyOrder = () => {
    const [orderlist,setorderlist]=useState([])
    
    useEffect(()=>{
        var c_id=localStorage.getItem("id")
        axios.get(ORDERLIST+c_id)
        .then((response)=>{
            console.log(response)
            setorderlist(response.data.orderlist[0].orders)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
  return (
    <div>
      <Header />
            <div style={{marginTop:60}}></div>
            <div id="wrapper"
                className="container ">
                <div className="row">
                    <div className="span12">
                        <h4 className="title"><span className="text"><strong>MY</strong> ORDERS</span></h4>
                        {orderlist.length > 0 ?
                            <table className="table table-striped" style={{ fontSize: 20, marginBottom: 100 }}>
                                <thead>
                                    <tr>
                                        <th> Brand</th>
                                        <th> Variant</th>
                                        <th> Description</th>
                                        <th> Image</th>
                                        <th> Price</th>
                                        <th> Quantity</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderlist.map((order, index) =>
                                        <tr key={order.product_id}>
                                            <td>{order.product_brand}</td>
                                            <td>{order.product_variant_name}</td>
                                            <td>{order.product_description}</td>
                                            <td>
                                                <img src={order.product_imageurl}
                                                    alt={order.product_brand}
                                                    style={{ width: 100, height: 100 }}
                                                />
                                            </td>
                                            <td>
                                                &#8377;{order.product_price}
                                            </td>
                                            <td>
                                                {order.product_quantity}
                                            </td>
                                            <td>&#8377;{order.product_price * order.product_quantity}
                                                {/* <p style={{ display: 'none' }}>{grandTotal += order.product_price * order.product_quantity}</p> */}

                                            </td>
                                            
                                            <td><Link to={`/customer/productdetails/${order.product_id}`}>DETAILS</Link></td>
                                        </tr>
                                    )}
                                    
                                </tbody>
                            </table> : <h3>Your Order List is Empty</h3>}
                    </div>
                </div>
            </div>
            <Footer />
    </div>
  )
}

export default MyOrder
