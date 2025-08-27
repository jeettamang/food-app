import express from "express";
import { verifyToken } from "../../utils/token.js";
import {
  categoryList,
  createCategory,
  deleteCategory,
  updateCategory,
} from "./categoryController.js";

const router = express.Router();

router
  .post("/create", verifyToken, createCategory)
  .get("/list", categoryList)
  .put("/update/:id", verifyToken, updateCategory)
  .delete("/delete/:id", verifyToken, deleteCategory);

export default router;
