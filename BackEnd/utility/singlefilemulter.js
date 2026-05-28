import multer from 'multer'

/*
Returns a Multer instance that provides several methods for generating middleware that process files uploaded in multipart/form-data format.
*/

var storage_engine = multer.diskStorage({
    //create folder to store file(like .png,.doc)
    destination:(req,file,callback)=>{
        callback(null,'./uploaddocuments')
    },
    //get file and update with new name
    filename:(req,file,callback)=>{
        callback(null,Date.now()+"_"+file.originalname)
    }
})
var singleimgupload = multer({storage:storage_engine})
export default singleimgupload