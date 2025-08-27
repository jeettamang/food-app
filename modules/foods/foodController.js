import FoodModel from "./foodModel.js";

//create
const createFood = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      description,
      imageUrl,
      isAvailable,
      restaurant,
      foodTags,
      code,
      rating,
      ingredients,
    } = req.body;
    if (!name || !category || !price || !restaurant) {
      return res.status(400).json({
        message: "Name, category, price and restaurant are required",
      });
    }
    const food = await FoodModel.create({
      name,
      category,
      price,
      description,
      imageUrl,
      isAvailable,
      restaurant,
      foodTags,
      code,
      rating,
      ingredients,
    });
    if (!food) throw new Error("Failed to create food");

    res.status(201).json({
      success: true,
      message: "New food item is created successfully",
      data: food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in creating food API",
      err: error.message,
    });
  }
};
//Get all food items
const getFoods = async (req, res) => {
  try {
    const { id } = req.params;
    const foods = await FoodModel.find();
    if (!foods) throw new Error("Failed to get food items list");
    res.status(200).json({
      message: "Food items list",
      FoodItems: foods,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error in getting Food items API", err: error.message });
  }
};
//Single get
const getFood = async (req, res) => {
  try {
    const { id } = req.params;
    const Food = await FoodModel.findById(id);
    if (!Food) throw new Error("Failed to get the food item");
    res.status(200).send({
      success: true,
      message: "One food item",
      data: Food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in getting the Food item API" });
  }
};
//Get by Restaurant ID

//update
const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFood = await FoodModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedFood) throw new Error("Failed to update the food item");
    res.status(200).send({
      success: true,
      message: "Food item updated successfully",
      data: updatedFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in updating the Food item API" });
  }
};

//delete
const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFood = await FoodModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!deletedFood) throw new Error("Failed to delete the food item");
    res.status(200).send({
      success: true,
      message: "Food item deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in deleting the Food item API" });
  }
};
export { createFood, getFoods, getFood, updateFood, deleteFood };
