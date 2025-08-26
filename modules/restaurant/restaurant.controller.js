import RestaurantModel from "./restaurant.model.js";

//Create
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
//Get all
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find();
    res.status(200).json({
      message: "Restaurants",
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get the list of restaurants",
      err: error.message,
    });
  }
};
//single get
const singleRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const getRestaurant = await RestaurantModel.findById(id);
    if (!getRestaurant) throw new Error("Failed to get the restaurant by ID");
    res
      .status(200)
      .json({ message: "The restaurant is here", data: getRestaurant });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in getting restaurant",
      error: error.message,
    });
  }
};
//update
const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await RestaurantModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!restaurant) throw new Error("Failed to update restaurant data");
    res
      .status(200)
      .json({ message: "Restaurant data has been updated", data: restaurant });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating restaurant",
      error: error.message,
    });
  }
};
//Delete
const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRestaurant = await RestaurantModel.findByIdAndDelete(id);
    if (!deletedRestaurant) throw new Error("Failed to delete the restaurant");
    res.status(200).json({ message: "The restaurant has been deleted" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting restaurant",
      error: error.message,
    });
  }
};
export {
  createRestaurant,
  getRestaurants,
  singleRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
