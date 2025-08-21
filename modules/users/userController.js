import { hashedPassword } from "../../utils/bcrypt.js";
import UserModel from "./userModel.js";

//REGISTER
const register = async (req, res) => {
  try {
    const { userName, email, password, address, phone } = req.body;
    if (!userName || !email || !password || !address || !phone) {
      return res.status(400).json({
        success: false,
        message: "Provide all fields",
      });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "This email is already registerd",
      });
    }
    const hashedPass = hashedPassword(password);
    const newUser = await UserModel.create({
      userName,
      email,
      password: hashedPass,
      address,
      phone,
    });
    res.status(200).json({
      success: true,
      message: "User registerd successfully",
      userData: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Register API",
      error: error.message,
    });
  }
};

export { register };
