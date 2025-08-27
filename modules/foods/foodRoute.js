import express from "express";
import {
  createFood,
  deleteFood,
  getFood,
  getFoods,
  updateFood,
} from "./foodController.js";
import { verifyToken } from "../../utils/token.js";

const router = express.Router();

router
  .post("/create", verifyToken, createFood)
  .get("/list", getFoods)
  .get("/single/:id", getFood)
  .put("/update/:id", verifyToken, updateFood)
  .delete("/delete/:id", verifyToken, deleteFood);

export default router;
