import React, { useState, useEffect,useRef } from 'react'
import axios from 'axios'
import { PRODUCTS,PRODUCT_FILTER } from '../utility/Constant'
import { Link } from 'react-router-dom'
import Header from '../controller/Header'
import {motion,AnimatePresence} from 'framer-motion'


const Index = () => {
    const searchData=useRef()
    const [activeFilters,setactiveFilter]=useState([])
    const [categorylist,setcategorylist]=useState([])
    const [pVariant,setpVariant]=useState([])
    const [productlist, setproductlist] = useState([])
    const [show, setshow] = useState(false)

    useEffect(() => {
        getProductList()
    }, [])

    const getProductList = () => {
        axios.get(PRODUCTS)// we can use manually url or api here also but for clean code we store in a varaiable and use it instead of api or url.
            .then((response) => {
                console.log(response.data)
                setproductlist(response.data.products)//here products is coming from indexController static varaible 
                setcategorylist(response.data.products)//here products is coming from indexController static varaible 
                let setdata=new Set()
                response.data.products.map(d=>setdata.add(d.product_category))
            console.log(setdata)
            setpVariant([...setdata])
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const handleChange=(e)=>{
        const {name,value,checked}=e.target
        console.log([name],value,checked)

        if(name==="category"){
            if(checked){
                setactiveFilter([...activeFilters,value])
                handleFilter1([...activeFilters,value])
            }
        else{
            setactiveFilter(activeFilters.filter(data=>data!==value))
            handleFilter1(activeFilters.filter(data=>data!==value))
        }
    }
    }

    const handleFilter1=(catname)=>{
        console.log("catname",catname)
        const categoryString=catname.join(',')//The join() method in JavaScript is a built-in Array.prototype method used to convert all elements of an array into a single string. It returns a new string, leaving the original array unchanged. Syntax:array.join([separator])
        console.log('categoryString',categoryString)
        if(categoryString!=""){
            var url=`${PRODUCT_FILTER}?product_category=${categoryString}`// Previous path:==   PRODUCT_FILTER + categoryString
            console.log("url",url)
            axios.get(url)
            .then((response)=>{
                console.log(response)
                setproductlist(response.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        else{
            getProductList()
        }
    }


    const handleSearch=(e)=>{
        var value=searchData.current.value
        //jeans
        console.log(value.toLowerCase())
        if(value!==""){
            var newData=productlist.filter((prod)=>{
                var arr=Object.values(prod)
                console.log("arr",arr)
                var str=arr[1]+" "+arr[3]
                console.log("str",str)
                return str.toLowerCase().includes(value.toLowerCase())
            })
            console.log("newData",newData)
            //filterarray
            setproductlist(newData)
        }
        else{
            //main array
            setproductlist(categorylist)
        }
    }

    return (
        <div>
            <Header/>
            <div style={{ display: 'flex', width: '100%', marginTop: 60 }}>
				{/* ==== left side */}
				<div style={{ width: '20%', borderRight: '1px solid lightgrey' }}>
					<h3>Filter Product</h3>
					{pVariant.map((d, index) =>
						<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
							key={index}
						>
							<label style={{ display: 'flex', alignItems: 'center' }}>
								<input
									style={{ flex: 'none' }}
									name="category"
									type="checkbox"
									value={d}
								    onChange={handleChange}
								/>&nbsp;
								{d}
							</label>
						</div>
					)}
				</div>
				{/* ===== right side */}
				<div style={{ width: '80%' }}>
					{/* =========== Search ====== */}
					<div style={{ marginTop: 20 }}>
						<div className="flex-c-m stext-106 cl6 size-105 bor4 pointer trans-04 m-tb-4 js-show-search"
							onClick={() => setshow(!show)}
						>
							{show ?
								<i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close"></i> :
								<i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
							}
							Search
						</div>
					</div>
					<AnimatePresence initial={false}>
						{show && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: 'auto', opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.5, ease: 'easeInOut' }}
								style={{ overflow: 'hidden', marginBottom: 5 }}
							>
								<div className="bor8 dis-flex p-l-10 m-l-10 m-r-10 search-wrapper">
									<button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
										<i className="zmdi zmdi-search"></i>
									</button>

									<input className="mtext-107 cl2 size-114 plh2 p-r-15"
										type="text"
										name="search-product" placeholder="Search by brand name"
										ref={searchData}
										onChange={handleSearch}
									/>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
            <div className="row isotope-grid">
                {productlist.length > 0 ?
                    productlist.map((product, index) =>
                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                            {/* key={index} */}

                            {/* <-- Block2 --> */}
                            <div className="block2 m-t-70">
                                <div className="block2-pic hov-img0 ">
                                    <img src={product.product_imageurl[0].path} alt="IMG-PRODUCT" style={{height:370}} >
                                    </img>

                                    <Link
                                        to={`/productdetails/${product._id}`}
                                        className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                        Quick View
                                    </Link>
                                </div>

                                <div className="block2-txt flex-w flex-t p-t-14">
                                    <div className="block2-txt-child1 flex-col-l ">
                                        <a href="product-detail.html" className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                            {product.product_brand}
                                        </a>

                                        <span className="stext-105 cl3">
                                            &#8377;{product.product_mrp}
                                        </span>
                                    </div>

                                    <div className="block2-txt-child2 flex-r p-t-3">
                                        <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                            <img className="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                                            <img className="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : <div style={{ margin: 'auto' }}><h1>No Product Found </h1></div>
                }
            </div>
        </div>
        </div>
        
        </div>
    )
}

export default Index
