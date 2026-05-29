import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CARTDETAILS, CREATEORDER, EMPTYCART } from '../utility/Constant'
import { useDispatch } from 'react-redux'
import { reset } from "../utility/store"
import { Button } from 'react-bootstrap'


const PaymentSuccess = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const seachQuery = useSearchParams()[0]
    const referenceNum = seachQuery.get("reference")

    useEffect(() => {
        if (!referenceNum) {
            navigate("/customer/")
            return
        }

        const emptyCart = (customerId) => {
            axios.get(EMPTYCART + customerId)
                .then((response) => {
                    console.log(response)
                    dispatch(reset())
                    navigate("/customer/orders/")
                })
                .catch((err) => {
                    alert(err)
                    navigate("/customer")
                })
        }

        const createOrder = (cardData, customerId) => {
            if (!cardData || cardData.length === 0) {
                console.log("Cart is empty,cannot place order")
                return
            }
            const orderData = {
                customer_id: customerId,
                orders: cardData.map(item => ({
                    product_id: item.product_id,
                    product_brand: item.product_brand,
                    product_variant_name: item.product_variant_name,
                    product_description: item.product_description,
                    product_price: item.product_price,
                    product_quantity: item.product_quantity,
                    product_imageurl: item.product_imageurl
                }))
            }

            axios.post(CREATEORDER, orderData)
                .then((response) => {
                    console.log("order created successfully", response.data)
                    emptyCart(customerId)
                })
                .catch((err) => {
                    console.log("Error Creating Order:", err.response?.data || err.message);
                })
        }

        const getCartDetails = () => {
            const customerId = localStorage.getItem("id")
            axios.get(CARTDETAILS + customerId)
                .then((response) => {
                    console.log(response.data.cart._id)
                    let cardData = response.data.cart.products
                    console.log(cardData)
                    createOrder(cardData, customerId)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        getCartDetails()
    }, [dispatch, navigate, referenceNum])

    const onClick = () => {
        navigate("/customer/myorder")
    }
    return (
        <div>
            <h1>Order Successfully</h1>
            <Button onClick={onClick} >Done</Button>
        </div>
    )
}

export default PaymentSuccess
