import { compareHashed, hashedPassword } from "../../utils/bcrypt.js";
import { genJWT } from "../../utils/token.js";
import UserModel from "./userModel.js";

//REGISTER
const register = async (req, res) => {
  try {
    const { userName, email, password, address, phone, role } = req.body;
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
      role,
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

//LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = compareHashed(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // JWT payload
    const payload = {
      id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    };

    // Generate token
    const token = genJWT(payload);
    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate token",
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "User login successful",
      token,
      userData: payload,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User login API error",
      error: error.message,
    });
  }
};

//Get users
const userList = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json({ message: "All user list", users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};
const singleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).select("-password");
    res.status(200).json({ message: "User details", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const { userName, email, phone, address } = req.body;
    const { id } = req.params;
    const userData = { userName, email, phone, address };
    const updatedUser = await UserModel.findByIdAndUpdate(id, userData, {
      new: true,
    });
    if (!updatedUser) {
      return res
        .status(400)
        .json({ message: "Unable to update the user data" });
    }
    res.status(200).json({
      message: "User data updated successfully",
      updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};
export { register, login, userList, singleUser, updateUser };
