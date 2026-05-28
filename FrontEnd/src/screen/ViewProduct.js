import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DELETEPRODUCT, PRODUCTS } from '../utility/Constant'
import Footer from '../controller/Footer'
import Header from '../controller/Header'


const ViewProduct = () => {
    let navigate=useNavigate()
    const [pdetails,setpdetails]=useState({})

    useEffect(()=>{
        getProductDetails()
    },[])

    const getProductDetails=()=>{
        axios.get(PRODUCTS)
        .then((response)=>{
            console.log(response)
            setpdetails(response.data.products)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handleAddProduct=()=>{
        navigate("/admin/addproducts")
    }

    const handleDeleteProduct=(pid)=>{
        console.log(pid)
        axios.delete(DELETEPRODUCT+pid)
        .then((response)=>{
            console.log(response)
            alert(response.data.MSG)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div>
      <Header />
            <h1 style={{ marginTop: 60 }}></h1>
            {pdetails.length > 0 ?
                <div className="col-lg-12 col-xl-12 m-b-50">
                    <div className="wrap-table-shopping-cart">
                        <table className="table-shopping-cart">
                            <thead>
                                <tr className="table_head">
                                    <th className="column-1">S.No</th>
                                    <th className="column-1">Image</th>
                                    <th className="column-2">Product</th>
                                    <th className="column-2">Price</th>
                                    <th className="column-2">Quantity</th>
                                    <th className="column-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pdetails.map((product, index) =>
                                    <tr className="table_row" key={index}>
                                        <td className="column-3">{index + 1}</td>
                                        <td className="column-1">
                                            <div className="how-itemcart1">
                                                <img src={product.product_imageurl[0].path} alt="IMG" />
                                            </div>
                                        </td>
                                        <td className="column-2">
                                            {product.product_brand} <br></br>{product.product_variant_name}
                                        </td>
                                        <td className="column-2">&#8377;
                                            {product.product_sp}
                                        </td>
                                        <td className="column-2">
                                            {product.product_quantity}
                                        </td>
                                        <td>
                                            <button
                                                className="flex-c-m stext-101 cl0 size-121 bg10 bor1 hov-btn3 p-lr-15 trans-04 pointer"
                                                onClick={() => handleDeleteProduct(product._id)}
                                            >DELETE</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    
                </div> : <div align='center'>
                    <h1>No Product Found</h1>
                    <button className="flex-c-m stext-101 cl0 size-125 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-20"
                        onClick={handleAddProduct}
                    >
                        Add Product Now
                    </button>
                </div>}

            <Footer />
    </div>
  )
}
export default ViewProduct