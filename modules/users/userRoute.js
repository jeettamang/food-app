import express from "express";
import {
  login,
  register,
  singleUser,
  updateUser,
  userList,
} from "./userController.js";
import { verifyToken } from "../../utils/token.js";
const router = express.Router();

router
  .post("/register", register)
  .post("/login", login)
  .get("/list", verifyToken, userList)
  .get("/single/:id", verifyToken, singleUser)
  .put("/update/:id", verifyToken, updateUser);

export default router;
