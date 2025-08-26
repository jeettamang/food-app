import express from "express";
const router = express.Router();
import userRouter from "../modules/users/userRoute.js";
import restaurantRouter from "../modules/restaurant/restaurant.route.js";
import categoryRouter from "../modules/category/categoryRoute.js";

router
  .use("/users", userRouter)
  .use("/restaurant", restaurantRouter)
  .use("/category", categoryRouter);

export default router;
