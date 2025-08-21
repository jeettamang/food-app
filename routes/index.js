import express from "express";
const router = express.Router();
import userRouter from "../modules/users/userRoute.js";

router.use("/users", userRouter);

export default router;
