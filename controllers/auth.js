import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/user.js";

//email: deep5@gmail.com
//password: deep@111
const registerUser = async (req, res) => {
    try {
        const { name, email, password, gender, interest } = req.body;

        console.log(name,email,password, gender, interest);
     

        const isEmailExist = await User.findOne({ email });

        if (isEmailExist) return res.status(200).json({ success: false, message: "Email already exists!" });

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            gender,
            interest,
            image: req.file.filename || null
        });

        return res.status(200).json({ success: true, message: "User register successfully!" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const loginUser = await User.findOne({ email }).select("+password");

            if (!loginUser) return res.status(400).json({ success: false, message: "Invalid credentials!" });

        const isPasswordMatch = await bcrypt.compare(password, loginUser.password);

        if (!isPasswordMatch) return res.status(400).json({ success: false, message: "Invalid credentials!" });

        const token = jwt.sign({
            email: loginUser.email,
            id: loginUser._id
        // eslint-disable-next-line no-undef
        }, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(200).cookie("accessToken", token, {
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: 'strict',
        }).json({ success: true, message: "User login successfully!" });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: true, message: error.message });
    }
}

const logoutUser = async(req,res) => {
    try{
        await res.clearCookie("accessToken")
        return res.status(200).json({success: true, message: "User Logout Successfully!"})
    }
    catch(error) {
        return res.status(400).json({success: false, message: error.message})
    }
  
}

const userProfile = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findOne({ _id: id });

        return res.status(200).json({ success: true, data: user, message: "User profile fetched successfully!" });
    } catch (error) {
        return res.status(500).json({ success: true, message: error.message });
    }
}



export {
    registerUser,
    loginUser,
    logoutUser,
    userProfile
}