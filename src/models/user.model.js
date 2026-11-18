import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            loercase: true,
            trim: true,
            index: true    //for searching in mongodb
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        avatar:{
            type: String, //cloudinary url
            required: true
        },
        coverImage:{
            type:String
        },
        watchHistory:[ //an array as we will ad multiple value in it
{
    type: Schema.Types.ObjectId,
    ref:"Video"
}
        ],
        password:{
            type:String,
            required:[true,'Password is required']
        },
        refreshToken:{
            type:String
        }
    },{timestamps:true}
)

 //for hashing

userSchema.pre("save",async function(next){   //simple fxn to use this not arraow fxn

if(!this.isModified("password")) return next()  //if not modified return next

    this.password=bcrypt.hash(this.password,10) //when modifies the hash
next()
})

//custome methods in mongoose 

userSchema.methods.isPasswordCorrect=async function(password){ //password need to be checked
    //check password
  return await bcrypt.compare(password,this.password) //compare both original and hashed
}

//tokens  (signing token)
userSchema.methods.generateAccessToken=function(){
    return jwt_sign(
        {
            _id:this_id,   //comes from mongodb
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
         expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt_sign(
        {
            _id:this_id,   //comes from mongodb
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
         expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const user = mongoose.model("User", userSchema); //name and what Schema to refer (in mongodb USER will be saved as users plural )