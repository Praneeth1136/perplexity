import express from "express";
import cookieParser from "cookie-parser";

import authRouter from "../routers/auth.router.js";


const app = express();

//MiddleWare

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


//HealthCheck

app.get("/",(req,res) => {
    res.json({message:"Server is running"});
});

app.use("/api/auth",authRouter);

export default app;