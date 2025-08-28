import express from "express";
import { orderStatus, placeOrder } from "./orderController.js";
import { isAdmin, verifyToken } from "../../utils/token.js";
const router = express.Router();

router
  .post("/place", verifyToken, placeOrder)
  .put("/update/:id", verifyToken, isAdmin, orderStatus);

export default router;
