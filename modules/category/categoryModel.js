import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category is required"],
      unique: true,
      trim: true,
    },

    imageUrl: { type: String },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
