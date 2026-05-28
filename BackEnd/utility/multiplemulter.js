import multer from 'multer'

const storageengine=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./multiplefiles")
    },
    filename:(req,file,callback)=>{
        callback(null,Date.now()+"_"+file.originalname)
    }
})

var multiplefileupload=multer({storage:storageengine})


export default multiplefileupload