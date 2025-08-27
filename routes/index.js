import express from "express";
const router = express.Router();
import userRouter from "../modules/users/userRoute.js";
import restaurantRouter from "../modules/restaurant/restaurant.route.js";
import categoryRouter from "../modules/category/categoryRoute.js";
import foodRouter from "../modules/foods/foodRoute.js";

router
  .use("/users", userRouter)
  .use("/restaurant", restaurantRouter)
  .use("/category", categoryRouter)
  .use("/food", foodRouter);

export default router;
