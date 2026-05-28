import customerModal from "../Modals/customerModal.js";
import productModal from "../Modals/productModal.js";
import dotenv from 'dotenv'
dotenv.config({path:"./config/config.env"})



class adminController {
    static addproducts = async (req, res) => {
        const { product_brand, product_description, product_category, product_mrp, product_sp, product_discount, product_variant_name, product_size, product_color, product_quantity, product_availability } = req.body

        console.log(req.body)

        try {
            const productimage = req.files
            console.log(productimage)

            const newproduct = productimage.map((data) => {
                return {
                    type: data.mimetype,
                    name: data.filename,
                    path: `http://localhost:${process.env.PORT_NO}/` + data.path,
                    size: data.size
                }
            })
            console.log(newproduct)

            const uploadproduct=new productModal({
                product_brand,
                product_description,
                product_quantity,
                product_availability,
                product_color,
                product_mrp,
                product_sp,
                product_discount,
                product_category,
                product_variant_name,
                product_size,
                product_imageurl: newproduct
            })

            const uploadedproduct=await uploadproduct.save()

            return res.status(200).json({
                MSG:"product add successfully",
                Record: uploadedproduct
            })

        } catch (error) {
            return res.status(400).json({
                MSG:"Product not added",
                error:error
            })
        }
    }
    static deleteproducts=async (req,res)=>{
        const {product_id}=req.query
        console.log("product_id",product_id)

        try {
            var data=await productModal.findByIdAndDelete(product_id)
            console.log("data",data)

            for (const obj of data.product_imageurl) {
                fs.unlink(`./multiplesfiles/${obj.name}`,(err)=>{
                    if(err){
                        console.log("file is not deleted",err)
                    }
                    else{
                        console.log("file deleted successfully")
                    }
                })
            }
            return res.status(200).json({
                MSG:"product deleted successfully"
            })
        } catch (error) {
            return res.status(400).json({
                MSG:"product not deleted successfully",
                error:error
            })
        }
    }
    static customerlist=async(req,res)=>{
        try {
            var customers=await customerModal.find()
            return res.status(200).json({
                customers
            })
        } catch (error) {
            return res.status(400).json({
                error:error
            })
        }
    }
    static managecustomerstatus=async(req,res)=>{
        const {id,s}=req.query
        console.log("get id=====>",id,s)
        if(s=="block"){
            const result=await customerModal.findByIdAndUpdate({
                _id:id
            },{
                $set:{
                    status:0
                }
            },{
                new:true,
                useFindAndModify:false
            })
            res.status(200).json({
                record:result
            })
        }
        else if(s=="verify"){
            const result=await customerModal.findByIdAndUpdate({
                _id:id
            },{
                $set:{
                    status:1
                }
            },{
                new:true,
                useFindAndModify:false
            })
            return res.status(200).json({
                record:result
            })
        }
        else{
            await customerModal.findByIdAndDelete({
                _id:id
            },{
                new:true,
                useFindAndModify:false
            })
            return res.status(200).json({
                MSG:"Record Delete Successfully"
            })
        }
    }
}

export default adminController