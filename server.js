import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./config/database.js";
import {testAI} from "./services/ai.service.js";


const PORT = process.env.PORT || 3000;

testAI();

connectDB()
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((err)=>{
        console.error("MongoDB connection failed:",err);
    })