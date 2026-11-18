import multer from "multer";
 const storage=multer.diskStorage({
    destination:function(req,file,cb){  //file is with multer 
        //callback
        cb(null,"./public/temp")
    },
    filename:function(req,file,cb){
       
        cb(null.file.orinalname)
    }
 })
 export const upload=multer({storage})