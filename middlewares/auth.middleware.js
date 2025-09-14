import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';

export const verifyJWT = async (req, res, next) => {
    console.log("🔍 JWT Middleware started");
    
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        console.log("✅ Token extracted");
        
        if (!token) {
            console.log("❌ No token provided");
            return res.status(401).json({
                success: false,
                message: "Access token required"
            });
        }

        console.log("🔐 Verifying token...");
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("✅ Token verified:", decodedToken);
        
        console.log("🔍 Finding user in database...");
        const user = await User.findById(decodedToken?.userId).select("-password");
        console.log("✅ Database query completed, user found:", !!user);
        
        if (!user) {
            console.log("❌ User not found");
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        console.log("✅ Setting req.user and calling next()");
        req.user = user;
        next();
        
    } catch (error) {
        console.log("💥 JWT Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};