import {Router} from "express";
import {authUser} from "../middlewares/auth.middleware.js";
import {sendMessage} from "../controller/chat.controller.js";

const chatRouter = Router();

chatRouter.post("/message",authUser,sendMessage)


export default chatRouter;