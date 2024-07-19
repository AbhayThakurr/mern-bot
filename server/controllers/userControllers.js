import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/userHelper.js";
import jwt from "jsonwebtoken";

export const signUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).json({ message: "User Already exist" });
    }

    const hashedPassword = await hashPassword(password);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    return res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ message: "Invalid Email or Passeord" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email is not Registered" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Password Is Incorrect" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: maxAge,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "Login Successfull", token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
