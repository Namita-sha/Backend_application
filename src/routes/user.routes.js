import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"


const router=Router()

router.route("/register").post( //for file handling and validation
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
         name:"coverImage",
         maxCount:1   
        }
    ]), //field takes multipe array filed 
    registerUser)     
//url  http://localhost:8000/api/v1/users/register

export default router