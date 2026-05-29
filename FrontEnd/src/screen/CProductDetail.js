import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ADDTOCART, PRODUCT_DETAILS } from '../utility/Constant'
import { useParams,useNavigate } from 'react-router-dom'
import SlickSlider from '../controller/SlickSlider'
import Header from '../controller/Header'

const CProductDetails = () => {
	const [sizeArr, setsizeArr] = useState([])
	const [colorArr, setcolorArr] = useState([])
	const [quantity, setquantity] = useState(1)
	const navigate=useNavigate()

	const [pdetails, setpdetails] = useState({})
	const { pid } = useParams()

	useEffect(() => {
		const getProductDetails = () => {
			axios.get(PRODUCT_DETAILS + pid)
				.then((response) => {
					console.log(response)
					setpdetails(response.data.productdetails)
					const { product_size, product_color } = response.data.productdetails
					setsizeArr(product_size.split(","))
					setcolorArr(product_color.split(","))
				})
				.catch((err) => {
					console.log(err)
				})
		}

		getProductDetails()
	}, [pid])


	const increment = () => {
		setquantity(quantity + 1)
	}


	const decrement = () => {
		if (quantity > 1) {
			setquantity(quantity - 1)
		}
	}

	const handleAddToCart=()=>{
		let cid=localStorage.getItem("id")
		let params={
			"product_id":pid,
			"product_quantity": quantity,
            "product_brand": pdetails.product_brand,
            "product_variant_name": pdetails.product_variant_name,
            "product_description": pdetails.product_description,
            "product_price": pdetails.product_sp,
            "product_imageurl": pdetails.product_imageurl[0].path
		}
		console.log(params)
		axios.post(ADDTOCART+cid,params)
		.then((response)=>{
			console.log(response)
			navigate("/customer/cart")
		})
		.catch((error)=>{
			console.log(error)
			alert("Not added item in Cart")
		})
		
	}

	return (
		<div>
			<Header/>
			<section class="sec-product-detail bg0 p-t-65 p-b-60 m-t-40">
				<div class="container">
					<div class="row">
						<div class="col-md-6 col-lg-7 p-b-30">
							<div class="p-l-25 p-r-30 p-lr-0-lg">
								<div class="wrap-slick3 flex-sb flex-w">
									<div class="wrap-slick3-dots"></div>
									<div class="wrap-slick3-arrows flex-sb-m flex-w">
										<div class="slick3 gallery-lb">
											<SlickSlider
											data={pdetails.product_imageurl}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-5 p-b-30">
							<div className="p-r-50 p-t-5 p-lr-0-lg">
								<h4 className="mtext-105 cl2 js-name-detail p-b-14">
									{pdetails.product_brand}&nbsp;{pdetails.product_variant_name}
								</h4>

								<span className="mtext-106 cl2">
									&#8377;{pdetails.product_sp} <small><del className='cl13'>&#8377;{pdetails.product_mrp}</del></small>
									<span className='cl14'>&nbsp;{pdetails.product_discount}% Off</span>
								</span>

								<p className="mtext-104 cl3 p-t-15">
									{pdetails.product_description}
								</p>

								<div className="p-t-33">
									<div className="flex-w flex-r-m p-b-10">
										<div className="size-203 flex-c-m respon6">
											Size
										</div>

										<div className="size-204 respon6-next">
											<div className="rs1-select2 bor8 bg0">
												<select className="form-select" aria-label="Default select example">
													<option selected>Choose an option</option>
													{sizeArr.map((sizedata, index) => {
														return <option value={sizedata}
															key={index}>
															{sizedata}
														</option>
													})}
												</select>
											</div>
										</div>
									</div>

									<div className="flex-w flex-r-m p-b-10">
										<div className="size-203 flex-c-m respon6">
											Color
										</div>

										{/* In JavaScript, when you write return and then press Enter (newline), the JS engine thinks the statement is complete and automatically adds a semicolon ; after return. */}
										<div className="size-204 respon6-next">
											<div className="rs1-select2 bor8 bg0">
												<select className="form-select" aria-label="Default select example">
													<option selected>Choose an option</option>
													{colorArr.map((colordata, index) => {
														return <option value={colordata}
															key={index}>
															{colordata}
														</option>
													})}
												</select>
											</div>
										</div>
									</div>

									<div className="flex-w flex-r-m p-b-10">
										<div className="size-204 flex-w flex-m respon6-next">
											<div className="wrap-num-product flex-w m-r-20 m-tb-10">
												<div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
													onClick={decrement}
												>
													<i className="fs-16 zmdi zmdi-minus"></i>
												</div>

												<input className="mtext-104 cl3 txt-center num-product"
													type="number"
													value={quantity}
													name="quantity"
													onChange={(e) => setquantity(e.target.value)}
												/>

												<div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
													onClick={increment}
												>
													<i className="fs-16 zmdi zmdi-plus"></i>
												</div>
											</div>

											<button className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
											onClick={handleAddToCart}
											>
												Add to cart
											</button>
										</div>
									</div>
								</div>
								<div className="flex-w flex-m p-l-100 p-t-40 respon7">
									<div className="flex-m bor9 p-r-10 m-r-11">
										<button type="button" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100 border-0 bg-transparent" data-tooltip="Add to Wishlist" aria-label="Add to Wishlist">
											<i className="zmdi zmdi-favorite"></i>
										</button>
									</div>

									<button type="button" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100 border-0 bg-transparent" data-tooltip="Facebook" aria-label="Facebook">
										<i className="fa fa-facebook"></i>
									</button>

									<button type="button" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100 border-0 bg-transparent" data-tooltip="Twitter" aria-label="Twitter">
										<i className="fa fa-twitter"></i>
									</button>

									<button type="button" className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100 border-0 bg-transparent" data-tooltip="Google Plus" aria-label="Google Plus">
										<i className="fa fa-google-plus"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section >
		</div >
	)
}

export default CProductDetails
