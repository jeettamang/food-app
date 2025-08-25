import RestaurantModel from "./restaurant.model.js";

const createRestaurant = async (req, res) => {
  try {
    const restaurant = new RestaurantModel(req.body);
    const saveRestaurant = await restaurant.save();
    res.status(200).json({
      message: "Restaurant has been created",
      data: saveRestaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating restaurant",
      error: error.message,
    });
  }
};
export { createRestaurant };
