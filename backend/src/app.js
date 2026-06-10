import express from "express";
import cookieParser from "cookie-parser";

import authRouter from "../routers/auth.router.js";

import morgan from "morgan";
import cors from "cors";


const app = express();

//MiddleWare

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}))


//HealthCheck

app.get("/",(req,res) => {
    res.json({message:"Server is running"});
});

app.use("/api/auth",authRouter);

export default app;