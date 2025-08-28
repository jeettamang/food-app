import jwt from "jsonwebtoken";
import crypto from "crypto";
import UserModel from "../modules/users/userModel.js";

const genJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res
      .status(401)
      .json({ success: false, message: "Unauthorized", error: error.message });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (!req.user) throw new Error("Unauthorized. Please login first");
    if (req.user.role !== "admin") throw new Error("Access denied. Admin only");
    next();
  } catch (error) {
    console.error("Admin Middleware Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error in admin middleware",
    });
  }
};
//OTP
const generateOTP = () => crypto.randomInt(100000, 1000000);
export { genJWT, verifyToken, generateOTP, isAdmin };
