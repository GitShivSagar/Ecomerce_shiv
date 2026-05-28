import React from "react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Index from "../screen/Index";
import ProductDetails from "../screen/ProductDetails";
import Login from "../screen/Login";
import Admin from "../screen/Admin";
import Customer from "../screen/Customer";
import Register from "../screen/Register";
import Logout from "../screen/Logout";
import SendEmail from "../screen/SendEmail";
import ForgotPassword from "../screen/ForgotPassword";
import CProductDetails from "../screen/CProductDetail";
import Cart from "../screen/Cart";
import MakePayment from "../screen/MakePayment";
import PaymentSuccess from "../screen/PaymentSuccess";
import EditProfile from "../screen/EditProfile";
import ChangePassword from "../screen/ChangePassword";
import CProfile from "../screen/CProfile";
import AddProduct from "../screen/AddProduct";
import ViewProduct from "../screen/ViewProduct"
import ManageCustomer from "../screen/ManageCustomer";
import MyOrder from "../screen/MyOrder";

const Routing=()=>{
    return(
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Index/>}></Route>
                    <Route path='/productdetails/:pid' element={<ProductDetails/>}>product details</Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/logout' element={<Logout/>}></Route>
                    <Route path='/admin' element={<Admin/>}></Route>
                    <Route path='/customer' element={<Customer/>}></Route>
                    <Route path='/register' element={<Register/>}></Route>
                    <Route path='/sendemail' element={<SendEmail/>}></Route>
                    <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
                    <Route path='/customer/cproductdetails/:pid' element={<CProductDetails/>}></Route>
                    <Route path='/customer/cart' element={<Cart/>}></Route>
                    <Route path='/customer/makepayment' element={<MakePayment/>}></Route>
                    <Route path='/customer/paymentsuccess' element={<PaymentSuccess/>}></Route>
                    <Route path='/customer/editprofile' element={<EditProfile/>}></Route>
                    <Route path='/customer/changepassword' element={<ChangePassword/>}></Route>
                    <Route path='/customer/cprofile' element={<CProfile/>}></Route>
                    <Route path='/customer/orders' element={<MyOrder/>}></Route>
                    <Route path='/customer/productdetails/:pid' element={<ProductDetails/>}></Route> 
                    <Route path='/admin/addproducts' element={<AddProduct/>}></Route>
                    <Route path='/admin/viewproduct' element={<ViewProduct/>}></Route>
                    <Route path='/admin/managecustomer' element={<ManageCustomer/>}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default Routing