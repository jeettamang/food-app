import jwt from "jsonwebtoken";
import crypto from "crypto";
const genJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const verifyToken = (req, res, next) => {
  try {
    const authHeaders = req.headers["authorization"];
    if (!authHeaders) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeaders.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is missing " });
    }
    //verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    es.status(500).json({
      success: false,
      message: "Token verification failed",
      error: error.message,
    });
  }
};

//OTP
const generateOTP = () => crypto.randomInt(100000, 1000000);
export { genJWT, verifyToken, generateOTP };
