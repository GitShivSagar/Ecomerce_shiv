import React from 'react'
import { useState } from 'react'
import { ADDPRODUCT } from '../utility/Constant'
import Footer from '../controller/Footer'
import Header from '../controller/Header'
import axios from 'axios'




const AddProduct = () => {
    let imgarr=[]
    const [p_description,setp_description]=useState("")
    const [p_sprice,setp_sprice]=useState(0.0)
    const [p_mprice,setp_mprice]=useState(0.0)
    const [p_color,setp_color]=useState("")
    const [p_brand,setp_brand]=useState("")
    const [p_variant,setp_variant]=useState("")
    const [p_category,setp_category]=useState("")
    const [p_availability,setp_availability]=useState("")
    const [p_discount,setp_discount]=useState()
    const [p_size,setp_size]=useState("")
    const [p_quantity,setp_quantity]=useState(1)


    const saveFile=(e)=>{
        console.log(e.target.files.length)
        for(var a=0;a<e.target.files.length;a++){
            console.log(e.target.files[a])
            imgarr.push(e.target.files[a])
        }
    }


    const handleAddProduct=(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append("product_brand",p_brand)
        formdata.append("product_color",p_color)
        formdata.append("product_availability",p_availability)
        formdata.append("product_quantity",p_quantity)
        formdata.append("product_mrp",p_mprice)
        formdata.append("product_sp",p_sprice)
        formdata.append("product_size",p_size)
        formdata.append("product_variant_name",p_variant)
        formdata.append("product_description",p_description)
        formdata.append("product_category",p_category)
        formdata.append("product_discount",p_discount)
        imgarr.forEach(image=>{
            formdata.append("product_imageurl",image)
        })
        axios.post(ADDPRODUCT,formdata,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        .then((response)=>{
            console.log(response)
            alert("ADD product Successfully")
            setp_availability("")
            setp_brand("")
            setp_category("")
            setp_color("")
            setp_description("")
            setp_discount("")
            setp_mprice("")
            setp_quantity("")
            setp_size("")
            setp_sprice("")
            setp_variant("")
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div>
      <Header />
      <section className="bg0 p-t-10 p-b-50">
        <div className="container">
            <div className="size-210 p-lr-70 p-t-60 p-b-20 p-lr-15-lg w-full-md" style={{ margin: 'auto' }}>
              <form onSubmit={handleAddProduct}>
                <h4 className="mtext-105 cl2 txt-center p-b-10">
                  Add Product
                </h4>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-119 p-l-62 p-r-30" type="text"
                    name="p_brand"
                    required
                    value={p_brand}
                    onChange={(e) => setp_brand(e.target.value)}
                    placeholder="Enter a Product Brand"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-119 p-l-62 p-r-30" type="text"
                    name="p_variant"
                    required
                    value={p_variant}
                    onChange={(e) => setp_variant(e.target.value)}
                    placeholder="Enter a Product Variant"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-119 p-l-62 p-r-30" type="text"
                    name="p_category"
                    required
                    value={p_category}
                    onChange={(e) => setp_category(e.target.value)}
                    placeholder="Enter a Product Category"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-119 p-l-62 p-r-30" type="text"
                    name="p_mprice"
                    required
                    value={p_mprice}
                    onChange={(e) => setp_mprice(e.target.value)}
                    placeholder="Enter a Product Max Price"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-119 p-l-62 p-r-30" type="text"
                    name="p_sprice"
                    required
                    value={p_sprice}
                    onChange={(e) => setp_sprice(e.target.value)}
                    placeholder="Enter a Product Selling Price"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-119 p-l-62 p-r-30" type="text"
                    name="p_color"
                    required
                    value={p_color}
                    onChange={(e) => setp_color(e.target.value)}
                    placeholder="Enter a Product Color"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-119 p-l-62 p-r-30" type="text"
                    name="p_discount_percentage"
                    required
                    value={p_discount}
                    onChange={(e) => setp_discount(e.target.value)}
                    placeholder="Enter a Product Discount Percentage"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-119 p-l-62 p-r-30" type="text"
                    name="p_size"
                    required
                    value={p_size}
                    onChange={(e) => setp_size(e.target.value)}
                    placeholder="Enter a Product Size"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-119 p-l-62 p-r-30" type="text"
                    name="pdesc"
                    required
                    value={p_description}
                    onChange={(e) => setp_description(e.target.value)}
                    placeholder="Enter a Product Description"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-119 p-l-62 p-r-30" type="text"
                    name="p_quantity"
                    required
                    value={p_quantity}
                    onChange={(e) => setp_quantity(e.target.value)}
                    placeholder="Enter a Product Quantity"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-119 p-l-62 p-r-30" type="text"
                    name="p_availability"
                    required
                    value={p_availability}
                    onChange={(e) => setp_availability(e.target.value)}
                    placeholder="Enter a Product Availability"
                  />
                </div>
                <div className="bor8 m-b-10 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-119 p-l-62 p-r-30" type="file"
                    multiple
                    name="upload_doc"
                    required
                    onChange={saveFile}
                  />
                </div>
                <button className="flex-c-m stext-101 cl0 size-121 bg3 bor1 p-lr-15 trans-04 pointer">
                  Add Product
                </button>
              </form>
            </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default AddProduct
