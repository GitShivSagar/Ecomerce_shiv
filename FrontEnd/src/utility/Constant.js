
const BASE_URL=process.env.REACT_APP_API_URL

export const PRODUCTS=BASE_URL+'products'
export const PRODUCT_DETAILS=BASE_URL+'productdetails?pid='
export const LOGIN=BASE_URL+'login'
export const REGISTER=BASE_URL+'register'
export const SEND_EMAIL=BASE_URL+'senduserpasswordresetemail'
export const FORGOTPASSWORD=BASE_URL+'userpasswordreset?id='
export const ADDTOCART=BASE_URL+'customer/addtocart?customer_id='// this is for add any item in cart
export const CARTDETAILS=BASE_URL+'customer/cartdetails?customer_id='
export const EMPTYCART=BASE_URL+'customer/emptycart?customer_id='
export const CREATEORDER = BASE_URL + "customer/orders?customer_id="// this is for add any new item with the existing item in cart 
export const ORDERLIST = BASE_URL + "customer/orderList?customer_id="// this is for get list of ordered item after make payment
export const DELETECART=BASE_URL+"customer/deletecart?_id="
export const EDITPROFILE=BASE_URL+"customer/editprofile?id="
export const CHECKOUT=BASE_URL+"customer/checkout"
export const GETKEY=BASE_URL+"customer/getkey"

export const PAYMENTVERIFICATION=BASE_URL+"customer/paymentverification" 

export const PROFILE=BASE_URL+"customer/profile?id="
export const CHANGEPASSWORD=BASE_URL+"customer/changePassword?id="
export const UPLOAD_DOC=BASE_URL+"customer/uploaddocument"

// yaha par wahi details aati h jo backend code me hoti h jaise ki customer_id 
export const PROFILEPIC=BASE_URL+"customer/profilepic?customer_id="
export const ADDPRODUCT=BASE_URL+"admin/addproducts"
export const DELETEPRODUCT=BASE_URL+"admin/deleteproducts?product_id="
export const MANAGECUSTOMER=BASE_URL+"admin/managecustomer?id="
export const CUSTOMERLIST=BASE_URL+"admin/customerlist"
export const PRODUCT_FILTER=BASE_URL+"filterproduct"