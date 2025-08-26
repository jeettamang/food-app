import CategoryModel from "./categoryModel.js";

//create
const createCategory = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) throw new Error("Category title is required");
    const newCategory = await CategoryModel.create({ title, imageUrl });
    if (!newCategory) throw new Error("Failed to create category");
    res.status(200).send({
      success: true,
      message: "Category is created",
      data: newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in creating category",
      error,
    });
  }
};
//Get all
const categoryList = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    if (!categories) throw new Error("Failed to list the categories");
    res
      .status(200)
      .send({ success: true, message: "List of categories", data: categories });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting categories",
      err: error.message,
    });
  }
};
export { createCategory, categoryList };
