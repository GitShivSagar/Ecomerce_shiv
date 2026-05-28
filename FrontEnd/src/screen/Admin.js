import React,{useState,useEffect} from 'react'
import Header from '../controller/Header'
import Footer from '../controller/Footer'
import axios from 'axios'
import { PRODUCTS } from '../utility/Constant'
import { Link } from 'react-router-dom'



const Admin = () => {
   const [productlist, setproductlist] = useState([])

    useEffect(() => {
        getProductList()
    }, [])

    const getProductList = () => {
        axios.get(PRODUCTS)// we can use manually url or api here also but for clean code we store in a varaiable and use it instead of api or url.
            .then((response) => {
                console.log(response.data)
                setproductlist(response.data.products)//here products is coming from indexController static varaible 
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>
          <Header/>
            <div className="row isotope-grid">
                {productlist.length > 0 ?
                    productlist.map((product, index) =>
                        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                            {/* key={index} */}

                            {/* <-- Block2 --> */}
                            <div className="block2 m-t-60">
                                <div className="block2-pic hov-img0 ">
                                    <img src={product.product_imageurl[0].path} alt="IMG-PRODUCT" style={{height:370}} >
                                    </img>

                                    <Link
                                        to={`/customer/cproductdetails/${product._id}`}
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
          <Footer/>
        </div>
    )
}
export default Admin
