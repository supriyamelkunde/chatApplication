import { userModel } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

 export const register = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        // Check if all required fields are provided
        if (!fullName || !userName || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check if user already exists
        const user = await userModel.findOne({ userName });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Profile photo URLs based on gender from avtar placeholder site
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?userName=${userName}`;
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?userName=${userName}`;

        // Create the new user (note: confirmPassword is not saved in the database)
        await userModel.create({
            fullName,
            userName,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });

        

        // Send success response
        return res.status(201).json({ message: "Account created successfully", success: true });
        console.log(user)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

 export const login = async (req,res) => {
    try {
        const {userName, password}= req.body;

        if ( !userName || !password){
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await userModel.findOne({userName});
        if(!user){
            return res.status(400).json({
                message: "incorrect username ",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, userModel.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "incorrect password",
                success: false
            })
        }

        const tokenData={
            userId:user._id
        }
        const token = await jwt.sign(tokenData, JWT_SECRET_KEY, {expiresIn:'1d'});

        return res.status(200).cookie('token', token, {maxAge: 1*24*60*60*1000, httpOnly: true, sameSite:'strict'}).json({
            _id: user._id,
            userName: user.userName,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        });

        //55.10 timestamp
    } catch (error) {
        console.log(error)
    }
}

