import { v2 as cloudinary } from "clou dinary"
import fs from "fs"

import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload an image
    const uploadCloudinary=async(localFilePath)=>{
        try{
            if(!localFilePath)
                return null
            //upload file on cloudinary
            const response=await cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto"
            })
        //file has been uploaded successfully
        console.log("file is uploaded on cloudinary",response.url);
        return response

        }
        catch(error){
            //remove locally saved temporary file as the upload operation got failed

            fs.unlinkSync(localFilePath)
            return null;
        }
    }

    export {uploadCloudinary}