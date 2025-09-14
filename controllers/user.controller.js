import { User } from "../models/user.model.js";


export const registerUser = async (req, res) => {
    try {
        const { username, email, fullName, password } = req.body;

       
        if (!username || !email || !fullName || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        
        const user = await User.create({
            username: username.toLowerCase(),
            email,
            fullName,
            password
        });

        const createdUser = await User.findById(user._id).select("-password");

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: createdUser
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Registration failed"
        });
    }
};


export const loginUser = async (req, res) => {
    try {
        console.log("=== LOGIN ATTEMPT ===");
        const { email, username, password } = req.body;
        console.log("Request body:", { email, username, password: password ? "PROVIDED" : "MISSING" });

        if ((!username && !email) || !password) {
            console.log("❌ Validation failed: missing fields");
            return res.status(400).json({
                success: false,
                message: "Username/email and password are required"
            });
        }

        console.log("✅ Validation passed, searching for user...");
        const user = await User.findOne({
            $or: [{ username }, { email }]
        });
        console.log("User found:", user ? "✅ YES" : "❌ NO");

        if (!user) {
            console.log("❌ User not found in database");
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("✅ User found, checking password...");
        const isPasswordValid = await user.comparePassword(password);
        console.log("Password valid:", isPasswordValid ? "✅ YES" : "❌ NO");

        if (!isPasswordValid) {
            console.log("❌ Invalid password");
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        console.log("✅ Password valid, generating token...");
        console.log("ACCESS_TOKEN_SECRET exists:", process.env.ACCESS_TOKEN_SECRET ? "✅ YES" : "❌ NO");
        
        const accessToken = user.generateAccessToken();
        console.log("Token generated:", accessToken ? "✅ YES" : "❌ NO");

        const loggedInUser = await User.findById(user._id).select("-password");
        console.log("✅ Login successful!");

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: loggedInUser,
                accessToken
            }
        });

    } catch (error) {
        console.error("💥 LOGIN ERROR:", error.message);
        console.error("Full error:", error);
        return res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};


export const getCurrentUser = async (req, res) => {
    return res.status(200).json({
        success: true,
        data: req.user
    });
};