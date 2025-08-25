import express from "express";
import { verifyToken } from "../../utils/token.js";
import { createRestaurant } from "./restaurant.controller.js";
const router = express.Router();

router.post("/create", verifyToken, createRestaurant);

export default router;
