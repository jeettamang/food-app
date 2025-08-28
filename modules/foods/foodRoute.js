import express from "express";
import {
  createFood,
  deleteFood,
  getFood,
  getFoodByRestaurant,
  getFoods,
  updateFood,
} from "./foodController.js";
import { verifyToken } from "../../utils/token.js";

const router = express.Router();

router
  .post("/create", verifyToken, createFood)
  .get("/list", getFoods)
  .get("/single/:id", getFood)
  .get("/restaurant/:id", getFoodByRestaurant)
  .put("/update/:id", verifyToken, updateFood)
  .delete("/delete/:id", verifyToken, deleteFood);

export default router;
