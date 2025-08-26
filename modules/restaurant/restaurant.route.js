import express from "express";
import { verifyToken } from "../../utils/token.js";
import {
  createRestaurant,
  deleteRestaurant,
  getRestaurants,
  singleRestaurant,
  updateRestaurant,
} from "./restaurant.controller.js";
const router = express.Router();

router
  .post("/create", verifyToken, createRestaurant)
  .get("/list", getRestaurants)
  .get("/single/:id", singleRestaurant)
  .put("/update/:id", verifyToken, updateRestaurant)
  .delete("/delete/:id", verifyToken, deleteRestaurant);

export default router;
