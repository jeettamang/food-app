import express from "express";
import { verifyToken } from "../../utils/token.js";
import { categoryList, createCategory } from "./categoryController.js";

const router = express.Router();

router.post("/create", verifyToken, createCategory).get("/list", categoryList);

export default router;
