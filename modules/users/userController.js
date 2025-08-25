import { sendMail } from "../../services/mailer.js";
import { compareHashed, hashedPassword } from "../../utils/bcrypt.js";
import { generateOTP, genJWT } from "../../utils/token.js";
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
    const OTP = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    const hashedPass = hashedPassword(password);
    try {
      await sendMail({
        to: email,
        subject: "Welcome to Foot-App",
        message: `<h2>Dear ${userName}</h2>, </br>
          <p>Your account has been created. Your OTP for email verification is : ${OTP}
          `,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Registration failed: could not send email",
      });
    }
    const newUser = await UserModel.create({
      userName,
      email,
      password: hashedPass,
      address,
      phone,
      role,
      otp: OTP,
      otpExpires,
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
//get single user
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
//update user
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
//verify email
const verifyEMail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) throw new Error("Email and OTP are required");
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User not found");
    if (user.otp !== otp) throw new Error("OTP is mismatch");

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { $set: { isActive: true, isEmailVerified: true, otp: "" } },
      { new: true }
    ).select("-password");
    res.status(200).json({
      message: "Email verified successfully",
      userData: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
//Forget Password
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Email is required");
    const user = await UserModel.findOne({
      email,
      isActive: true,
      isEmailVerified: true,
    });
    if (!user) throw new Error("User not found");
    const resetOTP = String(generateOTP());
    const otpExpiry = Date.now() + 5 * 60 * 1000;
    await sendMail({
      to: email,
      subject: "Password Reset OTP",
      message: `<p>Your OTP for password reset is: <b>${resetOTP}</b></p>`,
    });
    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { $set: { otp: resetOTP, otpExpires: otpExpiry } },
      { new: true }
    ).select("-password");
    if (!updatedUser) throw new Error("Failed to update token");
    res.status(200).json({
      success: true,
      message: "OTP sent to your email ",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
//Verify ResetOTP
const verifyResetOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) throw new Error("OTP is required");
    const user = await UserModel.findOne({
      otp: String(otp),
      otpExpires: { $gt: Date.now() },
      isActive: true,
      isEmailVerified: true,
    }).select("-password");

    // Log the times for debugging
    console.log("Current time is:", Date.now());
    if (user) {
      console.log("OTP expires at:", user.otpExpires);
      console.log(
        "Is current time less than expiry?",
        Date.now() < user.otpExpires
      );
    } else {
      console.log("User not found by OTP, or OTP is expired.");
    }

    // Now, perform the expiration check
    if (!user || user.otpExpires <= Date.now()) {
      throw new Error("OTP is expired");
    }

    res.status(200).json({
      success: true,
      message: "OTP is verified successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    if (!oldPassword || !newPassword)
      throw new Error("Old password and new password are required");
    const user = await UserModel.findOne({
      _id: userId,
      isActive: true,
      isEmailVerified: true,
    });
    if (!user) throw new Error("User not found");
    const isMatch = compareHashed(oldPassword, user.password);
    if (!isMatch) throw new Error("Old password is incorrect");
    const newPass = hashedPassword(newPassword);
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { password: newPass },
      { new: true }
    );
    if (!updatedUser) throw new Error("Password reset failed");
    res.status(200).json({
      message: "Passwored reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Change Password API",
      error: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) throw new Error("Failed to delete user");
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Delete user API",
      error: error.message,
    });
  }
};
export {
  register,
  login,
  userList,
  singleUser,
  updateUser,
  verifyEMail,
  forgetPassword,
  verifyResetOTP,
  resetPassword,
  deleteUser,
};
