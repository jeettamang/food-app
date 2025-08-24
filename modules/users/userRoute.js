import express from "express";
import {
  forgetPassword,
  login,
  register,
  singleUser,
  updateUser,
  userList,
  verifyEMail,
  verifyResetOTP,
} from "./userController.js";
import { verifyToken } from "../../utils/token.js";
const router = express.Router();

router
  .post("/register", register)
  .post("/login", login)
  .get("/list", verifyToken, userList)
  .get("/single/:id", verifyToken, singleUser)
  .put("/update/:id", verifyToken, updateUser)
  .post("/verify-email", verifyEMail)
  .post("/forget-password", forgetPassword)
  .post("/verify-otp", verifyResetOTP);

export default router;
