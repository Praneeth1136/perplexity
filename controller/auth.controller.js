import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import sendEmail from "../services/email.service.js";

export async function register(req, res) {

    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this username or email",
      });
    }

    const user = await userModel.create({ username, email, password });

    await sendEmail ({
        to: email,
        subject: "Welcome to Perplexity",
        text: `Hi ${username},\n\nThank you for registering with Perplexity. We're excited to have you on board!\n\nIf you need any help, feel free to reply to this email.\n\nBest regards,\nThe Perplexity Team`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h1>Welcome to Perplexity, ${username}!</h1>
                <p>Thank you for registering with us. We're excited to have you on board.</p>
                <p>If you have any questions, feel free to reply to this email or visit our support page.</p>
                <p>Best regards,<br/><strong>The Perplexity Team</strong></p>
            </div>
        `
    })

    res.status(201).json({
        message:"User registered successfully",
        success:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
        }
    })

};
