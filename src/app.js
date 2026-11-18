import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit: "10kb"}))
app.use(express.urlencoded({extened:true,limit:"16kb"}))
app.use(express.static("public"))  //to store images etc
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'


//routes declaration //cant use app.get as now rotes and controllers are seperate so have to use middle ware
app.use("/api/v1/users",userRouter)

export {app}