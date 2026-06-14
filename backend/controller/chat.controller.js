import {generateResponse,generateChatTitle} from "../services/ai.service.js"
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export async function sendMessage(req,res){
    const { message, chat: bodyChat, chatId } = req.body;
    const activeChatId = bodyChat || chatId;

    let chat = null;

    if(!activeChatId){
        const title = await generateChatTitle(message);
        chat = await chatModel.create({
            user:req.user.id,
            title,
        })
    } else {
        chat = await chatModel.findOne({ _id: activeChatId, user: req.user.id });
        if (!chat) {
            return res.status(404).json({
                message: "Chat not found",
                success: false
            });
        }
    }

    const userMessage = await messageModel.create({
        chat:chat._id,
        content:message,
        role:"user",

    })

    const messages = await messageModel.find({
        chat:chat._id
    })

    const result = await generateResponse(messages);

     const aiMessage = await messageModel.create({
        chat:chat._id,
        content:result,
        role:"ai",

    })

    res.json({
        title : chat.title,
        response:result,
        chat,
        aiMessage,
        
    })

    console.log(messages);
}

export async function getChats(req,res){
    const user = req.user;
    const chats = await chatModel.find({
        user:user.id
    })

    res.status(200).json({
        message:"chats retrieved successfully",
        success:true,
        chats
    })
}

export async function getMessages(req,res){
    const {chatId} = req.params;

    const chat = await chatModel.findOne({
        _id:chatId,
        user:req.user.id,
    })

    if(!chat){
        return res.status(404).json({
            message: "chat not found",
            success:false,
        })
    }

    const messages = await messageModel.find({
        chat:chat._id
    })

    res.status(200).json({
        message:"messages retrieved successfully",
        success:true,
        messages
    })
}

export async function deleteChat(req,res){
    const {chatId} = req.params;

    const chat = await chatModel.findOne({
        _id:chatId,
        user:req.user.id
    })
    
    if(!chat){
        return res.status(404).json({
            message: "chat not found",
            success:false,
        })
    }

    await messageModel.deleteMany({
        chat:chatId
    })
    
    await chatModel.deleteOne({
        _id:chatId,
        user:req.user.id
    })
    res.json({
        message:"chat deleted successfully",
        success:true
    })
}