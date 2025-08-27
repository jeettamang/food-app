import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true, // e.g., "Pizza", "Burger", "Drinks"
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    ingredients: {
      type: [String], // e.g., ["Cheese", "Tomato", "Chicken"]
      default: [],
    },
    foodTags: {
      type: [String],
      default: [],
    },
    code: { type: String },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    ratingCount: {
      type: Number,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  { timestamps: true }
);

const FoodModel = mongoose.model("Food", foodSchema);

export default FoodModel;
